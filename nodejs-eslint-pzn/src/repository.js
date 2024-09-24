// Mendefinisikan dan mengekspor fungsi getData yang bersifat asinkron.
export async function getData() {
   // Mengembalikan string "Hello World". Karena ini adalah fungsi asinkron, hasilnya akan dibungkus dalam Promise.
   return "Hello World";
}

// Mendefinisikan dan mengekspor fungsi sum yang menghitung penjumlahan dua angka.
export function sum(a, b) {
   // Menjumlahkan parameter a dan b, dan menyimpan hasilnya dalam variabel total.
   let total = a + b;

   // Mengembalikan hasil penjumlahan.
   return total;
}
