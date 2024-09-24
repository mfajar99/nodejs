import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
   // Menggunakan Jest untuk mengelompokkan dan mengatur pengujian.
   describe("Prisma Client", () => {

      // Menguji pembuatan entitas komentar dengan relasi ke entitas customer.
      it('should can insert and include', async () => {
         // Membuat entitas komentar dan menyertakan entitas customer terkait.
         const comment = await prismaClient.comment.create({
            data: {
               customer_id: "budi",   // ID customer yang terkait dengan komentar.
               title: "Insert Comment", // Judul komentar.
               description: "Description Comment" // Deskripsi komentar.
            },
            include: {
               customer: true // Menyertakan data customer terkait dalam hasil.
            }
         });

         // Menampilkan hasil komentar yang dibuat beserta data customer terkait ke konsol.
         console.log(comment);
      });

      // Menguji pembuatan entitas customer dengan beberapa komentar terkait.
      it('should can insert and many relation', async () => {
         // Membuat entitas customer dengan beberapa komentar yang terkait.
         const customer = await prismaClient.customer.create({
            data: {
               id: "hosari", // ID customer.
               name: "Hosari", // Nama customer.
               email: "hosari@gmal.com", // Email customer.
               phone: "0800378743", // Nomor telepon customer.
               comments: {
                  createMany: { // Membuat beberapa komentar sekaligus.
                     data: [
                        {
                           title: "Comment 1", // Judul komentar pertama.
                           description: "Description 1" // Deskripsi komentar pertama.
                        },
                        {
                           title: "Comment 2", // Judul komentar kedua.
                           description: "Description 2" // Deskripsi komentar kedua.
                        }
                     ]
                  }
               }
            },
            include: {
               comments: true // Menyertakan data komentar terkait dalam hasil.
            }
         });

         // Menampilkan hasil customer yang dibuat beserta komentar terkait ke konsol.
         console.log(customer);
      });

      // Menguji pencarian banyak customer dengan filter komentar terkait.
      it('should can find many with filter relation', async () => {
         // Mencari customer yang memiliki komentar dengan judul yang mengandung kata "Comment".
         const customers = await prismaClient.customer.findMany({
            where: {
               comments: {
                  some: { // Menyaring customer yang memiliki setidaknya satu komentar sesuai kriteria.
                     title: {
                        contains: "Comment" // Filter komentar yang memiliki kata "Comment" dalam judul.
                     }
                  }
               }
            },
            include: {
               comments: true // Menyertakan data komentar terkait dalam hasil.
            }
         });

         // Menampilkan hasil pencarian customer beserta komentar terkait ke konsol dalam format JSON.
         console.log(JSON.stringify(customers));
      });
   });

});