import { prismaClient } from "../src/prisma-client"

describe("Prisma Client", () => {
   it('should can do sorting', async () => {
      // Mengambil hingga 10 entri customer, dimulai dari entri pertama
      const customers = await prismaClient.customer.findMany({
         skip: 0,   // Lewati 0 entri (mulai dari entri pertama)
         take: 10,  // Ambil maksimal 10 entri
         orderBy: [
            {
               name: "desc" // Urutkan entri berdasarkan nama secara menurun (Z-A)
            },
            {
               email: "asc" // Jika ada nama yang sama, urutkan berdasarkan email secara naik (A-Z)
            }
         ]
      });

      // Menampilkan daftar customer yang diambil ke console
      console.log(customers);
   });

});