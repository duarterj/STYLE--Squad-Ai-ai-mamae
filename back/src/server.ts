import express from "express";
import configDotenv from "./config/dotenv";
import productRoutes from "./routes/productRoutes";

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});