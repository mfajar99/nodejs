import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware cookie-parser tanpa kunci rahasia
app.use(cookieParser());

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Route GET di root ("/")
app.get('/', (req, res) => {
   // Mengambil nama pengguna dari cookie yang tidak ditandatangani
   const name = req.cookies["name"];
   // Mengirimkan pesan "Hello" dengan nama pengguna
   res.send(`Hello ${name}`);
});

// Route POST di "/login"
app.post('/login', (req, res) => {
   // Mengambil nama pengguna dari body request
   const name = req.body.name;
   // Mengatur cookie "Login" dengan nilai nama pengguna dan path "/"
   res.cookie("Login", name, { path: "/" });
   // Mengirimkan pesan "Hello" dengan nama pengguna
   res.send(`Hello ${name}`);
});

// Uji untuk membaca cookie
test('Test Cookie Read', async () => {
   // Melakukan permintaan GET ke root ("/") dengan cookie yang ditetapkan
   const response = await request(app).get("/")
      .set("Cookie", "name=Fajar;author=Muhammad Fajar Amir");
   // Memeriksa apakah teks respons adalah "Hello Fajar"
   expect(response.text).toBe("Hello Fajar");
});

// Uji untuk menulis cookie
test('Test Cookie Write', async () => {
   // Melakukan permintaan POST ke "/login" dengan nama pengguna
   const response = await request(app).post("/login")
      .send({ name: "Fajar" });
   // Memeriksa apakah cookie yang diatur dalam respons adalah "Login=Fajar; Path=/"
   expect(response.get("Set-Cookie").toString()).toBe("Login=Fajar; Path=/");
   // Memeriksa apakah teks respons adalah "Hello Fajar"
   expect(response.text).toBe("Hello Fajar");
});
