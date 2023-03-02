
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";

dotenv.config();

// Express
const app: Express = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
