// Mengimpor modul 'net' dari Node.js untuk membuat koneksi TCP
import net from "net";

// Membuat koneksi TCP ke server yang berjalan di localhost pada port 3000
const client = net.createConnection({
   port: 3000, // Port server yang dituju
   host: "localhost" // Host server yang dituju
});

// Menambahkan listener untuk menangani data yang diterima dari server
client.addListener("data", (data) => {
   // Mencetak data yang diterima dari server setelah mengonversinya menjadi string
   console.log(`Receive data from server : ${data.toString()}`);
});

// Mengirimkan data ke server setiap 2000 milidetik (2 detik)
// Data yang dikirimkan adalah argumen baris perintah pertama (process.argv[2])
setInterval(() => {
   client.write(`${process.argv[2]}\r\n`);
}, 2000);
