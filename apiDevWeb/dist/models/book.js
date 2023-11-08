"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(titulo, autor, dataPublicacao, genero, paginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.dataPublicacao = dataPublicacao;
        this.genero = genero;
        this.paginas = paginas;
    }
}
exports.default = Book;
