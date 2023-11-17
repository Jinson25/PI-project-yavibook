import { Schema, model } from "mongoose";

export interface Book{
    id: string;
    name: string;
    date: string;
    description: string;
    publishing_book: string; //editorial
    sections: string[];
    imgUrl: string
}

export const BookSchema = new Schema<Book>(
    {
        name: {type: String, required:true},
        date: {type: String, required:true},
        description: {type: String, required:true},
        publishing_book: {type: String, required:true},
        sections: {type: [String]},
        imgUrl: {type: String, require:true}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
)

export const BookModel = model <Book>('book', BookSchema)