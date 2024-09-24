// Mengimpor modul 'http' dari Node.js untuk membuat server HTTP
import http from "http";

// Membuat server HTTP
const server = http.createServer((request, response) => {
   // Mencetak metode HTTP dari permintaan ke konsol
   console.log(request.method);

   // Mencetak URL dari permintaan ke konsol
   console.log(request.url);

   // Memeriksa jika metode permintaan adalah POST
   if (request.method === "POST") {
      let body = '';

      // Menangani data yang diterima dalam potongan (chunks)
      request.on("data", (chunk) => {
         body += chunk.toString(); // Mengonversi buffer menjadi string dan menggabungkannya
      });

      // Menangani akhir dari data yang diterima
      request.on("end", () => {
         // Menetapkan header Content-Type untuk respons menjadi JSON
         response.setHeader("Content-Type", "application/json");

         // Menulis body yang diterima dalam respons
         response.write(body);

         // Mengakhiri respons
         response.end();
      });
   } else {
      // Jika metode bukan POST, periksa URL permintaan
      if (request.url === "/fajar") {
         response.write("Hello Fajar");
      } else {
         response.write("Hello HTTP Server");
      }

      // Mengakhiri respons
      response.end();
   }
});

// Menjalankan server pada port 3000 dan mencetak pesan ke konsol saat server mulai mendengarkan
server.listen(3000, () => {
   console.log('Server is listening on port 3000');
});
