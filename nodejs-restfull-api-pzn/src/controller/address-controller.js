import { logger } from "../application/logging.js"; // Mengimpor modul logging untuk mencatat informasi aplikasi.
import addressService from "../service/address.service.js"; // Mengimpor service yang menangani logika bisnis untuk alamat.

// Fungsi untuk membuat alamat baru berdasarkan pengguna yang terautentikasi, ID kontak, dan data permintaan.
const create = async (req, res, next) => {
   try {
      const user = req.user; // Mengambil informasi pengguna dari request yang terautentikasi.
      const request = req.body; // Mengambil data permintaan dari body request (data alamat yang akan ditambahkan).
      const contactId = req.params.contactId; // Mengambil contactId dari parameter URL.

      const result = await addressService.create(user, contactId, request); // Memanggil service untuk membuat alamat baru.

      res.status(200).json({
         data: result // Mengirimkan hasil pembuatan alamat dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika ada error, teruskan ke middleware error handler.
   }
}

// Fungsi untuk mendapatkan detail alamat berdasarkan ID pengguna, kontak, dan alamat.
const get = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan data pengguna yang terautentikasi.
      const contactId = req.params.contactId; // Mendapatkan contactId dari parameter URL.
      const addressId = req.params.addressId; // Mendapatkan addressId dari parameter URL.

      const result = await addressService.get(user, contactId, addressId); // Memanggil service untuk mendapatkan data alamat.

      res.status(200).json({
         data: result // Mengirimkan hasilnya dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Menghandle error dengan meneruskan ke middleware berikutnya.
   }
}

// Fungsi untuk memperbarui alamat berdasarkan pengguna, kontak, dan data permintaan.
const update = async (req, res, next) => {
   try {
      // logger.info(result.body); // Contoh logging jika ingin mencatat data request untuk debugging.

      const user = req.user; // Mendapatkan informasi pengguna dari request.
      const contactId = req.params.contactId; // Mendapatkan contactId dari URL parameter.
      const addressId = req.params.addressId; // Mendapatkan addressId dari URL parameter.
      const request = req.body; // Mendapatkan data baru dari body request.
      request.id = addressId; // Menyertakan addressId dalam request untuk memastikan bahwa alamat yang benar diperbarui.

      const result = await addressService.update(user, contactId, request); // Memanggil service untuk memperbarui alamat.

      res.status(200).json({
         data: result // Mengirimkan hasil pembaruan dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika ada kesalahan, teruskan ke middleware error handler.
   }
}

// Fungsi untuk menghapus alamat berdasarkan ID pengguna, kontak, dan alamat.
const remove = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan data pengguna yang terautentikasi.
      const contactId = req.params.contactId; // Mendapatkan contactId dari parameter URL.
      const addressId = req.params.addressId; // Mendapatkan addressId dari parameter URL.

      const result = await addressService.remove(user, contactId, addressId); // Memanggil service untuk menghapus alamat.

      res.status(200).json({
         data: 'OK' // Mengirimkan respons bahwa penghapusan berhasil.
      });
   } catch (e) {
      next(e); // Menghandle error dengan meneruskan ke middleware berikutnya.
   }
}

// Fungsi untuk mendapatkan daftar semua alamat berdasarkan pengguna dan kontak.
const list = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan informasi pengguna dari request.
      const contactId = req.params.contactId; // Mendapatkan contactId dari parameter URL.

      const result = await addressService.list(user, contactId); // Memanggil service untuk mendapatkan daftar alamat.

      res.status(200).json({
         data: result // Mengirimkan daftar alamat dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika ada kesalahan, teruskan ke middleware error handler.
   }
}

export default {
   create, // Mengekspor fungsi create untuk digunakan di rute lain.
   get, // Mengekspor fungsi get untuk mendapatkan alamat.
   update, // Mengekspor fungsi update untuk memperbarui alamat.
   remove, // Mengekspor fungsi remove untuk menghapus alamat.
   list // Mengekspor fungsi list untuk mendapatkan daftar alamat.
}
