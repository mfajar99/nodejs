import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

/**
 * Menghapus user uji coba dengan username 'test' dari database.
 */
export const removeTestUser = async () => {
   await prismaClient.user.deleteMany({
      where: {
         username: 'test'
      }
   });
}

/**
 * Membuat user uji coba dengan username 'test' ke dalam database.
 * Password 'secret' di-hash menggunakan bcrypt untuk keamanan.
 */
export const createTestUser = async () => {
   await prismaClient.user.create({
      data: {
         username: 'test',
         password: await bcrypt.hash('secret', 10), // Meng-hash password 'secret'
         name: 'test',
         token: 'test'
      }
   });
}

/**
 * Mengambil data user uji coba dengan username 'test' dari database.
 */
export const getTestUser = async () => {
   return prismaClient.user.findUnique({
      where: {
         username: 'test'
      }
   });
}

/**
 * Menghapus semua kontak yang dimiliki oleh user dengan username 'test' dari database.
 */
export const removeAllTestContacts = async () => {
   await prismaClient.contact.deleteMany({
      where: {
         username: 'test'
      }
   });
}

/**
 * Membuat satu kontak uji coba untuk user dengan username 'test'.
 */
export const createTestContacts = async () => {
   await prismaClient.contact.create({
      data: {
         username: 'test',
         first_name: 'test',
         last_name: 'test',
         email: 'test@gmail.com',
         phone: '0840780000'
      }
   });
}

/**
 * Membuat 15 kontak uji coba untuk user dengan username 'test'.
 * Nama, email, dan nomor telepon bervariasi berdasarkan indeks perulangan.
 */
export const createManyTestContacts = async () => {
   for (let i = 0; i < 15; i++) {
      await prismaClient.contact.create({
         data: {
            username: `test`,
            first_name: `test ${i}`,
            last_name: `test ${i}`,
            email: `test${i}@gmail.com`,
            phone: `0840780000${i}`
         }
      });
   }
}

/**
 * Mengambil salah satu kontak uji coba yang dibuat untuk user dengan username 'test'.
 */
export const getTestContact = async () => {
   return prismaClient.contact.findFirst({
      where: {
         username: 'test'
      }
   });
}

/**
 * Menghapus semua alamat yang terkait dengan kontak milik user dengan username 'test'.
 */
export const removeAllTestAddresses = async () => {
   await prismaClient.address.deleteMany({
      where: {
         contact: {
            username: "test"
         }
      }
   });
}

/**
 * Membuat alamat uji coba untuk salah satu kontak milik user dengan username 'test'.
 * Data alamat seperti jalan, kota, provinsi, negara, dan kode pos disertakan.
 */
export const createTestAddress = async () => {
   const contact = await getTestContact(); // Mendapatkan salah satu kontak uji coba
   await prismaClient.address.create({
      data: {
         contact_id: contact.id, // Menghubungkan alamat dengan ID kontak
         street: "street test",
         city: 'city test',
         province: 'province test',
         country: 'indonesia',
         postal_code: '234234'
      }
   });
}

/**
 * Mengambil salah satu alamat yang terkait dengan kontak milik user dengan username 'test'.
 */
export const getTestAddress = async () => {
   return prismaClient.address.findFirst({
      where: {
         contact: {
            username: 'test'
         }
      }
   });
}
