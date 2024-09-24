import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Membuat instance router
const router = express.Router();

// Middleware untuk mencetak informasi request
router.use((req, res, next) => {
   console.log(`Receive request : ${req.originalUrl}`);
   next();
});

// Mendefinisikan route GET untuk '/feature/a' pada router
router.get('/feature/a', (req, res) => {
   res.send("feature a");
});

// Tes untuk memeriksa respons sebelum router ditambahkan
test('Test Router Disable', async () => {
   // Mengirimkan permintaan GET ke '/feature/a' sebelum router ditambahkan
   // Mengharapkan status 404 karena route belum diatur pada aplikasi utama
   const response = await request(app).get("/feature/a");
   expect(response.status).toBe(404);
});

// Tes untuk memeriksa respons setelah router ditambahkan
test('Test Router Enable', async () => {
   // Menambahkan router ke aplikasi
   app.use(router);

   // Mengirimkan permintaan GET ke '/feature/a' setelah router ditambahkan
   // Mengharapkan respons 'feature a' dari route yang didefinisikan pada router
   const response = await request(app).get("/feature/a");
   expect(response.text).toBe("feature a");
});
