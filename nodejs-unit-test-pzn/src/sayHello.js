// Fungsi untuk mengembalikan pesan salam
export const sayHello = (name) => {
   // Memeriksa apakah parameter 'name' ada dan tidak kosong
   if (name) {
      // Jika 'name' valid, mengembalikan pesan "Hello [name]"
      return `Hello ${name}`;
   } else {
      // Jika 'name' kosong atau tidak diberikan, melempar error
      throw new Error("Name is required");
   }
};
