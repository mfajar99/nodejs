// Mengimpor modul 'path' dari Node.js untuk menangani path file dan direktori
import path from "path";

// Mendefinisikan path file sebagai string
const file = "/Users/fajar/contoh.txt";

// Mencetak direktori dari path file
console.info(path.dirname(file));

// Mencetak nama file dari path file
console.info(path.basename(file));

// Mencetak ekstensi file dari path file
console.info(path.extname(file));
