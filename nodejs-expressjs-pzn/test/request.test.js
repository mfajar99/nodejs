import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Mengirimkan respons "Hello World"
   res.send("Hello World");
});

// Tes untuk memeriksa respons dari route root ("/")
test('Test ExpressJS', async () => {
   // Mengirimkan permintaan GET ke root ("/")
   const response = await request(app).get("/");

   // Memeriksa bahwa respons berisi "Hello World"
   expect(response.text).toBe("Hello World");
});
