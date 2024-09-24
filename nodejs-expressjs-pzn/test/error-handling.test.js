import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Middleware untuk menangani error
const errorMiddleWare = (err, req, res, next) => {
   res.status(500).send(`Terjadi Error: ${err.message}`);
};

// Route GET di root ("/") yang melemparkan error
app.get('/', (req, res) => {
   throw new Error("Ups");
});

// Menggunakan middleware error
app.use(errorMiddleWare);

// Uji untuk memeriksa respons error
test("Test Response", async () => {
   // Melakukan permintaan GET ke root ("/")
   const response = await request(app).get("/");
   // Memeriksa status respons adalah 500
   expect(response.status).toBe(500);
   // Memeriksa teks respons sesuai dengan pesan error
   expect(response.text).toBe("Terjadi Error: Ups");
});
