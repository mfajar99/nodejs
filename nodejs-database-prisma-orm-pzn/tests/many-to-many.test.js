import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {

   it('should can insert many to many relation', async () => {
      // Menggunakan Prisma Client untuk membuat entri relasi banyak-ke-banyak antara pelanggan dan produk
      const like = await prismaClient.like.create({
         data: {
            customer_id: "aldi", // ID pelanggan yang memberikan "like"
            product_id: "P0001" // ID produk yang di-"like"
         },
         include: {
            customer: true, // Sertakan data pelanggan yang berelasi dalam hasil
            product: true // Sertakan data produk yang berelasi dalam hasil
         }
      });

      // Menampilkan informasi "like" dan relasi pelanggan-produk dalam konsol
      console.log(like);
   });

   it('should can find one with many to many relation', async () => {
      // Menggunakan Prisma Client untuk menemukan pelanggan dengan ID tertentu, termasuk produk yang di-"like"
      const customer = await prismaClient.customer.findUnique({
         where: {
            id: "aldi" // Mencari pelanggan berdasarkan ID
         },
         include: {
            likes: { // Sertakan data "like" yang berelasi
               include: {
                  product: true // Sertakan data produk yang di-"like" dalam hasil
               }
            }
         }
      });

      // Menampilkan informasi pelanggan dan produk yang di-"like" dalam konsol
      console.log(JSON.stringify(customer));
   });

   it('should can find many with many to many relation', async () => {
      // Menggunakan Prisma Client untuk menemukan pelanggan yang "like" produk tertentu dengan nama yang mengandung huruf "A"
      const customers = await prismaClient.customer.findMany({
         where: {
            likes: {
               some: { // Kondisi: pelanggan harus memiliki "like" pada produk yang namanya mengandung "A"
                  product: {
                     name: {
                        contains: "A"
                     }
                  }
               }
            }
         },
         include: {
            likes: { // Sertakan data "like" yang berelasi
               include: {
                  product: true // Sertakan data produk yang di-"like" dalam hasil
               }
            }
         }
      });

      // Menampilkan informasi pelanggan yang sesuai dan produk yang di-"like" dalam konsol
      console.log(JSON.stringify(customers));
   });

   it('should create implicit relation', async () => {
      // Menggunakan Prisma Client untuk memperbarui pelanggan dengan menambahkan relasi "love" pada dua produk
      const customer = await prismaClient.customer.update({
         where: {
            id: "jaka" // Mencari pelanggan berdasarkan ID
         },
         data: {
            loves: {
               connect: [ // Menyambungkan (connect) pelanggan dengan produk yang di-"love"
                  {
                     id: "P0001" // ID produk pertama
                  },
                  {
                     id: "P0002" // ID produk kedua
                  }
               ]
            }
         },
         include: {
            loves: true // Sertakan data produk yang di-"love" dalam hasil
         }
      });

      // Menampilkan informasi pelanggan dan produk yang di-"love" dalam konsol
      console.info(customer);
   });

   it('should find many implicit relation', async () => {
      // Menggunakan Prisma Client untuk menemukan pelanggan yang "love" produk dengan nama yang mengandung huruf "A"
      const customers = await prismaClient.customer.findMany({
         where: {
            loves: {
               some: { // Kondisi: pelanggan harus memiliki "love" pada produk yang namanya mengandung "A"
                  name: {
                     contains: "A"
                  }
               }
            }
         },
         include: {
            loves: true // Sertakan data produk yang di-"love" dalam hasil
         }
      });

      // Menampilkan informasi pelanggan yang sesuai dan produk yang di-"love" dalam konsol
      console.log(customers);
   });

});