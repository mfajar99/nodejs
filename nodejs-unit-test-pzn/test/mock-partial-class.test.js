import { UserRepository } from "../src/user-repository"; // Mengimpor UserRepository
import { UserService } from "../src/user-service"; // Mengimpor UserService

const repository = new UserRepository(); // Membuat instance dari UserRepository
const service = new UserService(repository); // Membuat instance dari UserService dengan repository

// Menguji fungsi findById pada UserService
test("test mock partial class findById", () => {
   const user = { // Objek pengguna mock
      id: 1,
      name: "Fajar"
   };

   // Menggunakan jest.spyOn untuk memock metode findById dari repository
   const findByIdMock = jest.spyOn(repository, "findById");
   findByIdMock.mockReturnValue(user); // Mengatur nilai kembalian mock

   // Memeriksa apakah service.findById mengembalikan pengguna yang diharapkan
   expect(service.findById(1)).toEqual(user);

   // Memeriksa apakah findByIdMock telah dipanggil
   expect(findByIdMock).toHaveBeenCalled();
   expect(findByIdMock).toHaveBeenCalledWith(1); // Memeriksa apakah dipanggil dengan argumen yang benar

   // Memeriksa apakah repository.findById juga telah dipanggil
   expect(repository.findById).toHaveBeenCalled();
   expect(repository.findById).toHaveBeenCalledWith(1); // Memeriksa argumen yang digunakan saat pemanggilan
});

// Menguji fungsi findAll pada UserService (seharusnya gagal)
test.failing("test mock partial findAll", () => {
   service.findAll(); // Memanggil findAll tanpa mock
});
