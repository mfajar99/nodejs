import winston from "winston";

// Test untuk logging dengan format printf
test('logging with printf format', () => {

   // Membuat logger dengan format printf
   const logger = winston.createLogger({
      level: "info", // Menentukan level log yang ingin ditampilkan
      format: winston.format.printf(log => {
         // Format log yang akan ditampilkan
         return `${new Date()} : ${log.level.toUpperCase()}: ${log.message}`;
      }),
      transports: [
         new winston.transports.Console({}) // Menampilkan log di console
      ]
   });

   // Menggunakan logger untuk mencatat informasi
   logger.info("Hello Format");
   logger.warn("Hello Format");
   logger.error("Hello Format");
});

// Test untuk logging dengan format simple
test('logging with format', () => {

   // Membuat logger dengan format simple
   const logger = winston.createLogger({
      level: "info", // Menentukan level log yang ingin ditampilkan
      format: winston.format.simple(), // Format log yang sederhana
      transports: [
         new winston.transports.Console({}) // Menampilkan log di console
      ]
   });

   // Menggunakan logger untuk mencatat informasi
   logger.info("Hello Format");
});
