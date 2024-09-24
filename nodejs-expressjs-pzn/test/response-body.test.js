import express from "express";
import request from "supertest";

const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Menetapkan header Content-Type menjadi 'text/html'
   res.set('Content-Type', 'text/html');
   // Mengirimkan HTML sebagai respons
   res.send(`<html><body>Hello World</body></html>`);
});

// Tes untuk memeriksa respons body
test("Test Response Body", async () => {
   // Mengirimkan permintaan GET ke route root ("/")
   const response = await request(app).get("/");

   // Memeriksa header Content-Type untuk memastikan itu adalah 'text/html'
   expect(response.get('Content-Type')).toContain('text/html');
   // Memeriksa bahwa teks respons sesuai dengan HTML yang diharapkan
   expect(response.text).toBe('<html><body>Hello World</body></html>');
});
