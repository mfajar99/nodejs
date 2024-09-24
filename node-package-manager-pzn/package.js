// Mengimpor fungsi `sayHello` dan `sum` dari pustaka `nodejs-npm-library-pzn`
// `sayHello` dan `sum` adalah fungsi yang di-export dari modul utama pustaka ini
import { sayHello, sum } from "nodejs-npm-library-pzn";

// Mengimpor fungsi `max` dan `min` dari modul `number` dari pustaka `nodejs-npm-library-pzn`
// `max` dan `min` adalah fungsi tambahan yang di-export dari sub-modul `number`
import { max, min } from "nodejs-npm-library-pzn/number";

// Menampilkan hasil dari fungsi `sayHello`
// `sayHello` mungkin adalah fungsi yang mengembalikan sapaan atau pesan
console.log(sayHello("Fajar"));

// Menampilkan hasil dari fungsi `sum`
// `sum` menghitung jumlah dari array yang diberikan sebagai argumen
console.log(sum([10, 10, 10, 10, 10]));

// Menampilkan hasil dari fungsi `min`
// `min` mengembalikan nilai terkecil dari dua argumen yang diberikan
console.log(min(10, 20));

// Menampilkan hasil dari fungsi `max`
// `max` mengembalikan nilai terbesar dari dua argumen yang diberikan
console.log(max(10, 20));
