// Meng-export fungsi 'sayHello' untuk digunakan di file lain.
export const sayHello = (name) => {
   // Mengembalikan string yang menyapa nama yang diberikan.
   return `Hello ${name}`;
}

// Meng-export fungsi 'sum' untuk digunakan di file lain.
export const sum = (numbers) => {
   // Mendeklarasikan variabel untuk menyimpan total jumlah.
   let total = 0;

   // Mengiterasi setiap nilai dalam array 'numbers'.
   for (const value of numbers) {
      // Menambahkan nilai ke total.
      total += value;
   }

   // Mengembalikan total jumlah.
   return total;
}
