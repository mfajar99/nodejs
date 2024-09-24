import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Test untuk logging dengan file rotasi harian
test('logging with daily rotate file', () => {

   // Membuat logger dengan level minimum "info"
   const logger = winston.createLogger({
      level: "info", // Level minimum yang akan dicatat
      transports: [
         new winston.transports.Console({}), // Menampilkan log di console
         // Konfigurasi transport untuk file dengan rotasi harian
         // new DailyRotateFile({
         //    filename: "app-%DATE%.log", // Nama file dengan pola tanggal
         //    datePattern: 'YYYY-MM-DD', // Format tanggal
         //    zippedArchive: true, // Mengompres file log lama
         //    maxSize: "1m", // Ukuran maksimum file log sebelum rotasi
         //    maxFiles: "14d" // Menyimpan file log hingga 14 hari
         // })
      ]
   });

   // Mencatat pesan sebanyak 100.000 kali untuk menguji rotasi file
   for (let i = 0; i < 100000; i++) {
      logger.info(`Hello World ${i}`);
   }

});
