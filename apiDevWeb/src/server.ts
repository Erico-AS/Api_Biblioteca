import { MongoClient, ObjectId } from 'mongodb';
import express, { Request, Response, json } from "express";
import cors from "cors";
import getMongoConn from './db';
import Book from './models/book';
import routers from "./routers";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/book", routers.bookRouter);

app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});