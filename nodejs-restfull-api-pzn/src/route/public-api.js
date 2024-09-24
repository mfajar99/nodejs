import express from 'express';
import { publicRouter } from './routes/public-routes.js'; // Mengimpor router yang sudah diekspor.

const app = express();

// Middleware untuk mengaktifkan parsing JSON dari request body.
app.use(express.json());

// Menggunakan publicRouter untuk mengakses route publik.
app.use(publicRouter);

// Menjalankan server pada port tertentu.
app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
