import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Mengambil nilai parameter query "firstName" dan "lastName" dari request
   res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

// Tes untuk memeriksa parameter query
test('Test Query Parameter', async () => {
   // Mengirim permintaan GET ke root URL dengan parameter query "firstName" dan "lastName"
   const response = await request(app)
      .get("/")
      .query({ firstName: "Fajar", lastName: "Muhammad" });

   // Memeriksa apakah respons berisi teks yang sesuai dengan parameter query
   expect(response.text).toBe("Hello Fajar Muhammad");
});
