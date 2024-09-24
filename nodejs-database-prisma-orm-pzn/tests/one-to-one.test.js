import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {

   it('should can create one to one relation', async () => {
      // Menggunakan Prisma Client untuk membuat entri dompet baru yang memiliki relasi satu-ke-satu dengan pelanggan
      const wallet = await prismaClient.wallet.create({
         data: {
            id: "cinta", // ID unik untuk dompet baru
            customer_id: "cinta", // ID pelanggan yang memiliki dompet ini
            balance: 100000 // Saldo awal dalam dompet
         },
         include: {
            customer: true // Sertakan data pelanggan yang berelasi dalam hasil
         }
      });

      // Menampilkan informasi dompet dan pelanggan yang terkait dalam konsol
      console.log(wallet);
   });

   it('should be able to create one to one with relation', async () => {
      // Menggunakan Prisma Client untuk membuat entri pelanggan baru dan dompetnya sekaligus
      const customer = await prismaClient.customer.create({
         data: {
            id: "joko", // ID unik untuk pelanggan baru
            name: "Joko", // Nama pelanggan baru
            phone: "08234323264", // Nomor telepon pelanggan baru
            email: "joko@gmail.com", // Email pelanggan baru
            wallet: {
               create: { // Membuat dompet baru yang berelasi dengan pelanggan ini
                  id: "joko", // ID unik untuk dompet
                  balance: 200000 // Saldo awal dalam dompet
               }
            }
         },
         include: {
            wallet: true // Sertakan data dompet yang berelasi dalam hasil
         }
      });

      // Menampilkan informasi pelanggan dan dompet yang terkait dalam konsol
      console.log(customer);
   });

   it('should be able to find one to one', async () => {
      // Menggunakan Prisma Client untuk mencari pelanggan dengan ID "joko" dan mengambil informasi dompet yang terkait
      const customer = await prismaClient.customer.findUnique({
         where: {
            id: "joko" // Mencari pelanggan berdasarkan ID
         },
         include: {
            wallet: true // Sertakan data dompet yang berelasi dalam hasil
         }
      });

      // Menampilkan informasi pelanggan dan dompet yang terkait dalam konsol
      console.info(customer);
   });

   it('should can find one to with relation filter', async () => {
      // Menggunakan Prisma Client untuk mencari pelanggan yang memiliki dompet (relasi tidak null)
      const customers = await prismaClient.customer.findMany({
         where: {
            wallet: {
               isNot: null // Kondisi: pelanggan harus memiliki dompet (wallet tidak null)
            }
         },
         include: {
            wallet: true // Sertakan data dompet yang berelasi dalam hasil
         }
      });

      // Menampilkan informasi semua pelanggan yang memiliki dompet dalam konsol
      console.log(customers);
   });


});