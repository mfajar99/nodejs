import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware cookie-parser dengan kunci rahasia
app.use(cookieParser("CONTOHRAHASIA"));

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Route GET di root ("/")
app.get('/', (req, res) => {
   // Mengambil nama pengguna dari cookie yang sudah ditandatangani
   const name = req.signedCookies["Login"];
   // Mengirimkan pesan "Hello" dengan nama pengguna
   res.send(`Hello ${name}`);
});

// Route POST di "/login"
app.post('/login', (req, res) => {
   // Mengambil nama pengguna dari body request
   const name = req.body.name;
   // Mengatur cookie "Login" dengan nilai nama pengguna, menandatanganinya, dan mengatur path
   res.cookie("Login", name, { path: "/", signed: true });
   // Mengirimkan pesan "Hello" dengan nama pengguna
   res.send(`Hello ${name}`);
});

// Uji untuk membaca cookie
test('Test Cookie Read', async () => {
   // Melakukan permintaan GET ke root ("/") dengan cookie yang sudah ditandatangani
   const response = await request(app).get("/")
      .set("Cookie", "Login=s%3AFajar.Ba5MWeuCXikfYgUbX5rp5iWxuHSKfS8aPxT8NFKDgrg; Path=/");
   // Memeriksa apakah teks respons adalah "Hello Fajar"
   expect(response.text).toBe("Hello Fajar");
});

// Uji untuk menulis cookie
test('Test Cookie Write', async () => {
   // Melakukan permintaan POST ke "/login" dengan nama pengguna
   const response = await request(app).post("/login")
      .send({ name: "Fajar" });
   // Menampilkan cookie yang diatur dalam respons untuk debug
   console.info(response.get("Set-Cookie"));
   // Memeriksa apakah cookie yang diatur berisi nama pengguna
   expect(response.get("Set-Cookie").toString()).toContain("Fajar");
   // Memeriksa apakah teks respons adalah "Hello Fajar"
   expect(response.text).toBe("Hello Fajar");
});
