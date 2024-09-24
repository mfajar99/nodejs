import { getAllProducts, getProductById } from "./database";

/**
 * `ProductService` adalah kelas layanan yang menyediakan cara untuk mengambil data produk.
 * Ini menggunakan dua metode: `findById` untuk mengambil produk berdasarkan ID, dan `findAll`
 * untuk mengambil semua produk yang tersedia. Kelas ini bertindak sebagai lapisan abstraksi
 * di atas akses langsung ke database (melalui `getAllProducts` dan `getProductById`).
 */
export class ProductService {

   /**
    * Mencari produk berdasarkan ID menggunakan fungsi `getProductById`.
    *
    * @param {number} id - ID produk yang ingin dicari
    * @returns {object} Produk dengan ID yang cocok
    */
   static findById(id) {
      return getProductById(id);
   };

   /**
    * Mengambil semua produk dari database menggunakan fungsi `getAllProducts`.
    *
    * @returns {array} Daftar semua produk
    */
   static findAll() {
      return getAllProducts();
   };
}
