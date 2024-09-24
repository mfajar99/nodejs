import Joi from "joi";
describe('Joi', () => {
   it('should can validate object', () => {
      // Membuat skema validasi untuk objek login
      // username harus berupa string, minimal 3 karakter, maksimal 100 karakter, dan berformat email
      // password harus berupa string dengan minimal 6 karakter dan maksimal 100 karakter
      const loginSchema = Joi.object({
         username: Joi.string().required().min(3).max(100).email(),
         password: Joi.string().required().min(6).max(100)
      });

      // Data permintaan yang akan divalidasi
      const request = {
         username: "fajar@gmai.com", // Ada typo dalam email
         password: "rahasia"         // Password memenuhi syarat
      };

      // Melakukan validasi dengan opsi abortEarly false (menangkap semua kesalahan, bukan hanya yang pertama)
      const result = loginSchema.validate(request, {
         abortEarly: false
      });

      // Menampilkan hasil validasi
      console.log(result);
   });


   it('should can validate nested object', () => {
      // Membuat skema validasi untuk objek user
      // Objek address merupakan objek bersarang yang memiliki skema tersendiri
      const createUserSchema = Joi.object({
         id: Joi.string().required().max(100),
         name: Joi.string().required().max(100),
         address: Joi.object({
            street: Joi.string().required().max(100),
            city: Joi.string().required().max(100),
            country: Joi.string().required().max(100),
            zipCode: Joi.string().required().max(10),
         }).required() // Address wajib diisi
      });

      // Data permintaan yang tidak lengkap (tidak ada id, name, dan field address kosong)
      const request = {
         address: {}
      };

      // Melakukan validasi dengan opsi abortEarly false
      const result = createUserSchema.validate(request, {
         abortEarly: false
      });

      // Menampilkan hasil validasi
      console.log(result);

      // Jika terdapat error, tampilkan detail dari setiap kesalahan
      if (result.error) {
         result.error.details.forEach(value => {
            console.log(`${value.path} : ${value.message}`);
         });
      }
   });

});