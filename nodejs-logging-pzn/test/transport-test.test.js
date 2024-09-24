// Import library 'winston' untuk logging dan 'winston-transport' untuk membuat transport custom.
import winston from "winston";
import TransportStream from "winston-transport";

// Test untuk membuat logger baru dengan transport console custom.
test('create new logger with console transport', () => {

   // Membuat class MyTransport yang extends TransportStream dari winston.
   class MyTransport extends TransportStream {

      constructor(option) {
         // Memanggil constructor dari class parent (TransportStream).
         super(option);
      }

      // Implementasi metode log yang akan dipanggil saat logging.
      log(info, next) {
         // Menampilkan log ke console dengan format waktu, level, dan pesan.
         console.log(`${new Date()} : ${info.level.toUpperCase()} : ${info.message}`);
         // Melanjutkan proses log berikutnya.
         next();
      }

   }

   // Membuat instance logger dengan level logging "silly" dan menggunakan MyTransport sebagai transportnya.
   const logger = winston.createLogger({
      level: "silly", // Level logging terendah yang akan ditangani logger.
      transports: [
         new MyTransport({}) // Menggunakan MyTransport sebagai transport untuk logger.
      ]
   });

   // Menggunakan logger untuk mencetak pesan log dengan berbagai level.
   logger.error("Hello Error");   // Log dengan level error.
   logger.warn("Hello Warn");     // Log dengan level warning.
   logger.info("Hello Info");     // Log dengan level info.
   logger.http("Hello HTTP");     // Log dengan level HTTP.
   logger.verbose("Hello Verbose");// Log dengan level verbose.
   logger.debug("Hello Debug");   // Log dengan level debug.
   logger.silly("Hello Silly");   // Log dengan level silly.

});
