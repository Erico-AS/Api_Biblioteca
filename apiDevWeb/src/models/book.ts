import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: string;
  paginas: number;
}

const BookSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anoPublicacao: { type: Number, required: true },
  genero: { type: String, required: true },
  paginas: { type: Number, required: true },
});

export const Book = mongoose.model<IBook>('Book', BookSchema);