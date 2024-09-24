import * as axios from "axios";
import * as fs from 'node:fs';

// Deskripsi pengujian untuk klien HTTP
describe('HTTP Client', () => {
   // Menguji apakah Axios dapat dikonfigurasi dengan benar
   it('should be support by axios', async () => {

      // Membuat instance baru Axios dengan konfigurasi khusus
      const httpClient = axios.create({
         timeout: 5000,  // Mengatur batas waktu request (5000 ms atau 5 detik)
         baseURL: 'https://www.programmerzamannow.com' // Menentukan URL dasar untuk setiap request
      });

      // Memeriksa apakah objek httpClient berhasil dibuat
      expect(httpClient).toBeDefined(); // Pastikan httpClient tidak undefined, menunjukkan bahwa Axios berhasil dikonfigurasi
   });

});

// Deskripsi pengujian untuk metode HTTP
describe('HTTP Method', () => {
   // Membuat instance Axios dengan konfigurasi dasar
   const httpClient = axios.create({
      baseURL: 'https://fajar.free.beeceptor.com',  // URL dasar untuk semua request yang dikirim menggunakan instance ini
      timeout: 5000  // Batas waktu maksimal untuk request, yaitu 5000 ms (5 detik)
   });

   // Menambahkan interceptor request untuk mencetak informasi saat request dikirim
   httpClient.interceptors.request.use(
      async (config) => {
         console.log(`Send request to ${config.baseURL}${config.url}`);
         return config; // Mengembalikan konfigurasi request yang sudah dimodifikasi
      },
      async (error) => {
         console.log(`Request error : ${error.message}`);
         return Promise.reject(error); // Mengembalikan error jika terjadi
      },
      {
         synchronous: false // Menentukan bahwa interceptor tidak bersifat sinkron
      }
   )

   // Menguji apakah metode GET dapat digunakan dengan instance Axios
   it('should support GET method', async () => {
      // Melakukan request GET ke URL dasar ('/') menggunakan httpClient
      const response = await httpClient.get('/');

      // Memeriksa apakah respons status adalah 200 (artinya request berhasil)
      expect(response.status).toBe(200);
   });

   // Menguji apakah metode GET dapat digunakan dengan konfigurasi tambahan
   it('should support GET method with config', async () => {

      const response = await httpClient.get('/', {
         params: {
            name: 'Fajar' // Menambahkan parameter query 'name' ke request
         },
         headers: {
            'Accept': 'application/json' // Menentukan header 'Accept'
         }
      });

      // Memeriksa apakah respons status adalah 200 dan status text adalah 'OK'
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
      expect(response.data.success).toBe(true); // Memeriksa apakah data respons mengandung 'success' yang bernilai true
   });

   // Menguji apakah metode POST dapat digunakan dengan body request dalam format JSON
   it('should support POST method with JSON request body', async () => {
      const json = {
         username: 'fajar',
         password: 'rahasia'
      }

      const response = await httpClient.post('/', json, {
         headers: {
            'Content-Type': 'application/json', // Menentukan header 'Content-Type' sebagai 'application/json'
            'Accept': 'application/json' // Menentukan header 'Accept'
         }
      });

      // Memeriksa apakah respons status adalah 200
      expect(response.status).toBe(200);
   });

   // Menguji apakah metode POST dapat digunakan dengan body request dalam format teks
   it('should support POST with TEXT request body', async () => {
      const text = 'Fajar Muhammad Amir';

      const response = await httpClient.post('/', text, {
         headers: {
            'Content-Type': 'application/plain', // Menentukan header 'Content-Type' sebagai 'application/plain'
            'Accept': 'application/json' // Menentukan header 'Accept'
         }
      });

      // Memeriksa apakah respons status adalah 200 dan status text adalah 'OK'
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
      expect(response.data.success).toBe(true); // Memeriksa apakah data respons mengandung 'success' yang bernilai true
   });

   // Menguji apakah metode POST dapat digunakan dengan body request dalam format FORM
   it('should support POST with FORM request body', async () => {
      const form = {
         username: 'fajar',
         password: 'rahasia'
      }

      const response = await httpClient.post('/', form, {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Menentukan header 'Content-Type' sebagai 'application/x-www-form-urlencoded'
         }
      });

      // Memeriksa apakah respons status adalah 200
      expect(response.status).toBe(200);
   });

   // Menguji apakah metode POST dapat digunakan dengan body request dalam format Multipart
   it('should support POST with Multipart request body', async () => {
      const data = fs.readFileSync('image.png'); // Membaca file gambar dari sistem file

      const form = new FormData();
      form.append('username', 'fajar');
      form.append('password', 'rahasia');
      form.append('file', new Blob(data), 'image.png'); // Menambahkan file gambar ke FormData

      const response = await httpClient.post('/', form, {
         headers: {
            'Content-Type': 'multipart/form-data' // Menentukan header 'Content-Type' sebagai 'multipart/form-data'
         }
      });

      // Memeriksa apakah respons status adalah 200 dan status text adalah 'OK'
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
      expect(response.data.success).toBe(true); // Memeriksa apakah data respons mengandung 'success' yang bernilai true
   });
});
