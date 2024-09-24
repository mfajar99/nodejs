import cluster from "cluster";
import os from "os";
import process from "process";
import http from "http";

// Mengecek apakah proses ini adalah proses utama (primary)
if (cluster.isPrimary) {
   // Menampilkan ID proses utama
   console.log(`primary : ${process.pid}`);

   // Membuat worker untuk setiap inti CPU yang tersedia
   for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
   }

   // Menambahkan listener untuk event 'exit'
   cluster.addListener("exit", (worker) => {
      console.log(`Worker-${worker.id} is exit`);

      // Fork worker baru jika salah satu worker keluar
      cluster.fork();
   });
}

// Mengecek apakah proses ini adalah worker
if (cluster.isWorker) {
   // Menampilkan ID proses worker
   console.log(`worker : ${process.pid}`);

   // Membuat server HTTP
   const server = http.createServer((request, response) => {
      // Menulis response dari ID proses
      response.write(`Response from process ${process.pid}`);
      response.end();

      // Menghentikan proses worker setelah mengirimkan response
      process.exit();
   });

   // Menentukan port untuk server HTTP
   server.listen(3000);
}
