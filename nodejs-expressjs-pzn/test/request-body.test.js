import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";

// Membuat instance aplikasi Express
const app = express();

// Middleware untuk mengurai JSON dari badan permintaan
app.use(express.json());
// Middleware untuk mengurai URL-encoded data dari badan permintaan
app.use(express.urlencoded({ extended: false }));
// Middleware untuk menangani file upload
app.use(expressFileUpload());

// Route untuk menerima permintaan POST dengan JSON
app.post('/json', (req, res) => {
   // Mengambil nama dari badan permintaan JSON
   const name = req.body.name;
   // Mengirim respons dalam format JSON dengan pesan "Hello {name}"
   res.json({
      hello: `Hello ${name}`
   });
});

// Route untuk menerima permintaan POST dengan form-urlencoded
app.post('/form', (req, res) => {
   // Mengambil nama dari badan permintaan form-urlencoded
   const name = req.body.name;
   // Mengirim respons dalam format JSON dengan pesan "Hello {name}"
   res.json({
      hello: `Hello ${name}`
   });
});

// Route untuk menerima permintaan POST untuk file upload
app.post('/file', async (req, res) => {
   // Mengambil file dari permintaan menggunakan express-fileupload
   const textFile = req.files.article;
   // Menyimpan file ke direktori yang ditentukan
   await textFile.mv(__dirname + "/upload/" + textFile.name);
   // Mengirim respons dengan nama yang diupload
   res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

// Test untuk memeriksa upload file
test('Test Request File Upload', async () => {
   // Mengirim permintaan POST dengan file menggunakan Supertest
   const response = await request(app)
      .post("/file")
      .set("Content-Type", "multipart/form-data") // Menyatakan tipe konten sebagai multipart/form-data
      .field("name", "Fajar") // Mengirim data form
      .attach("article", __dirname + "/contoh.txt"); // Menyertakan file yang diupload

   // Memeriksa apakah respons sesuai dengan yang diharapkan
   expect(response.text).toBe("Hello Fajar, you uploaded contoh.txt");
});

// Test untuk memeriksa permintaan JSON
test('Test Request JSON', async () => {
   // Mengirim permintaan POST dengan JSON menggunakan Supertest
   const response = await request(app)
      .post("/json")
      .set("Content-Type", "application/json") // Menyatakan tipe konten sebagai application/json
      .send({ name: "World" }); // Mengirim data JSON

   // Memeriksa apakah respons JSON sesuai dengan yang diharapkan
   expect(response.body).toEqual({
      hello: `Hello World`
   });
});

// Test untuk memeriksa permintaan form-urlencoded
test('Test Request Form', async () => {
   // Mengirim permintaan POST dengan form-urlencoded menggunakan Supertest
   const response = await request(app)
      .post("/form")
      .set("Content-Type", "application/x-www-form-urlencoded") // Menyatakan tipe konten sebagai application/x-www-form-urlencoded
      .send("name=World"); // Mengirim data form-urlencoded

   // Memeriksa apakah respons JSON sesuai dengan yang diharapkan
   expect(response.body).toEqual({
      hello: `Hello World`
   });
});
