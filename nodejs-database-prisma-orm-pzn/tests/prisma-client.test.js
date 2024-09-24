import { PrismaClient } from "@prisma/client";

describe("Prisma Client", () => {
   it('should be able to connect to database', async () => {
      // Membuat instance baru dari PrismaClient untuk berinteraksi dengan database
      const prisma = new PrismaClient();

      // Menghubungkan ke database menggunakan Prisma Client
      await prisma.$connect();

      // Lakukan sesuatu di sini, misalnya operasi database seperti query atau manipulasi data
      // // do something

      // Memutuskan koneksi dari database setelah operasi selesai
      await prisma.$disconnect();
   });

});
