// Pengujian untuk string menggunakan matcher `.not`
test("string.not", () => {
   const name = "Muhammad Fajar Amir";

   // Mengharapkan bahwa 'name' tidak sama dengan "Joko"
   expect(name).not.toBe("Joko");
   // Mengharapkan bahwa 'name' tidak sama dengan "Joko" secara struktur
   expect(name).not.toEqual("Joko");
   // Mengharapkan bahwa 'name' tidak cocok dengan ekspresi reguler /joko/
   expect(name).not.toMatch(/joko/);
});

// Pengujian untuk angka menggunakan matcher `.not`
test('numbers.not', () => {
   const value = 2 + 2;

   // Mengharapkan bahwa 'value' tidak lebih besar dari 6
   expect(value).not.toBeGreaterThan(6);
   // Mengharapkan bahwa 'value' tidak kurang dari 2
   expect(value).not.toBeLessThan(2);
   // Mengharapkan bahwa 'value' tidak sama dengan 10
   expect(value).not.toBe(10);
});
