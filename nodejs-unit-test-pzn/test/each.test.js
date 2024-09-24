import { sumAll } from "../src/sum";

// Menyusun tabel data untuk pengujian
const table = [
   [[0], 0],                           // Kasus uji dengan satu elemen, 0; hasil yang diharapkan adalah 0
   [[10], 10],                         // Kasus uji dengan satu elemen, 10; hasil yang diharapkan adalah 10
   [[10, 10, 10], 30],                 // Kasus uji dengan tiga elemen, semuanya 10; hasil yang diharapkan adalah 30
   [[10, 10, 10, 10, 10], 50],         // Kasus uji dengan lima elemen, semuanya 10; hasil yang diharapkan adalah 50
   [[10, 10, 10, 10, 10, 10, 10], 70], // Kasus uji dengan tujuh elemen, semuanya 10; hasil yang diharapkan adalah 70
];

// Menggunakan test.each untuk menjalankan setiap kasus uji dalam tabel
test.each(table)("test sumAll(%s) should result %i", (numbers, expected) => {
   // Memastikan bahwa fungsi sumAll mengembalikan nilai yang diharapkan
   expect(sumAll(numbers)).toBe(expected);
});
