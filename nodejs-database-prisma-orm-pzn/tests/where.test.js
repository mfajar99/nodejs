import { prismaClient } from "../src/prisma-client.js";

describe('Prisma Client', () => {
   it('should can using or operator', async () => {
      // Menggunakan Prisma Client untuk menemukan banyak produk dengan kondisi OR (nama produk "A" atau "B")
      const products = await prismaClient.product.findMany({
         where: {
            OR: [
               {
                  name: "A" // Kondisi pertama: produk dengan nama "A"
               },
               {
                  name: "B" // Kondisi kedua: produk dengan nama "B"
               },
            ]
         },
         orderBy: [
            {
               name: "asc" // Mengurutkan hasil berdasarkan nama produk secara ascending (A-Z)
            }
         ]
      });

      // Menampilkan hasil query dalam konsol
      console.log(products);

      // Memeriksa apakah jumlah produk yang ditemukan adalah 4
      expect(products.length).toBe(4);

      // Memeriksa apakah produk pertama dalam hasil adalah dengan nama "A"
      expect(products[0].name).toBe("A");

      // Memeriksa apakah produk kedua dalam hasil adalah dengan nama "A"
      expect(products[1].name).toBe("A");

      // Memeriksa apakah produk ketiga dalam hasil adalah dengan nama "B"
      expect(products[2].name).toBe("B");

      // Memeriksa apakah produk keempat dalam hasil adalah dengan nama "B"
      expect(products[3].name).toBe("B");
   });

});