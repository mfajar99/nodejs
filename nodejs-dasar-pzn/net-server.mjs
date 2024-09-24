// Mengimpor modul 'net' dari Node.js untuk membuat koneksi TCP
import net from "net";

// Membuat server TCP
const server = net.createServer((client) => {
   // Menangani koneksi baru dari client
   console.log("Client Connected");

   // Menambahkan listener untuk menangani data yang diterima dari client
   client.addListener("data", (data) => {
      // Mencetak data yang diterima dari client setelah mengonversinya menjadi string
      console.info(`Receive data ${data.toString()}`);

      // Mengirimkan respons kembali ke client dengan menyapa data yang diterima
      client.write(`Hello ${data.toString()}\r\n`);
   });
});

// Menjalankan server pada port 3000 dan host 'localhost'
server.listen(3000, "localhost", () => {
   console.log("Server is listening on port 3000");
});
