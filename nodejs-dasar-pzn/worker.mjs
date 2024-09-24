// Mengimpor 'threadId' dan 'parentPort' dari modul 'worker_threads' bawaan Node.js.
// 'threadId' memberikan ID unik untuk thread ini, dan 'parentPort' adalah saluran komunikasi dengan thread utama.
import { threadId, parentPort } from "worker_threads";

// Menambahkan listener untuk menangani pesan yang diterima dari thread utama.
// 'message' adalah parameter yang berisi data yang dikirim dari thread utama.
parentPort.addListener("message", (message) => {
   // Mengulangi sebanyak 'message' yang diterima.
   for (let i = 0; i < message; i++) {
      // Menampilkan pesan ke konsol yang menunjukkan thread ID dan nomor iterasi saat ini.
      console.log(`Thread-${threadId} send message ${i}`);
      // Mengirim pesan kembali ke thread utama dengan nilai iterasi saat ini.
      parentPort.postMessage(i);
   }
   // Menutup saluran komunikasi dengan thread utama setelah selesai mengirim pesan.
   parentPort.close();
});
