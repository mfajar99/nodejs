import winston from "winston";

// Test untuk logging dengan format gabungan
test('logging with combine format', () => {

   // Membuat instance logger dengan konfigurasi format gabungan
   const logger = winston.createLogger({
      level: "info",  // Menetapkan level log minimum yang akan dicatat
      format: winston.format.combine(
         winston.format.timestamp(),  // Menambahkan timestamp ke log
         winston.format.ms(),         // Menambahkan waktu yang berlalu sejak timestamp
         winston.format.json()        // Menyimpan log dalam format JSON
      ),
      transports: [
         new winston.transports.Console({})  // Transportasi untuk mencetak log ke konsol
      ]
   });

   // Menghasilkan log dengan level info
   logger.info("Hello Format");
   // Menghasilkan log dengan level warn
   logger.warn("Hello Format");
   // Menghasilkan log dengan level error
   logger.error("Hello Format");
});
