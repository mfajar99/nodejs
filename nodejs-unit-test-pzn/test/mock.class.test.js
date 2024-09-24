import { UserRepository } from "../src/user-repository"; // Mengimpor UserRepository
import { UserService } from "../src/user-service"; // Mengimpor UserService

// Memmock modul user-repository
jest.mock("../src/user-repository.js");

// Membuat instance dari UserRepository dan UserService
const repository = new UserRepository();
const service = new UserService(repository);

// Menguji fungsi save pada UserService
test("test mock user save", () => {
   const user = { // Membuat objek user mock
      id: 1,
      name: "Fajar"
   };

   service.save(user); // Memanggil metode save pada UserService

   // Memeriksa apakah metode save pada repository telah dipanggil
   expect(repository.save).toHaveBeenCalled();
   // Memeriksa apakah save dipanggil dengan parameter user yang benar
   expect(repository.save).toHaveBeenCalledWith(user);
});

// Menguji fungsi findById pada UserService
test("test mock class findById", () => {
   const user = { // Membuat objek user mock
      id: 1,
      name: "Fajar"
   };

   // Mengatur return value untuk metode findById
   repository.findById.mockReturnValueOnce(user);

   // Memeriksa apakah hasil dari findById sama dengan objek user
   expect(service.findById(1)).toEqual(user);
   // Memeriksa apakah findById telah dipanggil
   expect(repository.findById).toHaveBeenCalled();
   // Memeriksa apakah findById dipanggil dengan id yang benar
   expect(repository.findById).toHaveBeenCalledWith(1);
});

// Menguji fungsi findAll pada UserService
test("test mock class findAll", () => {
   const users = [ // Membuat array pengguna mock
      {
         id: 1,
         name: "Fajar"
      },
      {
         id: 2,
         name: "Budi"
      }
   ];

   // Mengatur return value untuk metode findAll
   repository.findAll.mockReturnValueOnce(users);

   // Memeriksa apakah hasil dari findAll sama dengan array pengguna mock
   expect(service.findAll()).toEqual(users);
   // Memeriksa apakah findAll telah dipanggil
   expect(repository.findAll).toHaveBeenCalled();
});
