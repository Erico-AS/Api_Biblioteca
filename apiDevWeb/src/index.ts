import { MongoClient } from 'mongodb';
import Book from "./models/book.js";
import getMongoConn from './db';
import app from './server.js';

const booksArray: Book[] = [
    new Book("A Brief History of Time", "Stephen Hawking", "1988-04-01", "Science", 256),
    new Book("The Catcher in the Rye", "J.D. Salinger", "1951-07-16", "Fiction", 224),
    new Book("1984", "George Orwell", "1949-06-08", "Dystopian", 328),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", "1925-04-10", "Classics", 180),
    new Book("The Da Vinci Code", "Dan Brown", "2003-03-18", "Mystery", 454),
    new Book("Sherlock", "Sir Arthur Conan Doyle", "1887-03-01", "Mystery", 250)
];

const main = async () => {
    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const books = db.collection("books");
        await books.deleteMany({});
        await books.insertMany(booksArray);
        app.listen()

    } catch (error) {
        console.log(error);
    } finally {
        conn?.close();
    }
}

main();