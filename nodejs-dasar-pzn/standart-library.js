// Mengimpor modul 'os' bawaan Node.js.
// Modul ini menyediakan informasi tentang sistem operasi yang sedang digunakan.
import os from "os";

// Menggunakan fungsi 'os.platform()' untuk mendapatkan informasi tentang platform sistem operasi
// yang sedang dijalankan, misalnya 'linux', 'darwin' (Mac), atau 'win32' (Windows).
console.info(os.platform());

// Menggunakan fungsi 'os.cpus()' untuk mendapatkan informasi detail tentang setiap CPU (core)
// yang dimiliki oleh sistem. Informasi ini mencakup kecepatan clock CPU dan modelnya.
// 'console.table()' menampilkan informasi ini dalam format tabel yang mudah dibaca.
console.table(os.cpus());
