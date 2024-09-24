import { prismaClient } from "../src/prisma-client.js";
// Deskripsi grup tes untuk Prisma Client
describe("Prisma Client", () => {
   it('should be able to execute sql', async () => {
      // Mendefinisikan ID dan nama yang akan dimasukkan ke dalam tabel
      const id = "1"; // ID untuk entri baru
      const name = "Fajar Muhammad"; // Nama untuk entri baru

      // Menggunakan Prisma Client untuk mengeksekusi perintah SQL mentah (raw SQL) yang akan memasukkan data ke dalam tabel 'sample'
      const impacted = await prismaClient.$executeRaw`INSERT INTO sample(id, name) VALUES (${id}, ${name});`;

      // Memeriksa apakah satu baris data berhasil dimasukkan (sehingga nilai impacted harus 1)
      expect(impacted).toBe(1);
   });
});

