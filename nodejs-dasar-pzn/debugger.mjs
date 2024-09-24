// Fungsi 'sayHello' menerima parameter 'name' dan mengembalikan string dengan sapaan "Hello" yang diikuti oleh nama
function sayHello(name) {
   // Keyword 'debugger' menghentikan eksekusi kode dan memungkinkan program untuk memeriksa nilai variabel dan alur eksekusi
   debugger;

   // Mengembalikan string dengan format "Hello {name}"
   return `Hello ${name}`;
}

// Mendeklarasikan variabel 'name' dengan nilai "Fajar"
const name = "Fajar";

// Mencetak hasil dari fungsi 'sayHello' ke konsol dengan argumen 'name'
console.info(sayHello(name));
