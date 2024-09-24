import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk '/products/*.json'
// Menggunakan wildcard (*) untuk menangkap semua URL yang diakhiri dengan '.json' di bawah '/products'
app.get('/products/*.json', (req, res) => {
   // Mengirimkan URL asli dari permintaan yang diterima
   res.send(req.originalUrl);
});

// Mendefinisikan route GET untuk '/categories/*(\\d+).json'
// Menggunakan wildcard (*) dengan regex (\\d+) untuk menangkap semua URL yang diakhiri dengan '.json'
// dan memiliki angka di bagian kategori
app.get('/categories/*(\\d+).json', (req, res) => {
   // Mengirimkan URL asli dari permintaan yang diterima
   res.send(req.originalUrl);
});

// Tes untuk memeriksa path route
test('Test Route Path', async () => {
   // Mengirimkan permintaan GET dengan path '/products/fajar.json'
   let response = await request(app).get("/products/fajar.json");
   // Memeriksa bahwa URL yang dikembalikan sesuai dengan yang diminta
   expect(response.text).toBe("/products/fajar.json");

   // Mengirimkan permintaan GET dengan path '/products/salah.json'
   response = await request(app).get("/products/salah.json");
   // Memeriksa bahwa URL yang dikembalikan sesuai dengan yang diminta
   expect(response.text).toBe("/products/salah.json");

   // Mengirimkan permintaan GET dengan path '/categories/1234.json'
   response = await request(app).get("/categories/1234.json");
   // Memeriksa bahwa URL yang dikembalikan sesuai dengan yang diminta
   expect(response.text).toBe("/categories/1234.json");

   // Mengirimkan permintaan GET dengan path '/categories/salah.json'
   // Mengharapkan status 404 karena path ini tidak cocok dengan route yang diharapkan
   response = await request(app).get("/categories/salah.json");
   expect(response.status).toBe(404);
});
