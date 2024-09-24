// Mengimpor kelas 'URL' dari modul 'url' bawaan Node.js.
// Modul ini digunakan untuk bekerja dengan URL dan manipulasi komponennya.
import { URL } from "url";

// Membuat objek URL baru berdasarkan string URL yang diberikan.
// URL yang digunakan di sini adalah "https://www.programmerzamannow.com/belajar?kelas=nodejs".
const pzn = new URL("https://www.programmerzamannow.com/belajar?kelas=nodejs");

// Mengubah host (domain) dari URL yang sebelumnya 'www.programmerzamannow.com' menjadi 'www.fajar.com'.
pzn.host = "www.fajar.com";

// Menambahkan parameter query baru ke URL, yaitu 'status=premium'.
// Query parameter digunakan untuk mengirimkan data tambahan dalam URL, misalnya `?key=value`.
pzn.searchParams.append("status", "premium");

// Menampilkan URL lengkap yang dimanipulasi dalam bentuk string.
// URL akhir menjadi "https://www.fajar.com/belajar?kelas=nodejs&status=premium".
console.log(pzn.toString());

// Menampilkan properti 'href', yang merupakan URL lengkap.
// Ini sama dengan `pzn.toString()`.
console.log(pzn.href);

// Menampilkan protokol dari URL, yaitu "https:".
// Protokol menunjukkan skema URL, dalam hal ini adalah HTTPS (HyperText Transfer Protocol Secure).
console.log(pzn.protocol);

// Menampilkan host (domain) dari URL, yaitu "www.fajar.com".
// Host adalah bagian dari URL yang menunjukkan nama domain atau alamat IP.
console.log(pzn.host);

// Menampilkan path dari URL, yaitu "/belajar".
// Path adalah jalur setelah nama domain yang mengarah ke halaman atau resource tertentu di server.
console.log(pzn.pathname);

// Menampilkan semua query parameter (search parameters) dari URL.
// SearchParams adalah objek yang memuat semua pasangan key-value dari query string.
console.log(pzn.searchParams);
