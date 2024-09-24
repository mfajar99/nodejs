// Membuat class ResponseError yang mewarisi dari class Error bawaan JavaScript.
class ResponseError extends Error {
   constructor(status, message) {
      super(message); // Memanggil constructor dari parent class (Error) dengan argumen message.
      this.status = status; // Menyimpan status HTTP (seperti 404, 500) di properti `status`.
   }
}

// Mengekspor class ResponseError agar bisa digunakan di file lain.
export {
   ResponseError
}
