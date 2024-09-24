// Mengimpor kelas 'EventEmitter' dari modul 'events' Node.js
import { EventEmitter } from "events";

// Membuat instance baru dari EventEmitter
const emitter = new EventEmitter();

// Menambahkan listener pertama untuk event 'hello'
// Listener ini akan mencetak "Hello {name}" ke konsol
emitter.addListener("hello", (name) => {
   console.info(`Hello ${name}`);
});

// Menambahkan listener kedua untuk event 'hello'
// Listener ini akan mencetak "Halo {name}" ke konsol
emitter.addListener("hello", (name) => {
   console.info(`Halo ${name}`);
});

// Memicu event 'hello' dengan argumen 'Fajar'
// Kedua listener yang terdaftar akan dipanggil
emitter.emit("hello", "Fajar");


