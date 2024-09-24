// Mengimpor pustaka `lodash`
// `lodash` adalah pustaka JavaScript yang menyediakan banyak fungsi utilitas untuk memudahkan manipulasi data dan operasi umum.
import _ from "lodash";

// Mendefinisikan sebuah variabel `name` yang berisi string dengan semua huruf kapital
const name = "MUHAMMAD FAJAR AMIR";

// Menggunakan fungsi `capitalize` dari pustaka `lodash` untuk mengubah string menjadi kapitalisasi yang benar
// Fungsi ini akan mengubah huruf pertama dari string menjadi huruf kapital dan sisanya menjadi huruf kecil
const result = _.capitalize(name);

// Menampilkan hasil ke konsol
// `result` sekarang akan berisi string dengan huruf pertama kapital dan sisa huruf kecil
console.log(result);
