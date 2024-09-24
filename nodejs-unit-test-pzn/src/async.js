/**
 * Fungsi `sayHelloAsync` adalah fungsi asinkron yang mengembalikan sebuah `Promise`. 
 * Fungsi ini akan memberikan salam kepada nama yang diberikan setelah penundaan 1 detik. 
 * Jika nama tidak diberikan, fungsi akan ditolak dengan pesan error.
 * 
 * @param {string} name - Nama orang yang akan disapa
 * @returns {Promise<string>} - Mengembalikan Promise yang berisi pesan sapaan atau pesan error
 */
export const sayHelloAsync = (name) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (name) {
            resolve(`Hello ${name}`); // Jika nama diberikan, resolusi promise memberikan salam
         } else {
            reject("Name is empty"); // Jika nama tidak diberikan, promise ditolak
         }
      }, 1000); // Penundaan selama 1 detik sebelum memberikan hasil
   });
};

/**
 * Fungsi `getBalance` adalah fungsi asinkron yang mengambil nama dan fungsi `from` sebagai argumen.
 * Fungsi ini memanggil fungsi `from`, yang diharapkan mengembalikan sebuah nilai (contohnya saldo), 
 * kemudian mengembalikan sebuah objek yang berisi nama dan saldo.
 * 
 * @param {string} name - Nama orang yang ingin ditampilkan saldonya
 * @param {function} from - Sebuah fungsi asinkron yang mengembalikan nilai saldo
 * @returns {Promise<object>} - Mengembalikan sebuah Promise yang berisi objek dengan nama dan saldo
 */
export const getBalance = async (name, from) => {
   const balance = await from(); // Tunggu hasil dari fungsi `from` yang mengembalikan saldo
   return {
      name: name,  // Nama yang diberikan
      balance: balance // Saldo yang dikembalikan oleh fungsi `from`
   };
};
