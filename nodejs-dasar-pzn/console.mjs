import { Console } from "console";
import fs from "fs";

// Membuat stream untuk menulis ke file
const file = fs.createWriteStream("application.log");

// Membuat instance Console dengan stdout dan stderr mengarah ke file
const log = new Console({
   stdout: file,
   stderr: file,
});

// Menulis log ke file
log.info("Hello World");
log.error("Hello World");

// Membuat objek untuk ditampilkan dalam format tabel
const person = {
   firstName: "Fajar",
   lastName: "Muhammad",
};

// Menampilkan objek dalam format tabel di file log
log.table(person);
