import { prismaClient } from "../application/database.js"; // Mengimpor prismaClient untuk berinteraksi dengan database.
import { ResponseError } from "../error/response-error.js"; // Mengimpor custom error untuk menangani error dengan status code.
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"; // Mengimpor validasi untuk data alamat.
import { getContactValidation } from "../validation/contact-validation.js"; // Mengimpor validasi untuk ID kontak.
import { validate } from "../validation/validation.js"; // Mengimpor fungsi validasi umum.

// Fungsi untuk memastikan kontak dengan `contactId` yang diberikan ada dalam database.
const checkContactMustExists = async (user, contactId) => {
   // Memvalidasi `contactId` dengan skema validasi `getContactValidation`.
   contactId = validate(getContactValidation, contactId);

   // Menghitung apakah ada kontak dengan `contactId` dan `username` dari pengguna yang sedang login.
   const totalContactInDatabase = await prismaClient.contact.count({
      where: {
         username: user.username, // Memastikan kontak milik pengguna yang sedang login.
         id: contactId
      }
   });

   // Jika kontak tidak ditemukan, lemparkan error 404.
   if (totalContactInDatabase !== 1) {
      throw new ResponseError(404, 'contact is not found');
   }

   return contactId; // Jika kontak ditemukan, kembalikan `contactId`.
}

// Fungsi untuk membuat alamat baru terkait kontak tertentu.
const create = async (user, contactId, request) => {
   contactId = await checkContactMustExists(user, contactId); // Memeriksa apakah kontak ada.

   // Memvalidasi data alamat baru yang akan dibuat.
   const address = validate(createAddressValidation, request);
   address.contact_id = contactId; // Menambahkan `contact_id` ke dalam data alamat.

   // Menyimpan alamat baru ke database dan mengembalikan data alamat yang sudah disimpan.
   return prismaClient.address.create({
      data: address,
      select: {
         id: true, // Mengambil hanya beberapa field dari hasil, seperti `id`, `street`, dsb.
         street: true,
         city: true,
         province: true,
         country: true,
         postal_code: true
      }
   });
}

// Fungsi untuk mendapatkan alamat tertentu berdasarkan `contactId` dan `addressId`.
const get = async (user, contactId, addressId) => {
   contactId = await checkContactMustExists(user, contactId); // Memeriksa apakah kontak ada.
   addressId = validate(getAddressValidation, addressId); // Memvalidasi `addressId`.

   // Mencari alamat di database berdasarkan `contactId` dan `addressId`.
   const address = await prismaClient.address.findFirst({
      where: {
         contact_id: contactId,
         id: addressId
      },
      select: {
         id: true,
         street: true,
         city: true,
         province: true,
         country: true,
         postal_code: true
      }
   });

   // Jika alamat tidak ditemukan, lemparkan error 404.
   if (!address) {
      throw new ResponseError(404, 'address is not found');
   }
   return address; // Mengembalikan data alamat yang ditemukan.
}

// Fungsi untuk memperbarui alamat yang sudah ada.
const update = async (user, contactId, request) => {
   contactId = await checkContactMustExists(user, contactId); // Memeriksa apakah kontak ada.
   const address = validate(updateAddressValidation, request); // Memvalidasi data alamat yang akan diperbarui.

   // Memeriksa apakah alamat yang akan diperbarui ada di database.
   const totalAddressInDatabase = await prismaClient.address.count({
      where: {
         contact_id: contactId,
         id: address.id
      }
   });

   // Jika alamat tidak ditemukan, lemparkan error 404.
   if (totalAddressInDatabase !== 1) {
      throw new ResponseError(404, 'address is not found');
   }

   // Memperbarui data alamat di database.
   return prismaClient.address.update({
      where: {
         id: address.id
      },
      data: {
         street: address.street,
         city: address.city,
         province: address.province,
         country: address.country,
         postal_code: address.postal_code
      },
      select: {
         id: true,
         street: true,
         city: true,
         province: true,
         country: true,
         postal_code: true
      }
   });
}

// Fungsi untuk menghapus alamat tertentu dari database.
const remove = async (user, contactId, addressId) => {
   contactId = await checkContactMustExists(user, contactId); // Memeriksa apakah kontak ada.
   addressId = validate(getAddressValidation, addressId); // Memvalidasi `addressId`.

   // Memeriksa apakah alamat ada di database.
   const totalAddressInDatabase = await prismaClient.address.count({
      where: {
         contact_id: contactId,
         id: addressId
      }
   });

   // Jika alamat tidak ditemukan, lemparkan error 404.
   if (totalAddressInDatabase !== 1) {
      throw new ResponseError(404, 'address is not found');
   }

   // Menghapus alamat dari database.
   return prismaClient.address.delete({
      where: {
         id: addressId
      }
   });
}

// Fungsi untuk mendapatkan daftar alamat yang terkait dengan `contactId`.
const list = async (user, contactId) => {
   contactId = await checkContactMustExists(user, contactId); // Memeriksa apakah kontak ada.

   // Mengambil semua alamat terkait `contactId` dari database.
   return prismaClient.address.findMany({
      where: {
         contact_id: contactId
      },
      select: {
         id: true,
         street: true,
         city: true,
         province: true,
         country: true,
         postal_code: true
      }
   });
}

// Mengekspor semua fungsi agar dapat digunakan di tempat lain.
export default {
   create,
   get,
   update,
   remove,
   list
}
