import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
   it('should can create and select fields', async () => {
      // Menggunakan Prisma Client untuk membuat entri pelanggan baru dengan hanya memilih beberapa field yang diinginkan
      const customer = await prismaClient.customer.create({
         data: {
            id: "rully", // ID untuk pelanggan baru
            email: "rully@pzn.com", // Email untuk pelanggan baru
            phone: "345325353451434", // Nomor telepon untuk pelanggan baru
            name: "Rully Nugraha" // Nama untuk pelanggan baru
         },
         select: {
            id: true, // Pilih field 'id'
            name: true // Pilih field 'name'
         }
      });

      // Memeriksa apakah ID pelanggan yang dibuat adalah "rully"
      expect(customer.id).toBe("rully");

      // Memeriksa apakah nama pelanggan yang dibuat adalah "Rully Nugraha"
      expect(customer.name).toBe("Rully Nugraha");

      // Memeriksa bahwa field 'email' tidak termasuk dalam hasil (seharusnya undefined)
      expect(customer.email).toBeUndefined();

      // Memeriksa bahwa field 'phone' tidak termasuk dalam hasil (seharusnya undefined)
      expect(customer.phone).toBeUndefined();
   });


   it('should can select fields', async () => {
      // Mengambil semua entri dari tabel customer, tetapi hanya field `id` dan `name`
      const customers = await prismaClient.customer.findMany({
         select: {
            id: true,   // Ambil hanya field `id`
            name: true  // Ambil hanya field `name`
         }
      });

      // Loop melalui setiap customer yang diambil dari database
      for (let customer of customers) {
         // Memastikan bahwa ID customer diambil dan tidak undefined
         expect(customer.id).toBeDefined();  // `id` seharusnya ada karena kita memilihnya dengan `select`

         // Memastikan bahwa nama customer diambil dan tidak undefined
         expect(customer.name).toBeDefined();  // `name` seharusnya ada karena kita memilihnya dengan `select`

         // Memastikan bahwa email customer tidak diambil, maka undefined
         expect(customer.email).toBeUndefined(); // `email` seharusnya undefined karena kita tidak memilihnya dengan `select`

         // Memastikan bahwa nomor telepon customer tidak diambil, maka undefined
         expect(customer.phone).toBeUndefined(); // `phone` seharusnya undefined karena kita tidak memilihnya dengan `select`
      }
   });

});