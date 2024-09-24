import winston from "winston";

// Test untuk membuat logger baru dengan transport console
test('create new logger with console transport', () => {

   // Membuat logger baru
   const logger = winston.createLogger({
      transports: [
         // Menambahkan transport untuk menampilkan log di console
         new winston.transports.Console({})
      ]
   });

   // Menggunakan logger untuk mencatat informasi dengan level "info"
   logger.log({
      level: "info", // Level log yang ingin dicatat
      message: "Hello Logging" // Pesan log
   });

});
