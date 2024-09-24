// Mengimpor library logging Winston. 
// Winston adalah library logging populer untuk Node.js yang menyediakan kemampuan logging yang fleksibel dan kuat.
import winston from "winston";

// Membuat logger menggunakan fungsi winston.createLogger.
// Logger ini akan menangani pencatatan pesan pada berbagai level (info, error, dll.).
export const logger = winston.createLogger({

   // Mengatur level logging ke "info". 
   // Ini berarti bahwa setiap pesan log pada level ini atau lebih tinggi (error, warn) akan dicatat.
   level: "info",

   // Mendefinisikan format output log.
   // Dalam hal ini, kita menggunakan format JSON untuk menyusun pesan log sebagai objek JSON.
   format: winston.format.json(),

   // Menentukan "transports" (media pengiriman) di mana log akan dikirim.
   // Dalam contoh ini, log akan ditampilkan di konsol (terminal tempat aplikasi Node.js berjalan).
   transports: [

      // Menggunakan transport Console untuk mencetak log ke konsol.
      // Anda dapat menambahkan media pengiriman lain seperti file, endpoint HTTP, dll., untuk logging di berbagai lingkungan.
      new winston.transports.Console({})
   ]
});
