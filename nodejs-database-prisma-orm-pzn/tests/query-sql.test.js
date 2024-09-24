import { prismaClient } from "../src/prisma-client.js";

// Menguji fitur Prisma Client dengan menggunakan grup test suite
describe("Prisma Client", () => {
   it('should be able to query sql', async () => {
      // Mendefinisikan ID yang akan digunakan dalam query SQL
      const id = "1"; // ID yang digunakan untuk pencarian data

      // Menggunakan Prisma Client untuk menjalankan query SQL mentah (raw SQL) untuk mengambil data dari tabel 'sample'
      const samples = await prismaClient.$queryRaw`SELECT * FROM sample WHERE id = ${id}`;

      // Menampilkan hasil query untuk setiap baris yang ditemukan
      for (const sample of samples) {
         console.info(`Result sample id : ${sample.id} and name ${sample.name}`);
      }
   });

});

