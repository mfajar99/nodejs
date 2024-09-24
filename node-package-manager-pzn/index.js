// Mengimpor fungsi `writeToFile` dari file lokal `write.js`
// Ini memungkinkan kita menggunakan fungsi `writeToFile` yang didefinisikan di dalam file tersebut.
import { writeToFile } from "./write.js";

// Menggunakan fungsi `writeToFile` untuk menulis data ke dalam file
// `hello.log` adalah nama file yang akan dibuat atau ditimpa
// `Muhammad Fajar Amir` adalah teks yang akan ditulis ke dalam file
writeToFile("hello.log", "Muhammad Fajar Amir");

// Menampilkan pesan "Hello World" di konsol
console.log("Hello World");

