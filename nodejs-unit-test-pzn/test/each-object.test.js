import { sumAll } from "../src/sum";

// Menyusun tabel data untuk pengujian
const table = [
   {
      numbers: [0], // Kasus uji dengan satu elemen, 0
      expected: 0   // Hasil yang diharapkan adalah 0
   },
   {
      numbers: [10], // Kasus uji dengan satu elemen, 10
      expected: 10   // Hasil yang diharapkan adalah 10
   },
   {
      numbers: [10, 10, 10], // Kasus uji dengan tiga elemen, semuanya 10
      expected: 30           // Hasil yang diharapkan adalah 30 (10 + 10 + 10)
   },
   {
      numbers: [10, 10, 10, 10, 10], // Kasus uji dengan lima elemen, semuanya 10
      expected: 50                // Hasil yang diharapkan adalah 50 (10 * 5)
   },
   {
      numbers: [10, 10, 10, 10, 10, 10, 10], // Kasus uji dengan tujuh elemen, semuanya 10
      expected: 70                                  // Hasil yang diharapkan adalah 70 (10 * 7)
   }
];

// Menggunakan test.each untuk menjalankan setiap kasus uji dalam tabel
test.each(table)("test sumAll($numbers) should result $expected", ({ numbers, expected }) => {
   // Memastikan bahwa fungsi sumAll mengembalikan nilai yang diharapkan
   expect(sumAll(numbers)).toBe(expected);
});
