import { validate } from "../validation/validation.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"

// Fungsi 'register' digunakan untuk mendaftarkan pengguna baru
const register = async (request) => {
   // Validasi data permintaan pendaftaran
   const user = validate(registerUserValidation, request);

   // Mengecek apakah username sudah ada di database
   const countUser = await prismaClient.user.count({
      where: {
         username: user.username
      }
   });

   // Jika username sudah terdaftar, kirim pesan error
   if (countUser === 1) {
      throw new ResponseError(400, "Username already exist");
   }

   // Meng-hash password pengguna sebelum disimpan ke database
   user.password = await bcrypt.hash(user.password, 10);

   // Menyimpan data pengguna ke dalam database
   return prismaClient.user.create({
      data: user,
      select: {
         username: true, // Mengembalikan username pengguna
         name: true // Mengembalikan nama pengguna
      }
   });
}

// Fungsi 'login' untuk autentikasi pengguna
const login = async (request) => {
   // Validasi data permintaan login
   const loginRequest = validate(loginUserValidation, request);

   // Mencari pengguna berdasarkan username
   const user = await prismaClient.user.findUnique({
      where: {
         username: loginRequest.username
      },
      select: {
         username: true,
         password: true // Mengambil password untuk pengecekan
      }
   });

   // Jika pengguna tidak ditemukan, kirim pesan error
   if (!user) {
      throw new ResponseError(401, "Username or password wrong");
   }

   // Membandingkan password yang dimasukkan dengan password yang di-hash
   const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

   // Jika password tidak cocok, kirim pesan error
   if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password wrong");
   }

   // Membuat token baru untuk sesi login pengguna
   const token = uuid().toString();

   // Mengupdate token pengguna di database
   return prismaClient.user.update({
      data: {
         token: token // Menyimpan token
      },
      where: {
         username: user.username
      },
      select: {
         token: true // Mengembalikan token yang baru dibuat
      }
   });
}

// Fungsi 'get' untuk mengambil data pengguna berdasarkan username
const get = async (username) => {
   // Validasi input username
   username = validate(getUserValidation, username);

   // Mencari pengguna di database berdasarkan username
   const user = await prismaClient.user.findUnique({
      where: {
         username: username
      },
      select: {
         username: true, // Mengambil username
         name: true // Mengambil nama
      }
   });

   // Jika pengguna tidak ditemukan, kirim pesan error
   if (!user) {
      throw new ResponseError(404, 'user is not found');
   }

   return user; // Mengembalikan data pengguna
}

// Fungsi 'update' untuk memperbarui data pengguna
const update = async (request) => {
   // Validasi data yang dikirim untuk diperbarui
   const user = validate(updateUserValidation, request);

   // Mengecek apakah pengguna dengan username tersebut ada di database
   const totalUsrInDatabase = await prismaClient.user.count({
      where: {
         username: user.username
      }
   });

   // Jika pengguna tidak ditemukan, kirim pesan error
   if (totalUsrInDatabase !== 1) {
      throw new ResponseError(404, 'user is not found');
   }

   // Menyimpan perubahan data pengguna
   const data = {};
   if (user.name) {
      data.name = user.name; // Update nama jika disertakan
   }
   if (user.password) {
      data.password = await bcrypt.hash(user.password, 10); // Hash password baru jika ada
   }

   // Mengupdate data pengguna di database
   return prismaClient.user.update({
      where: {
         username: user.username
      },
      data: data, // Data yang akan diupdate
      select: {
         username: true, // Mengembalikan username
         name: true // Mengembalikan nama
      }
   });
}

// Fungsi 'logout' untuk menghapus token login pengguna
const logout = async (username) => {
   // Validasi input username
   username = validate(getUserValidation, username);

   // Mengecek apakah pengguna ada di database
   const user = await prismaClient.user.findUnique({
      where: {
         username: username
      }
   });

   // Jika pengguna tidak ditemukan, kirim pesan error
   if (!user) {
      throw new ResponseError(404, 'user is not found');
   }

   // Menghapus token login dengan mengatur token menjadi null
   return prismaClient.user.update({
      where: {
         username: username
      },
      data: {
         token: null // Menghapus token
      },
      select: {
         username: true // Mengembalikan username
      }
   });
}

// Ekspor fungsi-fungsi agar dapat digunakan di tempat lain
export default {
   register,
   login,
   get,
   update,
   logout
}
