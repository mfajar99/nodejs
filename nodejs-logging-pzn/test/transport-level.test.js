import winston from "winston";

// Test untuk membuat logger dengan transport console dan file
test('create new logger with console & file transport', () => {

   // Membuat logger dengan level minimum "info"
   const logger = winston.createLogger({
      level: "info", // Level minimum yang akan dicatat
      transports: [
         // Transport untuk menampilkan log di console (dikomentari)
         // new winston.transports.Console({}),

         // Transport untuk mencatat log ke file "application.log" (dikomentari)
         // new winston.transports.File({
         //    filename: "application.log"
         // }),

         // Transport untuk mencatat log dengan level "error" ke file "application-error.log" (dikomentari)
         // new winston.transports.File({
         //    level: "error",
         //    filename: "application-error.log"
         // }),
      ]
   });

   // Mencatat beberapa pesan log
   logger.info("Hello World");
   logger.info("Hello World");
   logger.info("Hello World");
   logger.info("Hello World");
   logger.error("Hello Error");
   logger.error("Hello Error");
   logger.error("Hello Error");

});
