// Mengimpor modul 'timers/promises' bawaan Node.js.
// Modul ini menyediakan fungsi pengatur waktu (timers) yang berbasis promises, seperti 'setTimeout' dan 'setInterval'.
import timers from "timers/promises";

// Menampilkan tanggal dan waktu saat ini di konsol (dalam komentar, namun bisa digunakan untuk pengecekan waktu mulai).
// console.log(new Date());

// Menggunakan 'setTimeout' untuk menunggu selama 5000 milidetik (5 detik).
// Setelah 5 detik, ia akan mengembalikan string "Fajar".
// Ini menggunakan fitur async/await untuk menunggu hasilnya secara asinkron.
// const name = await timers.setTimeout(5000, "Fajar");

// Menampilkan tanggal dan waktu setelah 5 detik.
// console.log(new Date());

// Menampilkan nama yang didapat dari 'setTimeout', dalam hal ini akan menampilkan "Fajar".
// console.log(name);

// Menggunakan 'setInterval' untuk menjalankan blok kode berulang setiap 1000 milidetik (1 detik).
// 'setInterval' di sini adalah versi yang menggunakan promises dan async iteration.
// Iterasi ini akan terus berjalan setiap 1 detik, dan 'startTime' mewakili waktu interval dimulai (meskipun kita tidak menggunakannya dalam contoh ini).
for await (const startTime of timers.setInterval(1000, "ignored")) {
   // Menampilkan waktu saat iterasi interval dimulai ke konsol.
   // Ini akan menampilkan pesan "Start time at <current date and time>" setiap 1 detik.
   console.log(`Start time at ${new Date()}`);
}


