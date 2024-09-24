import Joi from "joi";

describe('Joi', () => {
   // Test untuk membuat schema validasi dasar menggunakan Joi
   it('should can create schema', function () {
      // Membuat skema validasi string dengan panjang minimal 3 karakter, maksimal 100 karakter, dan wajib diisi
      const schema = Joi.string().min(3).max(100).required();

      // Memvalidasi string "fajar" dengan skema yang sudah dibuat
      const result = schema.validate("fajar");

      // Jika ada kesalahan dalam validasi, tampilkan error
      if (result.error) {
         console.info(result.error);
      }
   });

   // Test untuk memvalidasi berbagai tipe data dasar
   it('should can validate basic data type', () => {
      // Skema validasi untuk email, harus berupa string berformat email dan wajib diisi
      const usernameSchema = Joi.string().email().required();

      // Skema validasi untuk boolean, harus berupa boolean (true/false) dan wajib diisi
      const isAdminSchema = Joi.boolean().required();

      // Skema validasi untuk angka, harus berupa number dengan minimal 1000 dan maksimal 100000
      const priceSchema = Joi.number().required().min(1000).max(100000);

      // Memvalidasi email dengan skema usernameSchema
      const resultUsername = usernameSchema.validate("fajar@gmail.com");
      // Tampilkan hasil validasi username (email)
      console.log(resultUsername);

      // Memvalidasi boolean dengan skema isAdminSchema
      // Perhatikan bahwa nilai "true" adalah string, bukan boolean
      // Hal ini akan menghasilkan error karena Joi mengharapkan boolean (true/false) asli, bukan string
      const resultIsAdmin = isAdminSchema.validate("true");
      // Tampilkan hasil validasi boolean
      console.log(resultIsAdmin);

      // Tampilkan tipe data dari string "true"
      console.log(typeof "true"); // Akan menampilkan 'string'

      // Tampilkan tipe data dari hasil validasi nilai boolean
      console.log(typeof resultIsAdmin.value); // Akan menampilkan 'boolean' jika berhasil, atau tipe dari input jika gagal

      // Tampilkan tipe data dari error hasil validasi
      console.log(typeof resultIsAdmin.error); // Akan menampilkan 'object' jika ada error, atau 'undefined' jika tidak ada error

      // Memvalidasi angka dengan skema priceSchema
      // Perhatikan bahwa nilai '10000' adalah string, bukan number
      // Ini akan menghasilkan error karena Joi mengharapkan number, bukan string
      const resultPrice = priceSchema.validate("10000");
      // Tampilkan hasil validasi angka
      console.log(resultPrice);
   });

});