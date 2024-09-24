import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk root ("/")
// Route ini menangani permintaan GET ke root URL dan mengirimkan respons "Hello Response"
app.get('/', (req, res) => {
   res.send(`Hello Response`);
});

// Middleware untuk menangani route yang tidak ditemukan (404)
// Middleware ini digunakan setelah semua route lainnya
// Jika permintaan tidak cocok dengan route yang ada, middleware ini akan mengirimkan status 404 dan pesan "404 Not Found Euy"
app.use('/', (req, res, next) => {
   res.status(404).send(`404 Not Found Euy`);
});

// Tes untuk memeriksa respons dari route "/"
// Tes ini memastikan bahwa route GET ke root URL ("/") mengirimkan respons yang diharapkan
test("Test Response", async () => {
   // Mengirim permintaan GET ke root URL menggunakan Supertest
   const response = await request(app).get("/");
   // Memeriksa apakah respons berisi teks yang sesuai
   expect(response.text).toBe("Hello Response");
});

// Tes untuk memeriksa respons dari route yang tidak ada
// Tes ini memastikan bahwa route yang tidak ada menghasilkan respons 404 dengan pesan yang diharapkan
test("Test Response Not Found", async () => {
   // Mengirim permintaan GET ke URL yang tidak ada menggunakan Supertest
   const response = await request(app).get("/halaman-tidak-ada");
   // Memeriksa apakah respons berisi pesan kesalahan 404
   expect(response.text).toBe("404 Not Found Euy");
});
