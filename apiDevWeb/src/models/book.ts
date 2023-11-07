export default class Book {
  titulo: string;
  autor: string;
  dataPublicacao: string;
  genero: string;
  paginas: number;

  constructor (titulo: string, autor: string, dataPublicacao: string, genero: string, paginas: number,) {
    this.titulo = titulo;
    this.autor = autor;
    this.dataPublicacao = dataPublicacao;
    this.genero = genero;
    this.paginas = paginas
  }
}