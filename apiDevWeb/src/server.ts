import express, { Request, Response, json } from "express";
import cors from "cors";
import routers from "./routers";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/book", routers.bookRouter);

app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});