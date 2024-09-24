// Mengimpor modul 'os' dari Node.js untuk mendapatkan informasi tentang sistem operasi
const os = require("os");

// Mencetak platform sistem operasi (misalnya, 'linux', 'darwin' untuk macOS, 'win32' untuk Windows)
console.info(os.platform());

// Mencetak informasi tentang CPU sistem dalam format tabel
console.table(os.cpus());
