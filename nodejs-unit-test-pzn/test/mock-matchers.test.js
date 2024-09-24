import { calculate } from "../src/sum"; // Mengimpor fungsi calculate dari file yang relevan

// Pengujian untuk fungsi calculate dengan mock matchers
test("test mock matchers", () => {
   const callback = jest.fn(); // Membuat mock function 'callback'

   // Memanggil calculate dengan array dan callback
   calculate([10, 10, 10], callback);
   calculate([10, 10, 10, 10, 10], callback);

   // Memeriksa apakah callback telah dipanggil setidaknya sekali
   expect(callback).toHaveBeenCalled();
   // Memeriksa berapa kali callback telah dipanggil
   expect(callback).toHaveBeenCalledTimes(2);
   // Memeriksa nilai yang diteruskan ke callback pada salah satu panggilan
   expect(callback).toHaveBeenCalledWith(30);
   expect(callback).toHaveBeenCalledWith(50);
});
