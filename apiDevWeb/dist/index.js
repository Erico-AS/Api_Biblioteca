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
const book_js_1 = __importDefault(require("./models/book.js"));
const db_1 = __importDefault(require("./db"));
const booksArray = [
    new book_js_1.default("A Brief History of Time", "Stephen Hawking", "1988-04-01", "Science", 256),
    new book_js_1.default("The Catcher in the Rye", "J.D. Salinger", "1951-07-16", "Fiction", 224),
    new book_js_1.default("1984", "George Orwell", "1949-06-08", "Dystopian", 328),
    new book_js_1.default("The Great Gatsby", "F. Scott Fitzgerald", "1925-04-10", "Classics", 180),
    new book_js_1.default("The Da Vinci Code", "Dan Brown", "2003-03-18", "Mystery", 454),
];
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const books = db.collection("books");
        yield books.deleteMany({});
        yield books.insertMany(booksArray);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
main();
