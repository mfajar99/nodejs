import Joi from "joi"; // Mengimpor library Joi untuk melakukan validasi input

// Skema validasi untuk membuat kontak baru
const createContactValidation = Joi.object({
   first_name: Joi.string().max(100).required(), // Nama depan wajib diisi, maksimal 100 karakter
   last_name: Joi.string().max(100).optional(),  // Nama belakang opsional, maksimal 100 karakter
   email: Joi.string().max(200).email().optional(), // Email opsional, harus dalam format email yang valid, maksimal 200 karakter
   phone: Joi.string().max(20).optional() // Nomor telepon opsional, maksimal 20 karakter
});

// Skema validasi untuk mengambil kontak berdasarkan ID
const getContactValidation = Joi.number().positive().required(); // ID kontak harus berupa angka positif dan wajib diisi

// Skema validasi untuk memperbarui kontak yang ada
const updateContactValidation = Joi.object({
   id: Joi.number().positive().required(), // ID kontak yang akan diupdate harus berupa angka positif dan wajib diisi
   first_name: Joi.string().max(100).required(), // Nama depan wajib diisi, maksimal 100 karakter
   last_name: Joi.string().max(100).optional(),  // Nama belakang opsional, maksimal 100 karakter
   email: Joi.string().max(200).email().optional(), // Email opsional, harus valid, maksimal 200 karakter
   phone: Joi.string().max(20).optional() // Nomor telepon opsional, maksimal 20 karakter
});

// Skema validasi untuk mencari kontak berdasarkan filter
const searchContactValidation = Joi.object({
   page: Joi.number().min(1).positive().default(1), // Halaman minimal 1, default 1 jika tidak diberikan
   size: Joi.number().min(1).positive().max(100).default(10), // Ukuran hasil per halaman minimal 1, maksimal 100, default 10
   name: Joi.string().optional(), // Nama opsional, untuk pencarian berdasarkan nama
   email: Joi.string().optional(), // Email opsional, untuk pencarian berdasarkan email
   phone: Joi.string().optional() // Nomor telepon opsional, untuk pencarian berdasarkan nomor telepon
});

// Mengekspor skema validasi agar bisa digunakan di tempat lain
export {
   createContactValidation,  // Validasi untuk membuat kontak baru
   getContactValidation,     // Validasi untuk mengambil kontak berdasarkan ID
   updateContactValidation,  // Validasi untuk memperbarui kontak yang ada
   searchContactValidation   // Validasi untuk mencari kontak berdasarkan filter
}
