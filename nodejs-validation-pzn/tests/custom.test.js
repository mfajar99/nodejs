import Joi from "joi";

describe('Joi', () => {
   it('should can create custom validation', () => {
      // Membuat skema validasi objek pendaftaran
      // Username harus berupa string, minimal 3 karakter, maksimal 100 karakter, dan berformat email
      const registerSchema = Joi.object({
         username: Joi.string().required().min(3).max(100).email(),

         // Password harus berupa string dengan panjang minimal 3 karakter dan maksimal 100 karakter
         // Menggunakan validasi kustom untuk memeriksa apakah password dimulai dengan "fajar"
         password: Joi.string().required().min(3).max(100).custom((value, helpers) => {
            // Jika password dimulai dengan "fajar", maka validasi gagal
            if (value.startsWith('fajar')) {
               return helpers.error('password.wrong');
            }
            // Jika validasi berhasil, kembalikan nilai password
            return value;
         }).messages({
            // Pesan kesalahan kustom jika password dimulai dengan "fajar"
            'password.wrong': 'password can not start with "fajar"'
         }),

         // Konfirmasi password dengan syarat minimal 6 karakter
         confirmPassword: Joi.string().required().min(6).max(100),
      })
         // Validasi kustom tambahan untuk memeriksa apakah password dan confirmPassword cocok
         .custom((value, helpers) => {
            // Jika password dan confirmPassword tidak cocok, validasi gagal
            if (value.password !== value.confirmPassword) {
               return helpers.error('register.password.different');
            }
            // Jika validasi berhasil, kembalikan objek yang divalidasi
            return value;
         }).messages({
            // Pesan kesalahan kustom jika password dan confirmPassword tidak sama
            'register.password.different': 'password and confirmPassword are different'
         });

      // Data yang akan divalidasi
      const request = {
         username: "fajar@gmail.com",         // Username valid
         password: "123fajar",                // Password dimulai dengan "fajar" (invalid)
         confirmPassword: "salah123"          // Konfirmasi password tidak cocok (invalid)
      };

      // Melakukan validasi dengan opsi abortEarly false (agar semua kesalahan dikumpulkan sekaligus)
      const result = registerSchema.validate(request, {
         abortEarly: false
      });

      // Menampilkan hasil validasi
      console.log(result);
   });

});