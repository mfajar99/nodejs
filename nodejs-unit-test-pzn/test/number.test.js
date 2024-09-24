// Pengujian untuk angka
test('numbers', () => {
   const value = 2 + 2; // Menghitung nilai sebagai 2 + 2

   // Mengharapkan bahwa 'value' lebih besar dari 3
   expect(value).toBeGreaterThan(3);
   // Mengharapkan bahwa 'value' lebih besar dari atau sama dengan 3.5
   expect(value).toBeGreaterThanOrEqual(3.5);
   // Mengharapkan bahwa 'value' kurang dari 5
   expect(value).toBeLessThan(5);
   // Mengharapkan bahwa 'value' kurang dari atau sama dengan 4.5
   expect(value).toBeLessThanOrEqual(4.5);

   // Memastikan bahwa 'value' sama dengan 4
   expect(value).toBe(4);
   // Memastikan bahwa 'value' sama dengan 4 berdasarkan kesetaraan struktural
   expect(value).toEqual(4);
});
