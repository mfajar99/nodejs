// Menggunakan fungsi 'setInterval' bawaan JavaScript untuk menjalankan kode secara berulang pada interval waktu tertentu.
// Fungsi ini akan menjalankan kode di dalam callback setiap 1000 milidetik (1 detik).
setInterval(() => {
   // Menampilkan pesan ke konsol dengan waktu saat ini.
   // 'new Date()' menghasilkan waktu dan tanggal sekarang, dan 'console.info()' menampilkan pesan tersebut di konsol.
   console.info(`Start time at ${new Date()}`);
}, 1000); // Interval waktu diatur menjadi 1000 milidetik (1 detik).
