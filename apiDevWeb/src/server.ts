import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Book } from './models/book';
import express, {Response, Request} from 'express' 

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/minha-api', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.post('/books', async (req:Request, res:Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao criar o livro' });
  }
});

app.get('/books', async (req:Request, res:Response) => {
  const books = await Book.find();
  res.json(books);
});

app.put('/books/:id', async (req:Request, res:Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao atualizar o livro' });
  }
});

app.delete('/books/:id', async (req:Request, res:Response) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Falha ao excluir o livro' });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});