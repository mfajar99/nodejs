// Mengimpor modul 'process' dari Node.js untuk mengakses informasi tentang proses Node.js saat ini
import process from "process";

// Menambahkan listener untuk event 'exit', yang dipanggil ketika proses Node.js keluar
process.addListener("exit", (exitCode) => {
   // Mencetak pesan ke konsol saat proses keluar, bersama dengan kode keluar
   console.info(`nodeJS exit with code ${exitCode}`);
});

// Mencetak versi Node.js yang sedang digunakan
console.info(process.version);

// Mencetak array argumen baris perintah yang diberikan saat menjalankan script dalam format tabel
console.table(process.argv);

// Mencetak laporan internal proses dalam format tabel
console.table(process.report);

// Mencetak variabel lingkungan proses dalam format tabel
console.table(process.env);

// Menghentikan proses Node.js secara eksplisit dengan kode keluar 1
process.exit(1);
