import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Mengambil nilai header "Accept" dari request
   const type = req.get("accept");
   // Mengirimkan respons dengan menyertakan nilai header "Accept"
   res.send(`Hello ${type}`);
});

// Tes untuk memeriksa header request
test('Test Header Request', async () => {
   // Mengirim permintaan GET ke root URL dengan header "Accept"
   const response = await request(app)
      .get("/")
      .set("Accept", "text/plain");

   // Memeriksa apakah respons berisi teks yang sesuai dengan nilai header "Accept"
   expect(response.text).toBe("Hello text/plain");
});
