import winston from "winston";

// Test untuk logging dengan berbagai level
test('logging with level', () => {

   // Membuat logger dengan level minimum "silly"
   const logger = winston.createLogger({
      level: "silly", // Level minimum yang akan dicatat
      transports: [
         new winston.transports.Console({}) // Menampilkan log di console
      ]
   });

   // Mencatat pesan dengan berbagai level log
   logger.log({ level: "error", message: "Hello Error" });   // Level "error"
   logger.log({ level: "warn", message: "Hello Warn" });    // Level "warn"
   logger.log({ level: "info", message: "Hello Info" });    // Level "info"
   logger.log({ level: "http", message: "Hello HTTP" });    // Level "http"
   logger.log({ level: "verbose", message: "Hello Verbose" });// Level "verbose"
   logger.log({ level: "debug", message: "Hello Debug" });  // Level "debug"
   logger.log({ level: "silly", message: "Hello Silly" });   // Level "silly"

});

// Test untuk logging dengan metode shortcut
test('logging with shortcut level', () => {

   // Membuat logger dengan level minimum "silly"
   const logger = winston.createLogger({
      level: "silly", // Level minimum yang akan dicatat
      transports: [
         new winston.transports.Console({}) // Menampilkan log di console
      ]
   });

   // Mencatat pesan dengan berbagai level log menggunakan metode shortcut
   logger.error("Hello Error");  // Menggunakan metode shortcut untuk level "error"
   logger.warn("Hello Warn");    // Menggunakan metode shortcut untuk level "warn"
   logger.info("Hello Info");    // Menggunakan metode shortcut untuk level "info"
   logger.http("Hello HTTP");    // Menggunakan metode shortcut untuk level "http"
   logger.verbose("Hello Verbose"); // Menggunakan metode shortcut untuk level "verbose"
   logger.debug("Hello Debug");  // Menggunakan metode shortcut untuk level "debug"
   logger.silly("Hello Silly");   // Menggunakan metode shortcut untuk level "silly"

});
