// Mengimpor modul 'process' dari Node.js untuk mengakses informasi tentang proses Node.js saat ini
import process from "process";

// Mengkonfigurasi laporan proses
// Mengaktifkan laporan saat terjadi kesalahan fatal
process.report.reportOnFatalError = true;
// Mengaktifkan laporan saat menerima sinyal yang mematikan
process.report.reportOnSignal = true;
// Mengaktifkan laporan saat terjadi pengecualian yang tidak tertangani
process.report.reportOnUncaughtException = true;
// Menetapkan nama file untuk menyimpan laporan
process.report.filename = "report.json";

// Fungsi yang menyebabkan kesalahan
function sampleError() {
   throw new Error("Ups");
}

// Memanggil fungsi yang menyebabkan kesalahan
sampleError();
