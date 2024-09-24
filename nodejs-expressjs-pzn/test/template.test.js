import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

// Membuat instance aplikasi Express
const app = express();

// Mengatur direktori untuk tampilan (views) dan mesin templat (template engine)
app.set("views", __dirname + "/views");  // Lokasi folder views
app.set("view engine", "html");          // Mengatur engine template ke 'html'
app.engine("html", mustacheExpress());   // Menggunakan mustacheExpress sebagai engine template

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Render tampilan 'index.html' dengan data
   res.render("index", {
      title: "Hello World",  // Judul untuk tampilan
      say: "This is a test" // Pesan untuk tampilan
   });
});

// Tes untuk memeriksa respons dari root ("/")
test("Test Response", async () => {
   // Mengirimkan permintaan GET ke root ("/")
   const response = await request(app).get("/");
   // Menampilkan teks respons untuk debug
   console.log(response.text);
   // Mengharapkan respons berisi "Hello World" dari data yang dirender
   expect(response.text).toContain("Hello World");
   // Mengharapkan respons berisi "This is a test" dari data yang dirender
   expect(response.text).toContain("This is a test");
});
