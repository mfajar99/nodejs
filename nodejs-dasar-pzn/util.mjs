// Mengimpor modul 'util' bawaan Node.js.
// Modul ini menyediakan fungsi-fungsi utilitas yang berguna, salah satunya adalah 'util.format' untuk memformat string.
import util from "util";

// Mendeklarasikan dua variabel, 'firstName' dan 'lastName', masing-masing dengan nilai "Fajar" dan "Muhammad".
const firstName = "Fajar";
const lastName = "Muhammad";

// Menampilkan pesan ke konsol dengan menggunakan template string.
// Template string memudahkan kita untuk menyisipkan variabel langsung ke dalam string dengan format `${variabel}`.
console.log(`Hello ${firstName} ${lastName}`);

// Menampilkan pesan yang sama ke konsol menggunakan 'util.format'.
// 'util.format' bekerja seperti printf di bahasa pemrograman lain, di mana '%s' digunakan untuk menyisipkan string.
console.log(util.format("Hello %s %s", firstName, lastName));

// Mendeklarasikan objek 'person' dengan properti 'firstName' dan 'lastName'.
const person = {
   firstName: "Fajar",
   lastName: "Muhammad"
};

// Menampilkan objek 'person' ke konsol dalam bentuk JSON string menggunakan 'JSON.stringify'.
// 'JSON.stringify' mengubah objek JavaScript menjadi string JSON yang dapat dibaca.
console.log(`Person : ${JSON.stringify(person)}`);

// Menampilkan objek 'person' ke konsol menggunakan 'util.format' dengan '%j', yang secara otomatis memformat objek sebagai JSON.
console.log(util.format("Person : %j", person));
