// Fungsi samplePromise mengembalikan sebuah Promise yang langsung ter-resolve dengan nilai "Fajar"
function samplePromise() {
   return Promise.resolve("Fajar");
}

// Fungsi async run menggunakan async/await untuk menangani Promise secara lebih mudah
async function run() {
   // Menunggu hasil dari samplePromise() dan menyimpannya dalam variabel name
   const name = await samplePromise();
   // Menampilkan nilai yang diterima dari samplePromise() ke konsol
   console.info(name);
}

// Memanggil fungsi run untuk menjalankan kode
run();
