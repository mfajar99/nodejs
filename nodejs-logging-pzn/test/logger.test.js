import winston from "winston";

// Test untuk membuat logger baru tanpa transport
test('create new logger', () => {

   // Membuat logger baru tanpa konfigurasi transport
   const logger = winston.createLogger({});

   // Menggunakan logger untuk mencatat informasi dengan level "info"
   logger.log({
      level: "info", // Level log yang ingin dicatat
      message: "Hello Logging" // Pesan log
   });

});
