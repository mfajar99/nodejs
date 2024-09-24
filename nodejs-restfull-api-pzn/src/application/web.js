// Mengimpor library Express, yang digunakan untuk membuat server web dan menangani permintaan (request) serta respons HTTP.
import express from "express";

// Mengimpor rute publik dari file public-api.js.
// Rute-rute ini mungkin dapat diakses oleh semua pengguna, termasuk pengguna yang tidak terautentikasi.
import { publicRouter } from "../route/public-api.js";

// Mengimpor middleware untuk penanganan kesalahan dari file error-middleware.js.
// Middleware ini akan menangani setiap kesalahan yang terjadi dalam aplikasi.
import { errorMiddleware } from "../middleware/error-middleware.js";

// Mengimpor rute pengguna dari file api.js.
// Rute-rute ini mungkin mencakup fungsi seperti registrasi pengguna, login, dan manajemen profil.
import { userRouter } from "../route/api.js";

// Membuat instance aplikasi Express, yang akan berfungsi sebagai server web.
export const web = express();

// Baris ini memastikan bahwa server dapat mem-parsing data JSON yang dikirim dalam body request.
// Ini penting untuk menangani permintaan API yang mengirimkan data dalam format JSON.
web.use(express.json());

// Aplikasi menggunakan rute yang didefinisikan di publicRouter.
// Ini berarti rute-rute yang diekspor oleh publicRouter akan tersedia di aplikasi.
web.use(publicRouter);

// Aplikasi menggunakan rute yang didefinisikan di userRouter.
// Rute-rute ini kemungkinan terkait dengan manajemen pengguna, seperti registrasi dan autentikasi pengguna.
web.use(userRouter);

// Aplikasi menggunakan errorMiddleware, yang menangani dan memproses setiap kesalahan yang terjadi selama penanganan permintaan.
// Middleware ini biasanya ditempatkan di akhir rantai middleware untuk menangkap kesalahan yang tidak tertangani oleh middleware atau rute lainnya.
web.use(errorMiddleware);
