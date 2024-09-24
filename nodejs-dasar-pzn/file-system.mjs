// Mengimpor modul 'fs/promises' dari Node.js untuk menggunakan API sistem berkas berbasis Promise
import fs from "fs/promises";

// Membaca konten dari file 'file-system.mjs' secara asinkron
// 'await' digunakan di sini karena 'readFile' adalah fungsi asinkron yang mengembalikan Promise
const buffer = await fs.readFile("file-system.mjs");

// Mengonversi buffer yang dibaca menjadi string dan mencetaknya ke konsol
console.info(buffer.toString());

// Menulis string "Hello NodeJS" ke file baru bernama 'temp.txt' secara asinkron
await fs.writeFile("temp.txt", "Hello NodeJS");
