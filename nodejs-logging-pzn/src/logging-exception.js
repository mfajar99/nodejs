import winston from "winston";

// Membuat instance logger menggunakan Winston
const logger = winston.createLogger({
   level: "info",  // Menetapkan level log minimal yang akan dicatat; dalam hal ini, "info"
   transports: [
      // Transport untuk mencetak log ke konsol
      new winston.transports.Console({}),
      // Transport untuk mencatat log ke file
      new winston.transports.File({
         handleExceptions: true,  // Menangani pengecualian yang tidak tertangani dan mencatatnya
         filename: "src/exception.log"  // Lokasi file log untuk mencatat pengecualian
      }),
   ]
});

// Fungsi untuk demonstrasi atau uji coba; mungkin perlu mendefinisikan atau menghapusnya
hello();
