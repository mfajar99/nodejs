// Setup untuk pengujian di luar
beforeAll(() => console.log("Before All Outer")); // Dipanggil satu kali sebelum semua pengujian
afterAll(() => console.log("After All Outer")); // Dipanggil satu kali setelah semua pengujian
beforeEach(() => console.log("Before Each Outer")); // Dipanggil sebelum setiap pengujian
afterEach(() => console.log("After Each Outer")); // Dipanggil setelah setiap pengujian

test("Test Outer", () => console.log("Test Outer")); // Pengujian di luar

describe("Inner", () => {
   // Setup untuk pengujian di dalam
   beforeEach(() => console.log("Before Each Inner")); // Dipanggil sebelum setiap pengujian di dalam describe
   afterEach(() => console.log("After Each Inner")); // Dipanggil setelah setiap pengujian di dalam describe

   test("Test Inner", () => console.log("Test Inner")); // Pengujian di dalam describe
});
