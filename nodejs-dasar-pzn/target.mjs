// Mengimpor modul 'fs' (file system) bawaan Node.js.
// Modul ini menyediakan berbagai fungsi untuk bekerja dengan file di sistem operasi.
import fs from "fs";

// Membuat stream penulisan (write stream) ke file bernama 'target.log'.
// Stream ini akan menulis data ke file secara bertahap.
const writer = fs.createWriteStream("target.log");

// Menulis string "Fajar", "Muhammad", dan "Amir" ke dalam file 'target.log'.
// Setiap string diakhiri dengan karakter newline '\n' sehingga ditulis pada baris baru.
writer.write("Fajar\n");
writer.write("Muhammad\n");
writer.write("Amir\n");

// Mengakhiri proses penulisan ke file. Ini penting untuk menutup stream penulisan.
writer.end();

// Membuat stream pembacaan (read stream) dari file 'target.log'.
// Stream ini membaca file secara bertahap dan dapat memprosesnya saat data diterima.
const reader = fs.createReadStream("target.log");

// Menambahkan event listener untuk event 'data'.
// Event 'data' dipanggil setiap kali sebagian data dari file telah dibaca.
// 'data.toString()' mengubah buffer data yang dibaca menjadi string yang dapat dibaca.
reader.addListener("data", (data) => {
   console.info(data.toString()); // Menampilkan isi file ke konsol
});

