// Fungsi untuk menjumlahkan dua angka
export const sum = (first, second) => {
   // Mengembalikan hasil penjumlahan first dan second
   return first + second;
};

// Fungsi untuk menjumlahkan semua angka dalam array
export const sumAll = (numbers) => {
   let total = 0; // Inisialisasi total dengan 0
   // Mengiterasi setiap number dalam array numbers
   for (let number of numbers) {
      // Menambahkan number ke total
      total += number;
   }
   // Mengembalikan total penjumlahan
   return total;
};

// Fungsi untuk menghitung total dan memanggil callback dengan total tersebut
export const calculate = (numbers, callback) => {
   let total = 0; // Inisialisasi total dengan 0
   // Mengiterasi setiap number dalam array numbers
   for (let number of numbers) {
      // Menambahkan number ke total
      total += number;
   }
   // Memanggil callback dengan total
   callback(total);
};

// Fungsi untuk menghitung total dan mengembalikan nilai dari callback
export const calculateAndReturn = (numbers, callback) => {
   let total = 0; // Inisialisasi total dengan 0
   // Mengiterasi setiap number dalam array numbers
   for (let number of numbers) {
      // Menambahkan number ke total
      total += number;
   }
   // Mengembalikan nilai dari pemanggilan callback dengan total
   return callback(total);
};
