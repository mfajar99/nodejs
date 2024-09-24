import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Clinet", () => {

   // Pengujian untuk fungsi agregasi tanpa pengelompokan
   it("should can do aggregate function", async () => {
      // Menggunakan metode aggregate untuk mendapatkan nilai minimum, maksimum, dan rata-rata
      const result = await prismaClient.product.aggregate({
         _min: { // Mendapatkan nilai minimum
            price: true, // Minimum harga
            stock: true // Minimum stok
         },
         _max: { // Mendapatkan nilai maksimum
            price: true, // Maksimum harga
            stock: true // Maksimum stok
         },
         _avg: { // Mendapatkan rata-rata
            price: true, // Rata-rata harga
            stock: true // Rata-rata stok
         },
      });
      // Menampilkan hasil agregasi di konsol
      console.info(result);
   });

   // Pengujian untuk fungsi agregasi dengan pengelompokan
   it("should can do aggregate function with group by", async () => {
      // Menggunakan metode groupBy untuk mengelompokkan data berdasarkan kategori dan melakukan agregasi
      const result = await prismaClient.product.groupBy({
         by: ["category"], // Mengelompokkan data berdasarkan kolom kategori
         _min: { // Mendapatkan nilai minimum untuk setiap kelompok
            price: true, // Minimum harga per kategori
            stock: true // Minimum stok per kategori
         },
         _max: { // Mendapatkan nilai maksimum untuk setiap kelompok
            price: true, // Maksimum harga per kategori
            stock: true // Maksimum stok per kategori
         },
         _avg: { // Mendapatkan rata-rata untuk setiap kelompok
            price: true, // Rata-rata harga per kategori
            stock: true // Rata-rata stok per kategori
         },
      });
      // Menampilkan hasil agregasi yang dikelompokkan di konsol
      console.info(result);
   });

   // Pengujian untuk fungsi agregasi dengan pengelompokan dan filter menggunakan 'having'
   // Catatan: Prisma saat ini tidak mendukung 'having' secara langsung pada metode groupBy
   it("should can do aggregate function with group by and having", async () => {
      // Menggunakan metode groupBy untuk mengelompokkan data berdasarkan kategori dan melakukan agregasi
      const result = await prismaClient.product.groupBy({
         by: ["category"], // Mengelompokkan data berdasarkan kolom kategori
         _min: { // Mendapatkan nilai minimum untuk setiap kelompok
            price: true, // Minimum harga per kategori
            stock: true, // Minimum stok per kategori
         },
         _max: { // Mendapatkan nilai maksimum untuk setiap kelompok
            price: true, // Maksimum harga per kategori
            stock: true, // Maksimum stok per kategori
         },
         _avg: { // Mendapatkan rata-rata untuk setiap kelompok
            price: true, // Rata-rata harga per kategori
            stock: true, // Rata-rata stok per kategori
         },
         having: { // Catatan: Prisma tidak mendukung 'having' saat ini; digunakan untuk menunjukkan filter yang diinginkan
            price: {
               _avg: {
                  gt: 2000 // Hanya kelompok di mana rata-rata harga lebih besar dari 2000
               }
            }
         }
      });
      // Menampilkan hasil agregasi yang dikelompokkan di konsol
      console.info(result);
   });

});