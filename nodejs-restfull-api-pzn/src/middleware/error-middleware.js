import { ResponseError } from "../error/response-error.js"; // Mengimpor custom error class ResponseError untuk menangani error spesifik.

// Middleware untuk menangani semua error dalam aplikasi.
const errorMiddleware = async (err, req, res, next) => {
   // Jika tidak ada error, lanjutkan ke middleware atau route handler berikutnya.
   if (!err) {
      next();
      return; // Mengakhiri fungsi agar tidak ada kode berikutnya yang dieksekusi.
   }

   // Jika error adalah instance dari ResponseError (custom error), gunakan status dan pesan dari error tersebut.
   if (err instanceof ResponseError) {
      res.status(err.status).json({
         errors: err.message // Mengirimkan pesan error dalam bentuk JSON.
      }).end(); // Menyudahi respons dengan .end() agar tidak ada data tambahan yang dikirim.
   } else {
      // Jika error bukan ResponseError, kirim status 500 (Internal Server Error).
      res.status(500).json({
         errors: err.message // Mengirimkan pesan error dari error default.
      }).end(); // Menyudahi respons.
   }
}

export {
   errorMiddleware // Mengekspor middleware ini agar dapat digunakan di file lain.
}
