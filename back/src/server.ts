import express from "express";
import cors from "cors";
import configDotenv from "./config/dotenv";
import { router } from "./routes/routes";

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});