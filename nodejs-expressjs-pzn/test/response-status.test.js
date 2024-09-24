import express from "express";
import request from "supertest";

const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Memeriksa apakah query parameter 'name' ada
   if (req.query.name) {
      res.status(200);  // Mengatur status respons ke 200 OK
      res.send(`Hello ${req.query.name}`);  // Mengirimkan respons dengan nama dari query parameter
   } else {
      res.status(400);  // Mengatur status respons ke 400 Bad Request jika query parameter tidak ada
      res.end();  // Mengakhiri respons tanpa konten
   }
});

// Tes untuk memeriksa status respons
test('Test Response Status', async () => {
   // Mengirimkan permintaan GET dengan query parameter 'name'
   let response = await request(app).get("/").query({ name: "Fajar" });
   // Memeriksa bahwa status respons adalah 200 dan teks respons sesuai dengan harapan
   expect(response.status).toBe(200);
   expect(response.text).toBe("Hello Fajar");

   // Mengirimkan permintaan GET tanpa query parameter 'name'
   response = await request(app).get("/");
   // Memeriksa bahwa status respons adalah 400
   expect(response.status).toBe(400);
});
