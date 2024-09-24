import winston from "winston";

// Fungsi asinkron yang mengembalikan Promise yang ditolak
async function callAsync() {
   return Promise.reject("Ups");
}

// Membuat instance logger menggunakan Winston
const logger = winston.createLogger({
   level: "info",  // Menetapkan level log minimum yang akan dicatat; dalam hal ini, "info"
   transports: [
      // Transport untuk mencetak log ke konsol
      new winston.transports.Console({}),
      // Transport untuk mencatat log ke file
      new winston.transports.File({
         handleExceptions: true,  // Menangani pengecualian yang tidak tertangani dan mencatatnya
         handleRejections: true,  // Menangani penolakan Promise yang tidak tertangani dan mencatatnya
         filename: "src/exception.log"  // Lokasi file log untuk mencatat pengecualian
      }),
   ]
});

// Memanggil fungsi asinkron yang mengembalikan Promise yang ditolak
callAsync();
