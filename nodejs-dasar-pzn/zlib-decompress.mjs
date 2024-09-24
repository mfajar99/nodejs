// Mengimpor modul 'fs' untuk operasi file dan modul 'zlib' untuk kompresi dan dekompresi data.
// 'fs' digunakan untuk membaca file, sedangkan 'zlib' digunakan untuk mengompresi dan mendekompresi data.
import fs from "fs";
import zlib from "zlib";

// Membaca konten dari file 'zlib-compress.mjs.txt' ke dalam variabel 'source'.
// 'fs.readFileSync' membaca file secara sinkron, artinya proses akan menunggu hingga file dibaca sepenuhnya.
const source = fs.readFileSync("zlib-compress.mjs.txt");

// Menampilkan konten file yang telah dibaca dalam bentuk string ke konsol.
// 'source.toString()' mengubah buffer data yang dibaca menjadi string agar dapat dibaca dengan mudah.
console.log(source.toString());

// Menggunakan 'zlib.unzipSync' untuk mendekompresi data yang dibaca dari file.
// 'unzipSync' mengembalikan data yang telah didekompresi dari format gzip.
const result = zlib.unzipSync(source);

// Menampilkan hasil dekompresi dalam bentuk string ke konsol.
// 'result.toString()' mengubah buffer hasil dekompresi menjadi string untuk pembacaan yang lebih mudah.
console.log(result.toString());
