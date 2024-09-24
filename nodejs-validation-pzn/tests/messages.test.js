import Joi from "joi";

describe('Joi', () => {
   it('should can use custom messages', () => {
      // Membuat skema validasi string dengan panjang minimal 3 karakter dan maksimal 10 karakter
      // Pesan kesalahan akan menggunakan format kustom jika validasi gagal
      const schema = Joi.string().min(3).max(10).message({
         // Jika panjang string kurang dari batas minimum, tampilkan pesan kustom ini
         'string.min': '{{ #label }} panjang harus minimal {{ #limit }} karakter',
         // Jika panjang string lebih dari batas maksimum, tampilkan pesan kustom ini
         'string.max': '{{ #label }} panjang harus maksimal {{ #limit }} karakter',
      });

      // Data string yang akan divalidasi, lebih panjang dari batas maksimal (10 karakter)
      const request = "qqqqqqqqqqqqqqqqqqqq";

      // Melakukan validasi dengan skema yang sudah dibuat
      const result = schema.validate(request);

      // Menampilkan hasil validasi, termasuk pesan kesalahan jika ada
      console.log(result);
   });

   it('should can use custom messages in object validation', () => {
      // Membuat skema validasi untuk objek dengan properti 'username' dan 'password'
      // Masing-masing properti memiliki aturan validasi dan pesan kesalahan kustom
      const schema = Joi.object({
         username: Joi.string().required().email().messages({
            // Pesan jika username tidak diisi (required)
            'any.required': '{{ #label }} harus diisi',
            // Pesan jika username tidak berformat email yang valid
            'string.email': '{{ #label }} harus valid email'
         }),
         password: Joi.string().required().min(6).max(10).messages({
            // Pesan jika password tidak diisi
            'any.required': '{{ #label }} harus diisi',
            // Pesan jika panjang password kurang dari 6 karakter
            'string.min': '{{ #label }} harus lebih dari {{ #limit }} karakter',
            // Pesan jika panjang password lebih dari 10 karakter
            'string.max': '{{ #label }} harus kurang dari {{ #limit }} karakter',
         })
      });

      // Data objek yang akan divalidasi
      const request = {
         username: "fajar@gmail.com", // username valid
         password: "fajar123"         // password valid
      }

      // Melakukan validasi dengan opsi abortEarly false (agar semua kesalahan dikumpulkan sekaligus)
      const result = schema.validate(request, {
         abortEarly: false
      });

      // Menampilkan hasil validasi
      console.log(result);
   });

});