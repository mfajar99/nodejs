import { prismaClient } from "../application/database.js"; // Mengimpor prismaClient untuk berinteraksi dengan database.
import { ResponseError } from "../error/response-error.js"; // Mengimpor custom error untuk menangani error dengan status code.
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js"; // Mengimpor validasi untuk kontak.
import { validate } from "../validation/validation.js"; // Mengimpor fungsi validasi umum.

// Fungsi untuk membuat kontak baru.
const create = async (user, request) => {
   const contact = validate(createContactValidation, request); // Memvalidasi input kontak.
   contact.username = user.username; // Menyimpan kontak untuk user yang sedang login.

   // Menyimpan kontak ke database dan mengembalikan data kontak yang disimpan.
   return prismaClient.contact.create({
      data: contact,
      select: {
         id: true, // Mengambil hanya field yang dibutuhkan.
         first_name: true,
         last_name: true,
         email: true,
         phone: true
      }
   });
}

// Fungsi untuk mendapatkan detail kontak berdasarkan `contactId`.
const get = async (user, contactId) => {
   contactId = validate(getContactValidation, contactId); // Memvalidasi `contactId`.

   // Mencari kontak di database berdasarkan `contactId` dan `username` pengguna.
   const contact = await prismaClient.contact.findFirst({
      where: {
         username: user.username,
         id: contactId
      },
      select: {
         id: true,
         first_name: true,
         last_name: true,
         email: true,
         phone: true
      }
   });

   // Jika kontak tidak ditemukan, lemparkan error 404.
   if (!contact) {
      throw new ResponseError(404, 'contact is not found');
   }

   return contact; // Mengembalikan data kontak yang ditemukan.
}

// Fungsi untuk memperbarui detail kontak yang sudah ada.
const update = async (user, request) => {
   const contact = validate(updateContactValidation, request); // Memvalidasi data kontak yang diperbarui.

   // Memeriksa apakah kontak ada di database.
   const totalContactInDatabase = await prismaClient.contact.count({
      where: {
         username: user.username,
         id: contact.id
      }
   });

   // Jika kontak tidak ditemukan, lemparkan error 404.
   if (totalContactInDatabase !== 1) {
      throw new ResponseError(404, 'contact is not found');
   }

   // Memperbarui kontak di database.
   return prismaClient.contact.update({
      where: {
         id: contact.id
      },
      data: {
         first_name: contact.first_name,
         last_name: contact.last_name,
         email: contact.email,
         phone: contact.phone
      },
      select: {
         id: true,
         first_name: true,
         last_name: true,
         email: true,
         phone: true
      }
   });
}

// Fungsi untuk menghapus kontak berdasarkan `contactId`.
const remove = async (user, contactId) => {
   contactId = validate(getContactValidation, contactId); // Memvalidasi `contactId`.

   // Memeriksa apakah kontak ada di database.
   const totalInDatabase = await prismaClient.contact.count({
      where: {
         username: user.username,
         id: contactId
      }
   });

   // Jika kontak tidak ditemukan, lemparkan error 404.
   if (totalInDatabase !== 1) {
      throw new ResponseError(404, 'contact is not found');
   }

   // Menghapus kontak dari database.
   return prismaClient.contact.delete({
      where: {
         id: contactId
      }
   });
}

// Fungsi untuk mencari kontak berdasarkan nama, email, atau nomor telepon.
const search = async (user, request) => {
   request = validate(searchContactValidation, request); // Memvalidasi input pencarian.

   // Menghitung offset berdasarkan halaman dan ukuran data yang diambil.
   const skip = (request.page - 1) * request.size;

   // Membuat filter pencarian untuk kontak.
   const filters = [];
   filters.push({ username: user.username }); // Filter pertama adalah username pengguna.

   // Jika ada nama yang diinginkan dalam pencarian, tambahkan filter.
   if (request.name) {
      filters.push({
         OR: [
            { first_name: { contains: request.name } },
            { last_name: { contains: request.name } }
         ]
      });
   }
   // Jika ada email yang diinginkan dalam pencarian, tambahkan filter.
   if (request.email) {
      filters.push({ email: { contains: request.email } });
   }
   // Jika ada nomor telepon yang diinginkan dalam pencarian, tambahkan filter.
   if (request.phone) {
      filters.push({ phone: { contains: request.phone } });
   }

   // Mencari kontak di database dengan filter yang dibuat.
   const contacts = await prismaClient.contact.findMany({
      where: {
         AND: filters // Menggabungkan semua filter dengan operator AND.
      },
      take: request.size, // Batasi jumlah data yang diambil per halaman.
      skip: skip // Lewati sejumlah data untuk paginasi.
   });

   // Menghitung total item untuk keperluan paginasi.
   const totalItems = await prismaClient.contact.count({
      where: {
         AND: filters
      }
   });

   // Mengembalikan data kontak dan informasi paginasi.
   return {
      data: contacts,
      paging: {
         page: request.page,
         total_item: totalItems,
         total_page: Math.ceil(totalItems / request.size) // Hitung jumlah total halaman.
      }
   }
}

// Mengekspor semua fungsi agar bisa digunakan di tempat lain.
export default {
   create,
   get,
   update,
   remove,
   search
}
