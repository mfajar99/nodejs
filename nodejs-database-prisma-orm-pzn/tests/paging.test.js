import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
   it('should can do paging', async () => {
      // Mengambil halaman pertama, dengan melewati 0 entri dan mengambil 1 entri
      const page1 = await prismaClient.customer.findMany({
         skip: 0, // Lewati 0 entri (mulai dari entri pertama)
         take: 1  // Ambil 1 entri
      });
      // Memastikan bahwa ada 1 entri pada halaman pertama
      expect(page1.length).toBe(1);

      // Mengambil halaman kedua, dengan melewati 1 entri dan mengambil 1 entri
      const page2 = await prismaClient.customer.findMany({
         skip: 1, // Lewati 1 entri (mulai dari entri kedua)
         take: 1  // Ambil 1 entri
      });
      // Memastikan bahwa ada 1 entri pada halaman kedua
      expect(page2.length).toBe(1);

      // Mengambil halaman ketiga, dengan melewati 2 entri dan mengambil 1 entri
      const page3 = await prismaClient.customer.findMany({
         skip: 2, // Lewati 2 entri (mulai dari entri ketiga)
         take: 1  // Ambil 1 entri
      });
      // Memastikan bahwa ada 1 entri pada halaman ketiga
      expect(page3.length).toBe(1);
   });

})