import { sum } from "../src/sum.js";

// Setup untuk pengujian
beforeAll(async () => {
   console.log("Before All"); // Dipanggil satu kali sebelum semua pengujian
});

afterAll(async () => {
   console.log("After All"); // Dipanggil satu kali setelah semua pengujian
});

beforeEach(async () => {
   console.log("Before Each"); // Dipanggil sebelum setiap pengujian
});

afterEach(async () => {
   console.log("After Each"); // Dipanggil setelah setiap pengujian
});

// Pengujian pertama
test("first test", async () => {
   expect(sum(10, 10)).toBe(20); // Memastikan bahwa hasil penjumlahan adalah 20
   console.log("First Test"); // Mencetak "First Test" ke konsol
});

// Pengujian kedua
test("second test", () => {
   expect(sum(10, 10)).toBe(20); // Memastikan bahwa hasil penjumlahan adalah 20
   console.log("Second Test"); // Mencetak "Second Test" ke konsol
});
