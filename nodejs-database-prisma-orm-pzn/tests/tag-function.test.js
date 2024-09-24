// Mendefinisikan fungsi tagFunction yang menerima array template literal dan argumen lainnya
function tagFunction(array, ...args) {
   // Menampilkan array template literal
   console.log(array);
   // Menampilkan argumen tambahan (nilai yang diinterpolasi dalam template literal)
   console.log(args);
}

// Pengujian pertama untuk fungsi tagFunction
test("tag function", () => {
   // Mendefinisikan variabel untuk nama dan nama belakang
   const name = "Fajar";
   const lastName = "Amir";

   // Memanggil tagFunction dengan template literal dan variabel yang diinterpolasi
   tagFunction`Hello ${name} ${lastName}!, How are you?`;
   tagFunction`Bye ${name} ${lastName}!, See you later`;
});

// Pengujian kedua untuk fungsi tagFunction dengan contoh SQL injection
test("tag function sql", () => {
   // Mendefinisikan variabel dengan potensi serangan SQL injection
   const name = "Fajar'; DROP table users;";
   const age = 30;

   // Memanggil tagFunction dengan template literal yang berisi query SQL
   tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`;
});
