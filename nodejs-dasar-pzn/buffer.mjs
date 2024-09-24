// Membuat buffer dari string "Fajar Muhammad Amir" dengan encoding default (utf8)
const buffer = Buffer.from("Fajar Muhammad Amir");

// Menampilkan buffer sebagai objek Buffer
console.info(buffer);
// Output: <Buffer 46 61 6a 61 72 20 4d 75 68 61 6d 6d 61 64 20 41 6d 69 72>

// Mengonversi buffer kembali menjadi string dengan encoding default (utf8)
console.info(buffer.toString());
// Output: Fajar Muhammad Amir

// Membalikkan urutan byte di dalam buffer
buffer.reverse();

// Menampilkan buffer setelah dibalik sebagai string dengan encoding default (utf8)
console.info(buffer.toString());
// Output: rimA hmadmuhM rajaF
