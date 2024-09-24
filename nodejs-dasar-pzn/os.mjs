// Mengimpor modul 'os' dari Node.js untuk mendapatkan informasi tentang sistem operasi
import os from "os";

// Mencetak platform sistem operasi (misalnya, 'linux', 'darwin' untuk macOS, 'win32' untuk Windows)
console.info(os.platform());

// Mencetak arsitektur sistem operasi (misalnya, 'x64' untuk 64-bit, 'arm' untuk ARM)
console.info(os.arch());

// Mencetak informasi tentang CPU sistem dalam format tabel
console.table(os.cpus());

// Mencetak waktu aktif sistem (uptime) dalam detik
console.info(os.uptime());

// Mencetak total memori sistem (dalam byte)
console.info(os.totalmem());

// Mencetak memori yang tersedia (free memory) dalam byte
console.info(os.freemem());

// Mencetak informasi tentang antarmuka jaringan sistem dalam format tabel
console.table(os.networkInterfaces());

// Mencetak direktori home pengguna saat ini
console.table(os.homedir());
