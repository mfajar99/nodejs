import Joi from "joi";

describe('Joi', () => {
   it('should return validation error', () => {
      // Membuat skema validasi untuk username
      // Username harus berupa string dengan minimal 5 karakter, berformat email, dan wajib diisi
      const usernameSchema = Joi.string().min(5).email().required();

      // Memvalidasi input "ups" dengan skema usernameSchema
      // Input ini tidak memenuhi skema karena panjangnya kurang dari 5 karakter dan bukan format email yang valid
      const result = usernameSchema.validate("ups");

      // Tampilkan hasil validasi, baik hasil data yang dimasukkan maupun error jika ada
      console.log(result);

      // Jika terdapat error pada validasi
      if (result.error) {
         // Mengiterasi (looping) detail dari setiap kesalahan validasi
         result.error.details.forEach(detail => {
            // Tampilkan path (lokasi kesalahan) dan pesan kesalahan untuk setiap error yang terjadi
            // Path menunjukkan lokasi dari data yang divalidasi yang gagal (misalnya field yang salah)
            console.log(`${detail.path} = ${detail.message}`);
         });
      }
   });

});