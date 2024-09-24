import Joi from "joi";

describe('Joi', () => {
   it('should can validate array', () => {
      // Membuat skema validasi untuk array "hobbies"
      // Setiap elemen harus berupa string, dengan panjang minimal 3 karakter dan maksimal 100 karakter
      // Array harus memiliki minimal 1 elemen dan semua elemen harus unik
      const hobbiesShcema = Joi.array().items(
         Joi.string().required().min(3).max(100)
      ).min(1).unique();

      // Data array yang akan divalidasi
      // Ada dua masalah di sini: "A" terlalu pendek dan "Coding" muncul dua kali (duplikat)
      const hobbies = ["A", "Reading", "Coding", "Coding"];

      // Melakukan validasi dan menangkap semua kesalahan menggunakan opsi abortEarly: false
      const result = hobbiesShcema.validate(hobbies, {
         abortEarly: false
      });

      // Menampilkan hasil validasi, termasuk pesan kesalahan
      console.log(result);
   });


   it('should can validate array of object', () => {
      // Membuat skema validasi untuk array yang berisi objek
      // Setiap objek harus memiliki field 'street', 'city', 'country', dan 'zipCode' dengan aturan masing-masing
      const addressSchema = Joi.array().min(1).items(Joi.object({
         street: Joi.string().required().max(100),
         city: Joi.string().required().max(100),
         country: Joi.string().required().max(100),
         zipCode: Joi.string().required().max(10)
      }));

      // Data array berisi objek yang akan divalidasi, tidak lengkap (hanya memiliki street)
      const address = [
         {
            street: "Jalan belum ada"
         }
      ];

      // Melakukan validasi dengan opsi abortEarly false untuk menampilkan semua kesalahan yang ditemukan
      const result = addressSchema.validate(address, {
         abortEarly: false
      });

      // Menampilkan hasil validasi
      console.log(result);
   });

});