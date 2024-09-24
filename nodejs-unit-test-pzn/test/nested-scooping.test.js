// Fungsi ini akan dijalankan sebelum setiap pengujian
beforeEach(() => console.log("Before Each 1"));
// Fungsi ini akan dijalankan setelah setiap pengujian
afterEach(() => console.log("After Each 1"));

// Deskripsi untuk lingkup pengujian yang lebih dalam
describe("inner scope", () => {
   // Fungsi ini akan dijalankan sebelum setiap pengujian dalam lingkup ini
   beforeEach(() => console.log("Inner Before Each 1"));
   // Fungsi ini akan dijalankan setelah setiap pengujian dalam lingkup ini
   afterEach(() => console.log("After Inner Each 1"));

   // Deskripsi untuk lingkup pengujian yang lebih dalam lagi
   describe("inner inner scope", () => {
      // Fungsi ini akan dijalankan sebelum setiap pengujian dalam lingkup ini
      beforeEach(() => console.log("Inner Inner Before Each 1"));
      // Fungsi ini akan dijalankan setelah setiap pengujian dalam lingkup ini
      afterEach(() => console.log("Inner Inner After Each 1"));

      // Pengujian pertama
      test('test 1', () => console.info("Test 1"));
      // Pengujian kedua
      test('test 2', () => console.info("Test 2"));
   });
});
