// Mengimpor fungsi `writeToFile` dari modul `belajar-nodejs-npm/write`.
// Ini memungkinkan kita menggunakan fungsi yang telah didefinisikan di dalam modul tersebut.
import { writeToFile } from "belajar-nodejs-npm/write";

// Menggunakan fungsi `writeToFile` untuk menulis data ke dalam file
// `export.log` adalah nama file yang akan dibuat atau ditimpa
// `Belajar Export` adalah teks yang akan ditulis ke dalam file
writeToFile("export.log", "Belajar Export");
