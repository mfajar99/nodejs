import express from "express";
import request from "supertest";

// Middleware untuk mencetak informasi request
const logger = (req, res, next) => {
   // Mencetak metode HTTP dan URL dari request
   console.log(`Receive request: ${req.method} ${req.originalUrl}`);
   // Melanjutkan ke middleware berikutnya
   next();
};

// Middleware untuk menambahkan header "X-Powered-By"
const addPoweredHeader = (req, res, next) => {
   // Menambahkan header "X-Powered-By" pada response
   res.set("X-Powered-By", "Muhammad Fajar Amir");
   // Melanjutkan ke middleware berikutnya
   next();
};

// Middleware untuk memeriksa apiKey
const apiKeyMiddleWare = (req, res, next) => {
   // Memeriksa apakah query parameter "apiKey" ada
   if (req.query.apiKey) {
      // Jika ada, lanjutkan ke route handler berikutnya
      next();
   } else {
      // Jika tidak ada, kirimkan status 401 Unauthorized
      res.status(401).end();
   }
};

// Middleware untuk menyimpan waktu request
const requestTimeMiddleware = (req, res, next) => {
   // Menyimpan waktu request dalam objek req
   req.requestTime = Date.now();
   // Melanjutkan ke middleware berikutnya
   next();
};

// Membuat instance aplikasi Express
const app = express();

// Menggunakan middleware di aplikasi Express
app.use(logger);
app.use(apiKeyMiddleWare);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

// Mendefinisikan route GET untuk root ("/")
// Route ini mengirimkan teks "Hello Response"
app.get('/', (req, res) => {
   res.send(`Hello Response`);
});

// Mendefinisikan route GET untuk "/fajar"
// Route ini mengirimkan teks "Hello Fajar"
app.get('/fajar', (req, res) => {
   res.send(`Hello Fajar`);
});

// Mendefinisikan route GET untuk "/time"
// Route ini mengirimkan waktu request yang disimpan oleh middleware requestTimeMiddleware
app.get('/time', (req, res) => {
   res.send(`Hello, Today Is ${req.requestTime}`);
});

// Tes untuk memeriksa respons middleware
test("Test Response Middleware", async () => {
   // Mengirim permintaan GET ke root URL dengan query parameter apiKey
   const response = await request(app).get("/").query({ apiKey: "123" });
   // Memeriksa apakah header "X-Powered-By" ada dan sesuai
   expect(response.get("X-Powered-By")).toBe("Muhammad Fajar Amir");
   // Memeriksa apakah respons berisi teks yang sesuai
   expect(response.text).toBe("Hello Response");
});

// Tes untuk memeriksa respons route "/fajar"
test("Test Response Middleware 2", async () => {
   // Mengirim permintaan GET ke URL "/fajar" dengan query parameter apiKey
   const response = await request(app).get("/fajar").query({ apiKey: "123" });
   // Memeriksa apakah header "X-Powered-By" ada dan sesuai
   expect(response.get("X-Powered-By")).toBe("Muhammad Fajar Amir");
   // Memeriksa apakah respons berisi teks yang sesuai
   expect(response.text).toBe("Hello Fajar");
});

// Tes untuk memeriksa respons ketika apiKey tidak ada
test("Test Response Middleware Unauthorized", async () => {
   // Mengirim permintaan GET ke URL "/fajar" tanpa query parameter apiKey
   const response = await request(app).get("/fajar");
   // Memeriksa apakah status respons adalah 401 Unauthorized
   expect(response.status).toBe(401);
});

// Tes untuk memeriksa respons route "/time" dan waktu request
test("Test Response Time Middleware", async () => {
   // Mengirim permintaan GET ke URL "/time" dengan query parameter apiKey
   const response = await request(app).get("/time").query({ apiKey: "123" });
   // Memeriksa apakah header "X-Powered-By" ada dan sesuai
   expect(response.get("X-Powered-By")).toBe("Muhammad Fajar Amir");
   // Memeriksa apakah respons berisi teks dengan informasi waktu
   expect(response.text).toContain("Hello, Today Is");
});
