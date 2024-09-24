import Joi from "joi"; // Mengimpor library Joi untuk melakukan validasi data

// Skema validasi untuk membuat alamat baru
const createAddressValidation = Joi.object({
   street: Joi.string().max(255).optional(), // Jalan bersifat opsional, maksimal 255 karakter
   city: Joi.string().max(100).optional(),   // Kota bersifat opsional, maksimal 100 karakter
   province: Joi.string().max(100).optional(), // Provinsi bersifat opsional, maksimal 100 karakter
   country: Joi.string().max(100).required(), // Negara wajib diisi, maksimal 100 karakter
   postal_code: Joi.string().max(10).required() // Kode pos wajib diisi, maksimal 10 karakter
});

// Skema validasi untuk memperbarui alamat yang ada
const updateAddressValidation = Joi.object({
   id: Joi.number().min(1).positive().required(), // ID alamat yang akan diupdate harus berupa angka positif minimal 1
   street: Joi.string().max(255).optional(), // Jalan opsional, maksimal 255 karakter
   city: Joi.string().max(100).optional(),   // Kota opsional, maksimal 100 karakter
   province: Joi.string().max(100).optional(), // Provinsi opsional, maksimal 100 karakter
   country: Joi.string().max(100).required(), // Negara wajib diisi, maksimal 100 karakter
   postal_code: Joi.string().max(10).required() // Kode pos wajib diisi, maksimal 10 karakter
});

// Skema validasi untuk mengambil alamat berdasarkan ID
const getAddressValidation = Joi.number().min(1).positive().required(); // ID alamat harus berupa angka positif minimal 1

// Mengekspor skema validasi agar bisa digunakan di tempat lain
export {
   createAddressValidation, // Validasi untuk membuat alamat
   getAddressValidation,    // Validasi untuk mendapatkan alamat berdasarkan ID
   updateAddressValidation  // Validasi untuk memperbarui alamat
}
