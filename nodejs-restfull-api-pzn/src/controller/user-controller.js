import userService from "../service/user-service.js"; // Mengimpor service yang menangani logika bisnis terkait pengguna.

// Fungsi untuk mendaftarkan pengguna baru.
const register = async (req, res, next) => {
   try {
      const result = await userService.register(req.body); // Memanggil service untuk mendaftarkan pengguna dengan data dari body request.
      res.status(200).json({
         data: result // Mengirimkan hasil registrasi dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika terjadi kesalahan, diteruskan ke middleware error handler.
   }
}

// Fungsi untuk login pengguna.
const login = async (req, res, next) => {
   try {
      const result = await userService.login(req.body); // Memanggil service untuk melakukan login dengan data dari body request.
      res.status(200).json({
         data: result // Mengirimkan hasil login dalam bentuk JSON, biasanya berisi token atau informasi pengguna.
      });
   } catch (e) {
      next(e); // Jika ada kesalahan, diteruskan ke error handler.
   }
}

// Fungsi untuk mendapatkan data pengguna yang sedang login (dengan autentikasi).
const get = async (req, res, next) => {
   try {
      const username = req.user.username; // Mengambil username dari pengguna yang sedang terautentikasi.
      const result = await userService.get(username); // Memanggil service untuk mendapatkan data pengguna berdasarkan username.
      res.status(200).json({
         data: result // Mengirimkan data pengguna dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Menghandle error dan meneruskannya ke middleware error handler.
   }
}

// Fungsi untuk memperbarui informasi pengguna.
const update = async (req, res, next) => {
   try {
      const username = req.user.username; // Mendapatkan username dari pengguna yang terautentikasi.
      const request = req.body; // Mengambil data baru dari body request.
      request.username = username; // Pastikan bahwa data yang diupdate sesuai dengan pengguna yang terautentikasi.

      const result = await userService.update(request); // Memanggil service untuk memperbarui informasi pengguna.
      res.status(200).json({
         data: result // Mengirimkan hasil pembaruan dalam bentuk JSON.
      });
   } catch (e) {
      next(e); // Jika ada kesalahan, diteruskan ke middleware error handler.
   }
}

// Fungsi untuk logout pengguna.
const logout = async (req, res, next) => {
   try {
      await userService.logout(req.user.username); // Memanggil service untuk melakukan logout pengguna berdasarkan username yang sedang login.
      res.status(200).json({
         data: "OK" // Mengirimkan respons bahwa logout berhasil.
      });
   } catch (e) {
      next(e); // Jika terjadi kesalahan, diteruskan ke middleware error handler.
   }
}

// Mengekspor semua fungsi agar bisa digunakan di file lain, seperti di router.
export default {
   register, // Fungsi untuk mendaftarkan pengguna baru.
   login,    // Fungsi untuk login pengguna.
   get,      // Fungsi untuk mendapatkan data pengguna yang login.
   update,   // Fungsi untuk memperbarui informasi pengguna.
   logout    // Fungsi untuk logout pengguna.
}
