import { prismaClient } from "../src/prisma-client.js";

// Menggunakan Jest untuk mengelompokkan dan mengatur pengujian.
describe("Prisma Client", () => {

   // Mengatur dan menjalankan tes untuk memastikan bahwa pembuatan entitas bekerja dengan benar.
   it('should be able to create with auto increment primary key', async () => {

      // Menggunakan Prisma Client untuk membuat entitas kategori baru dengan nama "Food".
      const category = await prismaClient.category.create({
         data: {
            name: "Food"
         }
      });

      // Menampilkan hasil entitas yang dibuat ke konsol.
      console.info(category);

      // Memeriksa apakah entitas yang dibuat memiliki properti "id".
      // "id" adalah primary key yang harus dihasilkan secara otomatis oleh database.
      expect(category).toHaveProperty("id");
   });
});

