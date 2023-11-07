import express, {Request, Response} from "express";
import {MongoClient, ObjectId} from "mongodb";
import Book from "../models/book.js";
import getMongoConn from "../db";

const bookRouter = express.Router();

bookRouter.get("/", async (req: Request, res: Response) => {
    const { book } = req.query;

    try {
        if (typeof book !== "string") {
            throw new Error("O parametro populacao nao foi informado");
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
        return;
    }

    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const books = db.collection("books");
        const docs = await books.find({
            titulo: book
        }).toArray();
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    } finally {
        conn?.close();
    }
});

bookRouter.post("/", async (req: Request, res: Response) => {
    const record = req.body;
    try {
        if (typeof record.titulo === "undefined" || record.titulo !== "string") {
            throw new Error("Titulo não foi informado");
        }
        if (typeof record.autor !== "string" || record.autor !== "string") {
            throw new Error("Autor não é valido");
        }
        if (record.dataPublicacao === "" || record.dataPublicacao !== "string") {
            throw new Error("Data da publicação não pode ser vazio");
        }
        if (typeof record.genero === "undefined" || record.genero !== "string") {
            throw new Error("Gênero não foi informado");
        }
        if (typeof record.paginas !== "number" || record.titulo === "undefined") {
            throw new Error("Paginas deve ser um número");
        }
        if (record.paginas < 0) {
            throw new Error("Paginas deve ser maior ou igual a zero");
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
        return;
    }

    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const books = db.collection("books");

        const bk = new Book(record.titulo, record.autor, record.dataPublicacao, record.genero, record.paginas);
        await books.insertOne(bk);
        res.status(201).json(bk);

    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    } finally {
        conn?.close();
    }

});

// http://localhost:3000/paises/<id>
bookRouter.put("/:id", async (req: Request, res: Response) => {

    let objectId: ObjectId;
    try {
        objectId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(400).json({ message: "O id não é válido" });
        return;
    }

    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const books = db.collection("books");

        if (await books.find({ _id: objectId }).count() === 0) {
            res.status(404).json({ message: "Não existe documento com esse id" });
            return;
        }

        const record = req.body;
        try {
            if (typeof record.titulo === "undefined" || record.titulo !== "string") {
                throw new Error("Titulo não foi informado");
            }
            if (typeof record.autor !== "string" || record.autor !== "string") {
                throw new Error("Autor não é valido");
            }
            if (record.dataPublicacao === "" || record.dataPublicacao !== "string") {
                throw new Error("Data da publicação não pode ser vazio");
            }
            if (typeof record.genero === "undefined" || record.genero !== "string") {
                throw new Error("Gênero não foi informado");
            }
            if (typeof record.paginas !== "number" || record.titulo === "undefined") {
                throw new Error("Paginas deve ser um número");
            }
            if (record.paginas < 0) {
                throw new Error("Paginas deve ser maior ou igual a zero");
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
            return;
        }

        const bk = new Book(record.titulo, record.autor, record.dataPublicacao, record.genero, record.paginas);
        await books.updateOne({
            _id: objectId
        }, {
            $set: bk
        }); // semelhante: update paises set nome = '?', populacao = ? where _id = ?

        res.status(200).json(bk);

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    } finally {
        conn?.close();
    }

});

bookRouter.delete("/:id", async (req: Request, res: Response) => {

    let objectId: ObjectId;
    try {
        objectId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(400).json({ message: "O id não é válido" });
        return;
    }

    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const books = db.collection("books");

        if (await books.find({ _id: objectId }).count() === 0) {
            res.status(404).json({ message: "Não existe documento com esse id" });
            return;
        }

        await books.deleteOne({
            _id: objectId
        }); // semelhante: delete from paises where _id = ?

        res.status(204).send("");

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    } finally {
        conn?.close();
    }    

});

export default bookRouter;