
import fetch from "cross-fetch";
import { response } from "express";
import { users } from "../db/dummyData";

export const getArtworks = async (req: any, res = response) => {
  const AIC_URL = "https://api.artic.edu/api/v1/artworks/search?q=";
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

export const apiResponse = (req: any, res = response) => {
  res.json({ message: "Please login to use the APi" });
};

export const loginUser = (req: any, res: any) => {
  interface FormInputs {
    email: string,
    password: string;
  }

  const { email, password }: FormInputs = req.body;

  const user = users.find(user => {
    return user.email === email && user.password === password;
  });

  if (!user) {
    return res.status(404).send('User Not Found!');
  }

  return res.status(200).json(user);
  ;
};