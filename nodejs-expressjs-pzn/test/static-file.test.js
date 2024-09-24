import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware express.static untuk menyajikan file statis dari folder 'static'
app.use("/static", express.static(__dirname + "/static"));

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   res.send(`Hello Response`);
});

// Mendefinisikan route GET untuk '/contoh.txt'
app.get('/contoh.txt', (req, res) => {
   res.send(`Hello Response`);
});

// Tes untuk memeriksa respons dari root ("/")
test('Test Static File', async () => {
   // Mengirimkan permintaan GET ke root ("/")
   const response = await request(app).get("/");
   // Mengharapkan respons berisi "Hello Response"
   expect(response.text).toBe("Hello Response");
});

// Tes untuk memeriksa respons dari root ("/") (duplikat, seharusnya diganti dengan nama unik)
test('Test Static File', async () => {
   // Mengirimkan permintaan GET ke root ("/")
   const response = await request(app).get("/");
   // Mengharapkan respons berisi "Hello Response"
   expect(response.text).toContain("Hello Response");
});

// Tes untuk memeriksa akses file statis '/static/contoh.txt'
test('Test Static File /static/contoh.txt', async () => {
   // Mengirimkan permintaan GET ke '/static/contoh.txt'
   const response = await request(app).get("/static/contoh.txt");
   // Mengharapkan respons berisi "This is sample text" yang ada dalam file 'contoh.txt'
   expect(response.text).toContain("This is sample text");
});
