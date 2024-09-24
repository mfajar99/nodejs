// Mengimpor modul 'fs' untuk operasi file dan modul 'zlib' untuk kompresi data.
// 'fs' digunakan untuk membaca dan menulis file, sedangkan 'zlib' digunakan untuk kompresi dan dekompresi data.
import fs from "fs";
import zlib from "zlib";

// Membaca konten dari file 'zlib-compress.mjs' ke dalam variabel 'source'.
// 'fs.readFileSync' membaca file secara sinkron, artinya proses akan menunggu hingga file dibaca sepenuhnya.
const source = fs.readFileSync("zlib-compress.mjs");

// Mengompres data yang dibaca menggunakan metode 'gzipSync' dari modul 'zlib'.
// 'gzipSync' mengompresi data menggunakan algoritma gzip dan mengembalikan hasil kompresi.
const result = zlib.gzipSync(source);

// Menyimpan hasil kompresi ke dalam file baru bernama 'zlib-compress.mjs.text'.
// 'fs.writeFileSync' menulis data ke file secara sinkron, artinya proses akan menunggu hingga data ditulis sepenuhnya.
fs.writeFileSync("zlib-compress.mjs.text", result);
