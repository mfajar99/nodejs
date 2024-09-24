// Menguji kesamaan nilai menggunakan matcher toBe
test("test toBe", () => {
   let name = "Fajar";                               // Mendeklarasikan variabel name
   let hello = `Hello ${name}`;                     // Menggunakan template literal untuk membuat string

   // Memastikan bahwa nilai hello sama persis dengan "Hello Fajar"
   expect(hello).toBe("Hello Fajar");
});

// Menguji kesamaan objek menggunakan matcher toEqual
test("test toEqual", () => {
   let person = { id: "fajar" };                    // Mendeklarasikan objek person dengan id
   Object.assign(person, { name: "Fajar" });        // Menambahkan properti name ke objek person

   // Memastikan bahwa objek person sama secara struktural dengan objek yang diharapkan
   expect(person).toEqual({ id: "fajar", name: "Fajar" });
});
