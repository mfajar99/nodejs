import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Mengambil nilai parameter query "name" dari request dan mengirimkan respons
   res.send(`Hello ${req.query.name}`);
});

// Tes untuk memeriksa request HTTP
test('Test HTTP Request', async () => {
   // Mengirim permintaan GET ke root URL dengan parameter query "name"
   const response = await request(app).get("/").query({ name: "Fajar" });

   // Memeriksa apakah respons berisi teks yang sesuai dengan nilai parameter query "name"
   expect(response.text).toBe("Hello Fajar");
});
