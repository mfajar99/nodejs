// Mengimpor 'threadId' dan 'Worker' dari modul 'worker_threads' bawaan Node.js.
// Modul ini digunakan untuk menjalankan skrip di thread yang berbeda (parallel processing) untuk meningkatkan kinerja aplikasi.
import { threadId, Worker } from "worker_threads";

// Membuat dua worker baru dari file 'worker.mjs'.
// Worker adalah thread terpisah yang dapat menjalankan tugas secara paralel tanpa mengganggu thread utama.
const worker1 = new Worker("./worker.mjs");
const worker2 = new Worker("./worker.mjs");

// Menambahkan listener untuk worker1 yang mendengarkan pesan dari worker 1.
// Ketika worker 1 mengirim pesan ke thread utama, pesan tersebut akan dicetak ke konsol.
worker1.addListener("message", (message) => {
   console.log(`Thread-${threadId} receive from worker 1 : ${message}`);
});

// Menambahkan listener untuk worker2 yang mendengarkan pesan dari worker 2.
worker2.addListener("message", (message) => {
   console.log(`Thread-${threadId} receive from worker 2 : ${message}`);
});

// Mengirimkan pesan ke worker1 dan worker2.
// Dalam kasus ini, pesan yang dikirim adalah angka 10.
worker1.postMessage(10);
worker2.postMessage(10);
