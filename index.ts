
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import fetch from "cross-fetch";
import { response } from "express";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const paths = {
  auth: "/api/auth",
  homepage: "/api/homepage",
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From the Typescript Server!');
});

const AIC_URL = "https://api.artic.edu/api/v1/artworks/search?q=";

const getArtworks = async (req: any, res = response) => {
  const { keyword } = req.params;

  try {
    const resp = await fetch(
      `${AIC_URL}${keyword}&limit=15&fields=id,title,image_id,date_display,artist_display,place_of_origin,medium_display`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    const { data = [] }: any = await resp.json();
    const dataWithUrls = data.map((image: any) => ({
      ...image,
      image_url: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
    }));

    res.json(dataWithUrls);
  } catch (err) {
    console.error(err);
  }
};

app.get("/api/homepage/getartworks/:keyword", getArtworks);

interface FormInputs {
  email: string,
  password: string;
}

// Array of example users for testing purposes
const users = [
  {
    id: 1,
    name: 'Maria Doe',
    email: 'maria@example.com',
    password: 'maria123'
  },
  {
    id: 2,
    name: 'Juan Doe',
    email: 'juan@example.com',
    password: 'juan123'
  }
];

// route login
app.post('/login', (req: Request, res: Response) => {
  const { email, password }: FormInputs = req.body;

  const user = users.find(user => {
    return user.email === email && user.password === password;
  });

  if (!user) {
    return res.status(404).send('User Not Found!');
  }

  return res.status(200).json(user);
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
