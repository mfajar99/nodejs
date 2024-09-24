import { ResponseError } from "../error/response-error.js"; // Mengimpor custom error untuk menangani respons error

// Fungsi 'validate' digunakan untuk mengvalidasi data permintaan (request) menggunakan skema validasi Joi
const validate = (schema, request) => {
   // Melakukan validasi menggunakan skema dan data permintaan
   const result = schema.validate(request, {
      abortEarly: false, // Memerintahkan Joi untuk melaporkan semua kesalahan validasi, bukan berhenti pada kesalahan pertama
      allowUnknown: false // Melarang properti yang tidak didefinisikan dalam skema validasi
   });

   // Jika ada kesalahan validasi, lemparkan ResponseError dengan status 400 dan pesan kesalahan
   if (result.error) {
      throw new ResponseError(400, result.error.message);
   } else {
      // Jika tidak ada kesalahan, kembalikan nilai yang divalidasi
      return result.value;
   }
}

// Mengekspor fungsi validasi agar bisa digunakan di tempat lain
export {
   validate
}
