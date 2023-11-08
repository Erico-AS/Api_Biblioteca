import cors from "cors";
import routers from "./routers";
import express, {Response, Request} from 'express' 

const app = express();
const port = 3000

app.use(cors());
app.use(express.json());

app.use("/book", routers.bookRouter);

app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});