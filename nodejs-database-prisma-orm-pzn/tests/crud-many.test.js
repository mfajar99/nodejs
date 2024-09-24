import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {

   it('should can create many records', async () => {
      // Menggunakan Prisma Client untuk membuat beberapa pelanggan sekaligus
      const { count } = await prismaClient.customer.createMany({
         data: [
            {
               id: "joko", // ID unik untuk pelanggan pertama
               email: "joko@pzn.com", // Email untuk pelanggan pertama
               phone: "34534534534545", // Nomor telepon pelanggan pertama
               name: "Joko" // Nama pelanggan pertama
            },
            {
               id: "budi", // ID unik untuk pelanggan kedua
               email: "budi@pzn.com", // Email untuk pelanggan kedua
               phone: "34534545", // Nomor telepon pelanggan kedua
               name: "Budi" // Nama pelanggan kedua
            }
         ]
      });

      // Memeriksa apakah dua pelanggan berhasil dibuat
      expect(count).toBe(2);
   });


   it('should can update many records', async () => {
      // Memperbarui data pelanggan dengan nama "Budi"
      const { count } = await prismaClient.customer.updateMany({
         data: {
            email: "andilagi@gmail.com"  // Email baru untuk entri yang diperbarui
         },
         where: {
            name: "Andi"  // Memilih entri dengan nama "Budi"
         }
      });

      // Memastikan bahwa 1 entri telah diperbarui
      expect(count).toBe(1);  // Harapan: jumlah entri yang diperbarui adalah 1
   });

   it('should can delete many records', async () => {
      // Menghapus semua entri customer yang memiliki nama "Tidak ada"
      const { count } = await prismaClient.customer.deleteMany({
         where: {
            name: "Tidak ada" // Kondisi untuk memilih entri yang akan dihapus
         }
      });

      // Memastikan bahwa tidak ada entri yang dihapus
      expect(count).toBe(0); // Jumlah entri yang dihapus seharusnya 0 karena tidak ada entri dengan nama "Tidak ada"
   });

   it('should can read many record', async () => {
      // Mengambil semua entri dari tabel customer
      const customers = await prismaClient.customer.findMany({});

      // Menampilkan hasil entri customer yang diambil ke console
      console.log(customers);

      // Memastikan bahwa jumlah entri yang diambil adalah 6
      expect(customers.length).toBe(7); // Menguji apakah ada tepat 6 entri di tabel customer
   });

});
