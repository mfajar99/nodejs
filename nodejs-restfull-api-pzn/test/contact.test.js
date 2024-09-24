import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
   createManyTestContacts,
   createTestContacts,
   createTestUser,
   getTestContact,
   removeAllTestContacts,
   removeTestUser
} from "./test-util.js";
import { logger } from "../src/application/logging.js";

// Menggunakan framework Supertest untuk membuat dan menjalankan request HTTP terhadap aplikasi Express.js kita
// Supertest memungkinkan kita mengirim request HTTP tanpa perlu menjalankan server secara nyata.

describe('POST /api/contacts', () => {
   // beforeEach dipanggil sebelum setiap tes. Di sini kita buat user untuk melakukan request dengan user yang valid.
   beforeEach(async () => {
      await createTestUser();
   });

   // afterEach dipanggil setelah setiap tes. Di sini kita hapus semua kontak dan user setelah tes selesai untuk membersihkan data.
   afterEach(async () => {
      await removeAllTestContacts();
      await removeTestUser();
   });

   it('should can create new contact', async () => {
      // Mengirim request POST untuk membuat kontak baru dan mengecek apakah hasilnya sesuai ekspektasi
      const result = await supertest(web)
         .post('/api/contacts')
         .set('Authorization', 'test') // Set header Authorization agar validasi user lolos
         .send({
            first_name: 'test',
            last_name: 'test',
            email: 'test@gmail.com',
            phone: '08530000001'
         });

      // Mengecek apakah status kembalian adalah 200 (berhasil)
      expect(result.status).toBe(200);
      // Mengecek apakah ID dari kontak baru tersebut ada (berarti berhasil disimpan di database)
      expect(result.body.data.id).toBeDefined();
      // Mengecek apakah field-field yang dikirim sesuai dengan yang dikembalikan
      expect(result.body.data.first_name).toBe('test');
      expect(result.body.data.last_name).toBe('test');
      expect(result.body.data.email).toBe('test@gmail.com');
      expect(result.body.data.phone).toBe('08530000001');
   });

   it('should reject if request is not valid', async () => {
      // Mengirim request POST dengan data yang salah untuk memvalidasi apakah sistem menangani error dengan benar
      const result = await supertest(web)
         .post('/api/contacts')
         .set('Authorization', 'test')
         .send({
            first_name: 'test',
            last_name: 'test',
            email: 'test', // Email yang tidak valid
            phone: '08530000001434345343434343434343343' // Nomor telepon terlalu panjang
         });

      // Mengecek apakah status kembalian adalah 400 (bad request)
      expect(result.status).toBe(400);
      // Mengecek apakah error field yang seharusnya ada terdefinisi
      expect(result.body.errors).toBeDefined();
   });
});

describe('GET /api/contacts/:contactId', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts(); // Buat beberapa kontak untuk tes
   });

   afterEach(async () => {
      await removeAllTestContacts(); // Bersihkan semua kontak setelah tes
      await removeTestUser();
   });

   it('should can get contact', async () => {
      const testContact = await getTestContact(); // Ambil salah satu kontak yang dibuat

      const result = await supertest(web)
         .get('/api/contacts/' + testContact.id) // Kirim request GET berdasarkan ID kontak
         .set('Authorization', 'test');

      expect(result.status).toBe(200); // Cek apakah status 200 (berhasil)
      expect(result.body.data.id).toBe(testContact.id); // Cek apakah ID kontak yang diambil benar
      expect(result.body.data.first_name).toBe(testContact.first_name); // Validasi data kontak lainnya
      expect(result.body.data.last_name).toBe(testContact.last_name);
      expect(result.body.data.email).toBe(testContact.email);
      expect(result.body.data.phone).toBe(testContact.phone);
   });

   it('should return 404 if contact id is not found', async () => {
      const testContact = await getTestContact();

      const result = await supertest(web)
         .get('/api/contacts/' + (testContact.id + 1)) // Coba akses kontak dengan ID yang tidak ada
         .set('Authorization', 'test');

      expect(result.status).toBe(404); // Harus mengembalikan 404 (Not Found)
   });
});

// PUT (update) request untuk memperbarui data kontak
describe('PUT /api/contacts/:contactId', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
   });

   afterEach(async () => {
      await removeAllTestContacts();
      await removeTestUser();
   });

   it('should can update exiting contact', async () => {
      const testContact = await getTestContact();

      const result = await supertest(web)
         .put('/api/contacts/' + testContact.id)
         .set('Authorization', 'test')
         .send({
            first_name: 'Fajar',
            last_name: 'Amir',
            email: 'fajar@gmail.com',
            phone: '084388884'
         });

      // Pastikan respons menunjukkan pembaruan berhasil
      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testContact.id); // Cek apakah ID tetap sama
      expect(result.body.data.first_name).toBe('Fajar'); // Cek apakah field yang diperbarui benar
      expect(result.body.data.last_name).toBe('Amir');
      expect(result.body.data.email).toBe('fajar@gmail.com');
      expect(result.body.data.phone).toBe('084388884');
   });

   it('should reject if request is invalid', async () => {
      const testContact = await getTestContact();

      const result = await supertest(web)
         .put('/api/contacts/' + testContact.id)
         .set('Authorization', 'test')
         .send({
            first_name: '', // Nama kosong, harusnya tidak boleh
            last_name: '',
            email: 'fajar', // Email tidak valid
            phone: ''
         });

      // Pastikan error dikembalikan karena request tidak valid
      expect(result.status).toBe(400);
   });

   it('should reject if contact is not found', async () => {
      const testContact = await getTestContact();

      const result = await supertest(web)
         .put('/api/contacts/' + (testContact.id + 1)) // Coba update kontak yang tidak ada
         .set('Authorization', 'test')
         .send({
            first_name: 'Fajar',
            last_name: 'Amir',
            email: 'fajar@gmail.com',
            phone: '084388884'
         });

      expect(result.status).toBe(404); // Harusnya error 404 jika kontak tidak ada
   });
});

// DELETE request untuk menghapus kontak
describe('DELETE /api/contacts/:contactId', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
   });

   afterEach(async () => {
      await removeAllTestContacts();
      await removeTestUser();
   });

   it('should can delete contact', async () => {
      let testContact = await getTestContact();
      const result = await supertest(web)
         .delete('/api/contacts/' + testContact.id) // Kirim request DELETE berdasarkan ID
         .set('Authorization', 'test');

      expect(result.status).toBe(200); // Harusnya sukses dengan status 200
      expect(result.body.data).toBe('OK');

      testContact = await getTestContact(); // Cek lagi kontak, harusnya sudah tidak ada
      expect(testContact).toBeNull(); // Harusnya null, karena kontak sudah dihapus
   });

   it('should reject if contact isn not found', async () => {
      let testContact = await getTestContact();
      const result = await supertest(web)
         .delete('/api/contacts/' + (testContact.id + 1)) // Coba hapus kontak yang tidak ada
         .set('Authorization', 'test');

      expect(result.status).toBe(404); // Harusnya 404, karena kontak tidak ditemukan
   });
});

// Tes pencarian kontak
describe('GET /api/contacts', () => {
   beforeEach(async () => {
      await createTestUser();
      await createManyTestContacts(); // Buat beberapa kontak untuk tes pencarian
   });

   afterEach(async () => {
      await removeAllTestContacts();
      await removeTestUser();
   });

   it('should can search without parameter', async () => {
      const result = await supertest(web)
         .get('/api/contacts') // Cari semua kontak tanpa parameter pencarian
         .set('Authorization', 'test');

      // Pastikan respons mengandung 10 kontak (dibatasi per halaman)
      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1); // Pastikan kita di halaman 1
      expect(result.body.paging.total_page).toBe(2); // Total ada 2 halaman
      expect(result.body.paging.total_item).toBe(15); // Total ada 15 kontak
   });
});
