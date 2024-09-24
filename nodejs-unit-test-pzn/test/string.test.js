// Contoh pengujian untuk string menggunakan Jest
test('string', () => {
   const name = "Muhammad Fajar Amir";

   // Memeriksa apakah name sama persis dengan "Muhammad Fajar Amir"
   expect(name).toBe("Muhammad Fajar Amir");

   // Memeriksa apakah name memiliki nilai yang sama dengan "Muhammad Fajar Amir"
   expect(name).toEqual("Muhammad Fajar Amir");

   // Memeriksa apakah name mengandung pola "ajar"
   expect(name).toMatch(/ajar/);
});
