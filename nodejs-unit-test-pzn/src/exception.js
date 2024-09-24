/**
 * `MyException` adalah kelas khusus yang memperluas kelas bawaan `Error` untuk membuat jenis error baru.
 * Dengan ini, kita bisa menangani exception yang lebih spesifik dengan memanfaatkan `MyException`.
 */
export class MyException extends Error {
   // Tidak ada tambahan properti atau metode khusus saat ini, hanya mewarisi dari `Error`
}

/**
 * Fungsi `callMe` memeriksa apakah parameter `name` adalah "Fajar". Jika iya, maka fungsi ini akan 
 * melempar exception menggunakan kelas `MyException`. Jika tidak, fungsi ini akan mengembalikan string "OK".
 *
 * @param {string} name - Nama yang akan diperiksa
 * @throws {MyException} jika `name` adalah "Fajar"
 * @returns {string} "OK" jika `name` bukan "Fajar"
 */
export const callMe = (name) => {
   if (name === "Fajar") {
      throw new MyException("Ups my exception happens"); // Melempar MyException jika name adalah "Fajar"
   } else {
      return "OK"; // Mengembalikan "OK" jika name bukan "Fajar"
   }
}
