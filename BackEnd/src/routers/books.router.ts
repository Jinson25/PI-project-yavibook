import { Router } from "express";
import { books } from "../data/data";
import asyncHandler from "express-async-handler";
import { BookModel } from "../models/book.model";

const router = Router();

router.get("/load", asyncHandler(
    async (req, res) => {
        const bookCount = await BookModel.countDocuments();
        if (bookCount > 0) {
            res.send("Datos cargado anteriormente");
            return;
        }
        await BookModel.create(books);
        res.send("Se cargo correctamente los datos")
    }))


//obtener todo los libros con metodo GET
router.get("/", asyncHandler(
    async (req, res) => {
        const books = await BookModel.find();
        res.send(books)
    }
))

//obtener un libro por ido metodo GET

router.get("/:bookId", asyncHandler(
    async (req, res) => {
        const book = await BookModel.findById(req.params.foodId);
        res.send(book);
    }
))

//crear un libro por metodo PUT

router.post('/', asyncHandler(async(req, res)=>{
    const newBook = req.body;
    const createBook = await BookModel.create(newBook)
    res.send(createBook)
}))

//actualizar un libro por metodo put

router.put('/:bookId', asyncHandler(async(req, res)=>{
    const updateBook = req.body;
    const bookId = req.params.foodId;
    const result = await BookModel.findByIdAndUpdate(bookId, updateBook, {new: true});
    res.send(result)
}))

//eliminar un libro por metodo delete
router.delete('/:bookId', asyncHandler(async ( req, res)=>{
    const bookId = req.params.bookId;
    await BookModel.findByIdAndDelete(bookId);
    res.send('Libro eliminado con exito')
}))

export default router