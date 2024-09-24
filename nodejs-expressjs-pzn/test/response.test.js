import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   res.send(`Hello Response`);
});

// Tes untuk memeriksa respons dari route root
test("Test Response", async () => {
   // Mengirimkan permintaan GET ke route root ("/")
   const response = await request(app).get("/");
   // Memeriksa bahwa teks respons sesuai dengan harapan
   expect(response.text).toBe("Hello Response");
});
