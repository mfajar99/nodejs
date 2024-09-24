import { prismaClient } from "../src/prisma-client";

// Deskripsi umum dari grup tes ini
describe("Prisma Client", () => {

   // Kasus uji untuk memastikan bahwa transaksi berurutan dapat dijalankan dengan sukses
   it('should can execute sequential transaction', async () => {

      // Menggunakan Prisma Client untuk melakukan transaksi.
      // Dalam transaksi ini, dua pelanggan dibuat secara berurutan.
      const [jaka, sembung] = await prismaClient.$transaction([
         prismaClient.customer.create({
            data: {
               id: "jaka", // Identifikasi unik untuk pelanggan
               email: "jaka@gmail.com", // Email pelanggan
               name: "Jaka", // Nama pelanggan
               phone: "0852323212" // Nomor telepon pelanggan
            }
         }),
         prismaClient.customer.create({
            data: {
               id: "sembung", // Identifikasi unik untuk pelanggan
               email: "sembung@gmail.com", // Email pelanggan
               name: "Sembung", // Nama pelanggan
               phone: "0852323200" // Nomor telepon pelanggan
            }
         })
      ], {
         timeout: 5 // Menetapkan batas waktu untuk transaksi (dalam milidetik)
      });

      // Memeriksa apakah nama pelanggan pertama yang dibuat adalah "Hasan"
      expect(jaka.name).toBe("Jaka");

      // Memeriksa apakah nama pelanggan kedua yang dibuat adalah "Sinal"
      expect(sembung.name).toBe("Sembung");
   });



   // Tes kedua untuk memeriksa transaksi dengan cara berbeda
   it('should can execute interactive transaction', async () => {

      const [aldi, aldo] = await prismaClient.$transaction(async (prisma) => {
         const aldi = await prisma.customer.create({
            data: {
               id: "aldi", // Identifikasi unik untuk pelanggan
               email: "aldi@gmail.com", // Email pelanggan
               name: "Aldi", // Nama pelanggan
               phone: " 7394739" // Nomor telepon pelanggan
            }
         });
         const aldo = await prisma.customer.create({
            data: {
               id: "aldo", // Identifikasi unik untuk pelanggan
               email: "aldo@gmail.com", // Email pelanggan
               name: "Aldo", // Nama pelanggan
               phone: "30784038" // Nomor telepon pelanggan
            }
         });
         return [aldi, aldo];
      })
      // Memeriksa apakah nama pelanggan pertama yang dibuat adalah "Hasan"
      expect(aldi.name).toBe("Aldi");

      // Memeriksa apakah nama pelanggan kedua yang dibuat adalah "Sinal"
      expect(aldo.name).toBe("Aldo");

   });
});
