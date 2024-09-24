// Mengimpor modul 'https' dari Node.js untuk melakukan request HTTP HTTPS
import https from "https";

// Mendefinisikan endpoint URL untuk melakukan request POST
const endpoint = "https://eol2o1nwfc4c2wy.m.pipedream.net";

// Membuat request HTTPS dengan metode POST
const request = https.request(endpoint, {
   method: "POST", // Menetapkan metode HTTP menjadi POST
   headers: {
      "Content-Type": "application/json", // Menetapkan header Content-Type untuk mengindikasikan bahwa isi request adalah JSON
      "Accept": "application/json", // Menetapkan header Accept untuk menunjukkan bahwa kita mengharapkan respons dalam format JSON
   }
}, (response) => {
   // Menangani respons dari server
   response.on("data", (data) => {
      // Menerima data dari respons dan mencetaknya ke konsol setelah mengonversi buffer ke string
      console.log(`Receive data : ${data.toString()}`);
   });
});

// Membuat body JSON yang akan dikirim dalam request POST
const body = JSON.stringify({
   firstName: "Fajar", // Nama depan
   lastName: "Muhammad", // Nama belakang
});

// Menulis body ke dalam request
request.write(body);

// Mengakhiri request, mengirimkan data yang telah ditulis
request.end();
