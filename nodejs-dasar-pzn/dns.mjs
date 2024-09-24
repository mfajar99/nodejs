// Mengimpor modul 'dns/promises' dari Node.js untuk menggunakan fitur DNS yang mendukung Promise
import dns from "dns/promises";

// Menggunakan fungsi 'lookup' dari modul 'dns/promises' untuk mencari alamat IP dari domain yang diberikan
// 'await' digunakan di sini karena 'lookup' adalah fungsi asinkron yang mengembalikan Promise
const address = await dns.lookup("www.programmerzamannow.com");

// Mencetak alamat IP yang ditemukan dari domain ke konsol
console.info(address.address);

// Mencetak versi alamat IP (IPv4 atau IPv6) ke konsol
console.info(address.family);
