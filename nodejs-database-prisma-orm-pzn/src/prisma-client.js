import { PrismaClient } from "@prisma/client";

// Membuat instance baru dari PrismaClient
export const prismaClient = new PrismaClient({
   // Mengatur format pesan error agar lebih mudah dibaca
   errorFormat: "pretty",

   // Mengaktifkan log untuk berbagai jenis operasi yang dilakukan oleh Prisma Client
   log: [
      "query", // Mencatat query yang dijalankan oleh Prisma
      "info",  // Mencatat informasi umum yang berguna untuk debugging
      "error", // Mencatat pesan kesalahan yang terjadi selama operasi Prisma
      "warn"   // Mencatat peringatan yang dapat diabaikan namun perlu diperhatikan
   ]
});
