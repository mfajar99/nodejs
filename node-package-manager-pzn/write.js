// Mengimpor modul 'fs' dari Node.js, yang menyediakan API untuk berinteraksi dengan sistem file
import fs from "fs";

// Mendefinisikan dan mengekspor fungsi `writeToFile`
// Fungsi ini menggunakan API `writeFileSync` dari modul 'fs' untuk menulis data ke file secara sinkron
export const writeToFile = (file, content) => {
   // `file` adalah nama file atau path di mana data akan ditulis
   // `content` adalah data yang akan ditulis ke file
   fs.writeFileSync(file, content);
}
