// Mengimpor PrismaClient dari package '@prisma/client' untuk berinteraksi dengan database.
import { PrismaClient } from "@prisma/client";
// Mengimpor logger dari file 'logging.js' untuk mencatat log.
import { logger } from "./logging.js";

// Membuat instance PrismaClient dengan konfigurasi log.
export const prismaClient = new PrismaClient({
   log: [
      {
         emit: 'event', // Mengirimkan log sebagai event.
         level: 'query', // Menangani log level 'query'.
      },
      {
         emit: 'event',
         level: 'error', // Menangani log level 'error'.
      },
      {
         emit: 'event',
         level: 'info', // Menangani log level 'info'.
      },
      {
         emit: 'event',
         level: 'warn', // Menangani log level 'warn'.
      },
   ],
});

// Menambahkan event listener untuk log level 'error' dari PrismaClient.
prismaClient.$on('error', (e) => {
   // Menggunakan logger untuk mencatat error.
   logger.error(e);
});

// Menambahkan event listener untuk log level 'warn' dari PrismaClient.
prismaClient.$on('warn', (e) => {
   // Menggunakan logger untuk mencatat warning.
   logger.warn(e);
});

// Menambahkan event listener untuk log level 'info' dari PrismaClient.
prismaClient.$on('info', (e) => {
   // Menggunakan logger untuk mencatat info.
   logger.info(e);
});

// Menambahkan event listener untuk log level 'query' dari PrismaClient.
prismaClient.$on('query', (e) => {
   // Menggunakan logger untuk mencatat query.
   logger.info(e);
});
