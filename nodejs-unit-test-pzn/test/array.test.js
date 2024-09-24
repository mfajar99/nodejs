// Menguji fungsionalitas dasar array
test("array simple", () => {
   // Mendefinisikan array names yang berisi beberapa nama
   const names = ["Muhammad", "Fajar", "Amir"];

   // Memastikan bahwa array names mengandung elemen "Amir"
   expect(names).toContain("Amir");

   // Memastikan bahwa array names sama dengan array yang diberikan
   expect(names).toEqual(["Muhammad", "Fajar", "Amir"]);
});

// Menguji fungsionalitas array yang berisi objek
test('array object', () => {
   // Mendefinisikan array persons yang berisi objek dengan properti name
   const persons = [
      {
         name: "Fajar"
      },
      {
         name: `Budi`
      }
   ];

   // Memastikan bahwa array persons mengandung objek yang sama dengan objek yang diberikan
   expect(persons).toContainEqual({
      name: "Fajar"
   });
});
