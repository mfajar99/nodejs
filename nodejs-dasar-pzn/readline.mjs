// Mengimpor modul 'readline' dari Node.js untuk membaca input dari pengguna
import readline from "readline";
// Mengimpor modul 'process' untuk mengakses input dan output standar
import process from "process";

// Membuat interface readline untuk berinteraksi dengan pengguna
const input = readline.createInterface({
   input: process.stdin, // Menghubungkan input ke standar input (keyboard)
   output: process.stdout // Menghubungkan output ke standar output (layar)
});

// Mengajukan pertanyaan kepada pengguna dan menangani jawaban mereka
input.question("Siapa nama Anda? ", (name) => {
   // Mencetak pesan yang menyapa pengguna dengan nama yang diberikan
   console.info(`Halo ${name}`);
   // Menutup interface readline setelah mendapatkan jawaban
   input.close();
});
