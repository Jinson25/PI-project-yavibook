import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import path from 'path';


import { dbBook } from "./data/database";
dbBook();

import booksRouter from "./routers/books.router";
import usuariosRouter from "./routers/usuarios.router";


const app = express();
app.use(express.json());
app.use(cors({
}));

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

//rutas
app.use("/libros", booksRouter);
app.use("/usuarios", usuariosRouter);


const port = 3200;
app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);
})