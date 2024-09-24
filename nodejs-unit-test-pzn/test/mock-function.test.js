import { calculate, calculateAndReturn } from "../src/sum"; // Mengimpor fungsi calculate dan calculateAndReturn

// Pengujian untuk fungsi calculate
test("test calculate", () => {
   const callback = jest.fn(); // Membuat mock function 'callback'

   // Memanggil calculate dengan array dan callback
   calculate([10, 10, 10], callback);
   calculate([10, 10, 10, 10, 10], callback);

   // Memeriksa jumlah panggilan ke mock function
   expect(callback.mock.calls.length).toBe(2);
   console.log(callback.mock.calls); // Menampilkan semua panggilan ke mock function

   // Memeriksa nilai yang diteruskan ke callback pada panggilan pertama dan kedua
   expect(callback.mock.calls[0][0]).toBe(30);
   expect(callback.mock.calls[1][0]).toBe(50);
});

// Pengujian untuk fungsi calculate tanpa mock function
test("test calculate without mock function", () => {
   const logging = (total) => {
      console.log(total); // Fungsi logging untuk mencetak total
   };

   // Memanggil calculate dengan array dan fungsi logging
   calculate([10, 10, 10], logging);
   calculate([10, 10, 10, 10, 10], logging);
});

// Pengujian untuk fungsi calculateAndReturn dengan mock return value
test("test mock return value", () => {
   const callback = jest.fn(); // Membuat mock function 'callback'
   callback.mockReturnValueOnce(40); // Mengatur nilai kembali untuk panggilan pertama
   callback.mockReturnValueOnce(80); // Mengatur nilai kembali untuk panggilan kedua

   // Memeriksa nilai kembali dari calculateAndReturn
   expect(calculateAndReturn([10, 10, 10], callback)).toBe(40);
   expect(calculateAndReturn([10, 10, 10], callback)).toBe(80);

   // Memeriksa nilai hasil dari mock function
   expect(callback.mock.results[0].value).toBe(40);
   expect(callback.mock.results[1].value).toBe(80);
});

// Pengujian untuk mockImplementation
test("test mockImplementation", () => {
   const callback = jest.fn(); // Membuat mock function 'callback'
   callback.mockImplementation((total) => {
      return total * 2; // Implementasi yang mengalikan total dengan 2
   });

   // Memeriksa nilai kembali dari calculateAndReturn dengan mock implementation
   expect(calculateAndReturn([10, 10, 10], callback)).toBe(60);
   expect(calculateAndReturn([10, 10, 10, 10, 10], callback)).toBe(100);

   // Memeriksa nilai hasil dari mock function
   expect(callback.mock.results[0].value).toBe(60);
   expect(callback.mock.results[1].value).toBe(100);
});
