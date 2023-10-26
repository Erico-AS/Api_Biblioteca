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
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const book_1 = require("./models/book");
const app = (0, express_1.default)();
const port = 3000;
mongoose_1.default.connect('mongodb://localhost/minha-api', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(body_parser_1.default.json());
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_1.Book(req.body);
        yield book.save();
        res.status(201).json(book);
    }
    catch (error) {
        res.status(400).json({ error: 'Falha ao criar o livro' });
    }
}));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_1.Book.find();
    res.json(books);
}));
app.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    }
    catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar o livro' });
    }
}));
app.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_1.Book.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: 'Falha ao excluir o livro' });
    }
}));
app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});
