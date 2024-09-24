import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk "/hello/world"
app.get('/hello/world', (req, res) => {
   // Mengirimkan informasi tentang request sebagai respons JSON
   res.json({
      path: req.path,            // Path dari URL request (misalnya "/hello/world")
      originalUrl: req.originalUrl,  // URL lengkap dari request termasuk query params (misalnya "/hello/world?name=Fajar")
      hostname: req.hostname,    // Nama host dari request (misalnya "127.0.0.1")
      protocol: req.protocol,    // Protocol dari request (misalnya "http")
      secure: req.secure         // Apakah request menggunakan HTTPS (true jika HTTPS, false jika HTTP)
   });
});

// Tes untuk memeriksa informasi URL dari request
test('Test Request URL', async () => {
   // Mengirimkan permintaan GET ke "/hello/world" dengan parameter query "name"
   const response = await request(app)
      .get("/hello/world")
      .query({ name: "Fajar" });

   // Memeriksa bahwa respons JSON berisi informasi yang sesuai dengan request
   expect(response.body).toEqual({
      path: "/hello/world",
      originalUrl: "/hello/world?name=Fajar",
      hostname: "127.0.0.1",
      protocol: "http",
      secure: false
   });
});
