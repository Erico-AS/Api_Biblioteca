"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const book_js_1 = __importDefault(require("../models/book.js"));
const db_1 = __importDefault(require("../db"));
const bookRouter = express_1.default.Router();
bookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book } = req.query;
    try {
        if (typeof book !== "string") {
            throw new Error("O parametro 'name' nao foi informado");
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const books = db.collection("books");
        const docs = yield books.find({
            titulo: book
        }).toArray();
        res.status(200).json(docs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
bookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const books = db.collection("books");
        const bk = new book_js_1.default(record.titulo, record.autor, record.dataPublicacao, record.genero, record.paginas);
        yield books.insertOne(bk);
        res.status(201).json(bk);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
// http://localhost:3000/paises/<id>
bookRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let objectId;
    try {
        objectId = new mongodb_1.ObjectId(req.params.id);
    }
    catch (error) {
        res.status(400).json({ message: "O id não é válido" });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const books = db.collection("books");
        if ((yield books.find({ _id: objectId }).count()) === 0) {
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
        }
        catch (error) {
            res.status(400).json({ message: error.message });
            return;
        }
        const bk = new book_js_1.default(record.titulo, record.autor, record.dataPublicacao, record.genero, record.paginas);
        yield books.updateOne({
            _id: objectId
        }, {
            $set: bk
        }); // semelhante: update paises set nome = '?', populacao = ? where _id = ?
        res.status(200).json(bk);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
bookRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let objectId;
    try {
        objectId = new mongodb_1.ObjectId(req.params.id);
    }
    catch (error) {
        res.status(400).json({ message: "O id não é válido" });
        return;
    }
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const books = db.collection("books");
        if ((yield books.find({ _id: objectId }).count()) === 0) {
            res.status(404).json({ message: "Não existe documento com esse id" });
            return;
        }
        yield books.deleteOne({
            _id: objectId
        }); // semelhante: delete from paises where _id = ?
        res.status(204).send("");
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
}));
exports.default = bookRouter;
