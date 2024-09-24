import { UserRepository } from "./user-repository";

// Kelas UserService untuk mengelola logika bisnis pengguna
export class UserService {
   // Konstruktor menerima instance UserRepository
   constructor(userRepository) {
      // Memeriksa apakah userRepository disediakan
      if (userRepository) {
         this.userRepository = userRepository; // Menggunakan instance yang diberikan
      } else {
         // Jika tidak, buat instance baru dari UserRepository
         this.userRepository = new UserRepository();
      }
   };

   // Metode untuk menyimpan pengguna
   save(user) {
      // Memanggil metode save dari userRepository
      this.userRepository.save(user);
   };

   // Metode untuk mencari pengguna berdasarkan ID
   findById(id) {
      // Memanggil metode findById dari userRepository dan mengembalikan hasilnya
      return this.userRepository.findById(id);
   };

   // Metode untuk mengambil semua pengguna
   findAll() {
      // Memanggil metode findAll dari userRepository dan mengembalikan hasilnya
      return this.userRepository.findAll();
   }
}
