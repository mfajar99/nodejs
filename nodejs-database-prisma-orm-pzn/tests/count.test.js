import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
   it('should can count', async () => {
      // Menggunakan Prisma Client untuk menghitung jumlah pelanggan dengan nama "Cinta"
      const total = await prismaClient.customer.count({
         where: {
            name: "Cinta" // Kondisi: nama pelanggan harus "Cinta"
         }
      });

      // Memeriksa apakah jumlah pelanggan dengan nama "Cinta" adalah 1
      expect(total).toBe(1);
   });

})