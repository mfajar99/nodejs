import Joi from "joi";

describe('Joi', () => {
   // Test untuk memvalidasi tanggal menggunakan Joi
   it('should can validate date', () => {
      // Membuat skema validasi untuk tanggal lahir
      // Tanggal harus berupa date, wajib diisi, dan maksimal adalah hari ini ("now"), serta minimal adalah 1 Januari 1988
      const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

      // Test untuk memvalidasi tanggal menggunakan Joi
      it('should can validate date', () => {
         // Membuat skema validasi untuk tanggal lahir
         // Tanggal harus berupa date, wajib diisi, dan maksimal adalah hari ini ("now"), serta minimal adalah 1 Januari 1988
         const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

         // Memvalidasi tanggal "1-1-1987" dengan skema birthDateSchema
         // Hasilnya akan error karena tanggal tersebut lebih kecil dari batas minimal yang diizinkan (1-1-1988)
         const result = birthDateSchema.validate("1-1-1987");

         // Tampilkan hasil validasi untuk tanggal 1 Januari 1987
         console.log(result);

         // Memeriksa tipe data dari hasil validasi
         // result.value adalah tanggal yang divalidasi (jika valid, atau data input jika tidak valid)
         console.log(typeof result.value); // Harus berupa object karena tanggal dalam format Date

         // result.error akan berisi informasi tentang error jika validasi gagal
         // Jika validasi berhasil, result.error bernilai undefined
         console.log(typeof result.error); // Akan menampilkan 'object' jika ada error, atau 'undefined' jika tidak ada error
      });



      // Memvalidasi tanggal "12-25-1990" (25 Desember 1990)
      // Tanggal ini valid karena berada dalam rentang yang diizinkan
      const result2 = birthDateSchema.validate("12-25-1990");
      // Tampilkan hasil validasi untuk tanggal 25 Desember 1990
      console.log(result2);

      // Memvalidasi tanggal "12-25-20027" (tanggal ini salah format karena tahunnya 20027, bukan 2027)
      // Hasilnya akan error karena ini bukan tanggal yang valid
      const result3 = birthDateSchema.validate("12-25-20027");
      // Tampilkan hasil validasi untuk tanggal yang salah format
      console.log(result3);
   });

});