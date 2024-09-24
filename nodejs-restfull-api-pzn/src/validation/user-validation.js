import Joi from "joi"; // Mengimpor library Joi untuk melakukan validasi input

// Skema validasi untuk registrasi pengguna baru
const registerUserValidation = Joi.object({
   username: Joi.string().max(100).required(), // Username wajib diisi, maksimal 100 karakter
   password: Joi.string().max(100).required(), // Password wajib diisi, maksimal 100 karakter
   name: Joi.string().max(100).required() // Nama wajib diisi, maksimal 100 karakter
});

// Skema validasi untuk login pengguna
const loginUserValidation = Joi.object({
   username: Joi.string().max(100).required(), // Username wajib diisi, maksimal 100 karakter
   password: Joi.string().max(100).required()  // Password wajib diisi, maksimal 100 karakter
});

// Skema validasi untuk mengambil data pengguna berdasarkan username
const getUserValidation = Joi.string().max(100).required(); // Username wajib diisi, maksimal 100 karakter

// Skema validasi untuk memperbarui data pengguna
const updateUserValidation = Joi.object({
   username: Joi.string().max(100).required(), // Username wajib diisi, maksimal 100 karakter
   password: Joi.string().max(100).optional(), // Password opsional, maksimal 100 karakter
   name: Joi.string().max(100).optional() // Nama opsional, maksimal 100 karakter
});

// Mengekspor skema validasi agar bisa digunakan di tempat lain
export {
   registerUserValidation,  // Validasi untuk registrasi pengguna
   loginUserValidation,     // Validasi untuk login pengguna
   getUserValidation,       // Validasi untuk mendapatkan pengguna berdasarkan username
   updateUserValidation     // Validasi untuk memperbarui data pengguna
};
