// Mendefinisikan dan mengekspor kelas Person.
export class Person {
   // Konstruktor kelas yang dijalankan saat membuat instansi baru dari kelas ini.
   constructor(name) {
      this.name = name; // Menyimpan nama yang diberikan ke dalam properti name.
   }

   // Metode greet yang mengembalikan sapaan dengan nama.
   greet() {
      return `Hello ${this.name}`; // Menggunakan template literal untuk mengembalikan sapaan.
   }
}
