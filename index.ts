
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { apiResponse, getArtworks, loginUser } from "./controllers/homepage";
import { paths } from "./routes/hompage";

dotenv.config();

// Express
const app: Express = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get(paths.basic, apiResponse);
app.get(paths.homepage + "/getartworks/:keyword", getArtworks);
app.post(paths.login, loginUser);

// Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
