import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {

   it('should be able to create customer', async () => {
      // Menggunakan Prisma Client untuk membuat satu entri pelanggan baru
      const customer = await prismaClient.customer.create({
         data: {
            id: "amir", // ID unik untuk pelanggan baru
            email: "fajar@gmail.com", // Email untuk pelanggan baru
            name: "Fajar Amir", // Nama pelanggan baru
            phone: "0821241243124" // Nomor telepon pelanggan baru
         }
      });

      // Memeriksa apakah ID pelanggan yang dibuat adalah "amir"
      expect(customer.id).toBe("amir");

      // Memeriksa apakah email pelanggan yang dibuat adalah "amir@gmail.com"
      expect(customer.email).toBe("amir@gmail.com");

      // Memeriksa apakah nama pelanggan yang dibuat adalah "Fajar Amir"
      expect(customer.name).toBe("Fajar Amir");

      // Memeriksa apakah nomor telepon pelanggan yang dibuat adalah "0821241243124"
      expect(customer.phone).toBe("0821241243124");
   });


   // Deskripsi tes untuk memastikan bahwa kita bisa mengupdate data customer
   it('should be able to update customer', async () => {

      // Mengupdate nama customer dengan ID "fajar" menjadi "Muhammad Fajar Amir"
      const customer = await prismaClient.customer.update({
         data: {
            name: "Muhammad Fajar Amir" // Data baru yang akan diupdate, yaitu nama customer
         },
         where: {
            id: "fajar" // Kondisi yang digunakan untuk menemukan customer yang akan diupdate
         }
      });

      //    // Memastikan bahwa ID dari customer yang diupdate sesuai dengan yang diharapkan
      expect(customer.id).toBe("fajar");

      // Memastikan bahwa nama dari customer telah berhasil diupdate
      expect(customer.name).toBe("Muhammad Fajar Amir");

      // Memastikan bahwa email dari customer masih sesuai dengan nilai yang diharapkan
      expect(customer.email).toBe("fajar@gmail.com");

      // Memastikan bahwa nomor telepon dari customer masih sesuai dengan nilai yang diharapkan
      expect(customer.phone).toBe("0821241243124");
   });


   // Deskripsi tes untuk memastikan bahwa kita bisa membaca data customer
   it('should be able to read customer', async () => {

      // Menggunakan metode `findUnique` dari Prisma Client untuk mencari customer berdasarkan ID
      const customer = await prismaClient.customer.findUnique({
         where: {
            id: "fajar" // Kondisi yang digunakan untuk menemukan customer, yaitu ID "fajar"
         }
      });

      // Memastikan bahwa ID dari customer yang ditemukan sesuai dengan yang diharapkan
      expect(customer.id).toBe("fajar");

      // Memastikan bahwa nama dari customer sesuai dengan nilai yang diharapkan
      expect(customer.name).toBe("Muhammad Fajar Amir");

      // Memastikan bahwa email dari customer sesuai dengan nilai yang diharapkan
      expect(customer.email).toBe("fajar@gmail.com");

      // Memastikan bahwa nomor telepon dari customer sesuai dengan nilai yang diharapkan
      expect(customer.phone).toBe("0821241243124");
   });


   // Deskripsi tes untuk memastikan bahwa kita bisa menghapus data customer
   it('should be able to delete customer', async () => {

      // Menggunakan metode `delete` dari Prisma Client untuk menghapus customer berdasarkan ID
      const customer = await prismaClient.customer.delete({
         where: {
            id: "fajar" // Kondisi yang digunakan untuk menemukan dan menghapus customer, yaitu ID "fajar"
         }
      });

      // Memastikan bahwa ID dari customer yang dihapus sesuai dengan yang diharapkan
      expect(customer.id).toBe("fajar");

      // Memastikan bahwa nama dari customer yang dihapus sesuai dengan nilai yang diharapkan
      expect(customer.name).toBe("Muhammad Fajar Amir");

      // Memastikan bahwa email dari customer yang dihapus sesuai dengan nilai yang diharapkan
      expect(customer.email).toBe("fajar@gmail.com");

      // Memastikan bahwa nomor telepon dari customer yang dihapus sesuai dengan nilai yang diharapkan
      expect(customer.phone).toBe("0821241243124");
   });

});

