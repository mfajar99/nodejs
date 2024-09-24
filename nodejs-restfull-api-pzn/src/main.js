import { web } from "./application/web.js"; // Mengimpor objek 'web' yang mungkin merupakan instance dari server web (seperti Express)
import { logger } from "./application/logging.js"; // Mengimpor 'logger' untuk mencatat informasi log

// Menjalankan server web di port 3000
web.listen(3000, () => {
   // Ketika server berhasil dijalankan, mencatat pesan "App start" menggunakan logger
   logger.info("App start");
});
