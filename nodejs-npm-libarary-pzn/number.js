// Meng-export fungsi 'min' untuk digunakan di file lain.
export const min = (first, second) => {
   // Mengecek apakah 'first' lebih kecil dari 'second'.
   if (first < second) {
      // Jika ya, kembalikan 'first' sebagai nilai terkecil.
      return first;
   } else {
      // Jika tidak, kembalikan 'second' sebagai nilai terkecil.
      return second;
   }
}

// Meng-export fungsi 'max' untuk digunakan di file lain.
export const max = (first, second) => {
   // Mengecek apakah 'first' lebih besar dari 'second'.
   if (first > second) {
      // Jika ya, kembalikan 'first' sebagai nilai terbesar.
      return first;
   } else {
      // Jika tidak, kembalikan 'second' sebagai nilai terbesar.
      return second;
   }
}
