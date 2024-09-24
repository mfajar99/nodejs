import { logger } from "../application/logging.js"; // Mengimpor modul logging untuk mencatat informasi aplikasi.
import contactService from "../service/contact-service.js"; // Mengimpor service yang menangani logika bisnis untuk kontak.

// Fungsi untuk membuat kontak baru berdasarkan data pengguna dan data yang dikirim dalam request body.
const create = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan informasi pengguna yang terautentikasi dari request.
      const request = req.body; // Mengambil data permintaan dari body request (data kontak yang akan dibuat).

      const result = await contactService.create(user, request); // Memanggil service untuk membuat kontak baru.

      res.status(200).json({
         data: result // Mengirimkan hasil pembuatan kontak dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika ada error, teruskan ke middleware error handler.
   }
}

// Fungsi untuk mendapatkan detail kontak berdasarkan ID pengguna dan ID kontak.
const get = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan informasi pengguna yang terautentikasi dari request.
      const contactId = req.params.contactId; // Mengambil contactId dari parameter URL.

      const result = await contactService.get(user, contactId); // Memanggil service untuk mendapatkan data kontak.

      res.status(200).json({
         data: result // Mengirimkan hasil dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Menghandle error dengan meneruskan ke middleware berikutnya.
   }
}

// Fungsi untuk memperbarui kontak berdasarkan ID kontak dan data baru yang dikirimkan.
const update = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan data pengguna yang terautentikasi dari request.
      const contactId = req.params.contactId; // Mengambil contactId dari parameter URL.
      const request = req.body; // Mengambil data baru dari body request.
      request.id = contactId; // Menyertakan contactId dalam request untuk memperjelas kontak mana yang diperbarui.

      const result = await contactService.update(user, request); // Memanggil service untuk memperbarui kontak.

      res.status(200).json({
         data: result // Mengirimkan hasil pembaruan dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika ada kesalahan, teruskan ke middleware error handler.
   }
}

// Fungsi untuk menghapus kontak berdasarkan ID pengguna dan kontak.
const remove = async (req, res, next) => {
   try {
      const user = req.user; // Mendapatkan informasi pengguna dari request.
      const contactId = req.params.contactId; // Mengambil contactId dari parameter URL.

      await contactService.remove(user, contactId); // Memanggil service untuk menghapus kontak.

      res.status(200).json({
         data: 'OK' // Mengirimkan respons bahwa penghapusan berhasil.
      });
   } catch (e) {
      next(e); // Menghandle error dengan meneruskan ke middleware berikutnya.
   }
}

// Fungsi untuk mencari kontak berdasarkan beberapa kriteria (nama, email, telepon) serta paginasi.
const search = async (req, res, next) => {
   try {
      // logger.info(req.query); // Jika ingin mencatat query yang dikirimkan untuk debugging, ini bisa diaktifkan.

      const user = req.user; // Mendapatkan informasi pengguna dari request.

      // Membuat objek permintaan berdasarkan query parameter yang dikirim.
      const request = {
         name: req.query.name, // Filter berdasarkan nama
         email: req.query.email, // Filter berdasarkan email
         phone: req.query.phone, // Filter berdasarkan nomor telepon
         page: req.query.page, // Nomor halaman untuk paginasi
         size: req.query.size // Jumlah item per halaman untuk paginasi
      };

      const result = await contactService.search(user, request); // Memanggil service untuk melakukan pencarian kontak.

      res.status(200).json({
         data: result.data, // Mengirimkan data hasil pencarian (kontak yang ditemukan).
         paging: result.paging // Mengirimkan informasi paginasi (seperti jumlah total halaman, halaman saat ini).
      });
   } catch (e) {
      next(e); // Menghandle error dengan meneruskan ke middleware berikutnya.
   }
}

// Mengekspor semua fungsi sebagai objek default agar dapat diimpor dan digunakan di rute lain.
export default {
   create, // Fungsi untuk membuat kontak baru.
   get, // Fungsi untuk mendapatkan detail kontak.
   update, // Fungsi untuk memperbarui kontak.
   remove, // Fungsi untuk menghapus kontak.
   search // Fungsi untuk mencari kontak berdasarkan filter tertentu.
}
