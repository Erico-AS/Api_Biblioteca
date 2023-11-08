import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Book } from './models/book';
import express, {Response, Request} from 'express' 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/book", routers.bookRouter);

app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});