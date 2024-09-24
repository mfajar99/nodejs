import {
   createTestAddress, createTestContacts, createTestUser,
   getTestAddress, getTestContact,
   removeAllTestAddresses, removeAllTestContacts, removeTestUser
} from "./test-util.js"; // Mengimpor fungsi utilitas untuk membuat, mengambil, dan menghapus data uji
import supertest from "supertest"; // Mengimpor supertest untuk melakukan pengujian HTTP
import { web } from "../src/application/web.js"; // Mengimpor server aplikasi web untuk pengujian

// Menguji endpoint POST untuk membuat alamat baru terkait kontak
describe('POST /api/contacts/:contactId/addresses', () => {
   // Sebelum setiap pengujian, buat pengguna dan kontak uji
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
   });

   // Setelah setiap pengujian, hapus semua data uji
   afterEach(async () => {
      await removeAllTestAddresses();
      await removeAllTestContacts();
      await removeTestUser();
   });

   // Pengujian untuk memastikan pembuatan alamat berhasil
   it('should can create new address', async () => {
      const testContact = await getTestContact(); // Ambil kontak uji

      const result = await supertest(web) // Kirim permintaan POST untuk membuat alamat baru
         .post('/api/contacts/' + testContact.id + '/addresses')
         .set('Authorization', 'test') // Menambahkan header Authorization
         .send({
            street: 'street test', city: 'city test', province: 'province test',
            country: 'indonesia', postal_code: '213232'
         });

      // Mengecek apakah status respons adalah 200 (berhasil)
      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined(); // Pastikan ID alamat dibuat
      expect(result.body.data.street).toBe('street test'); // Memastikan data yang dikembalikan sesuai
   });

   // Pengujian untuk memastikan penolakan jika data alamat tidak valid
   it('should reject if address request is invalid', async () => {
      const testContact = await getTestContact(); // Ambil kontak uji

      const result = await supertest(web)
         .post('/api/contacts/' + testContact.id + '/addresses')
         .set('Authorization', 'test')
         .send({
            street: 'street test', city: 'city test', province: 'province test',
            country: '', postal_code: '' // Data yang tidak valid
         });

      // Memastikan respons status 400 untuk validasi gagal
      expect(result.status).toBe(400);
   });

   // Pengujian untuk memastikan penolakan jika kontak tidak ditemukan
   it('should reject if contact is not found', async () => {
      const testContact = await getTestContact(); // Ambil kontak uji

      const result = await supertest(web)
         .post('/api/contacts/' + (testContact.id + 1) + '/addresses') // Menggunakan ID kontak yang salah
         .set('Authorization', 'test')
         .send({
            street: 'street test', city: 'city test', province: 'province test',
            country: '', postal_code: ''
         });

      // Memastikan status 404 karena kontak tidak ditemukan
      expect(result.status).toBe(404);
   });
});

// Menguji endpoint GET untuk mengambil detail alamat berdasarkan contactId dan addressId
describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
      await createTestAddress(); // Membuat alamat uji
   });

   afterEach(async () => {
      await removeAllTestAddresses();
      await removeAllTestContacts();
      await removeTestUser();
   });

   // Pengujian untuk memastikan pengambilan alamat berhasil
   it('should can get contact', async () => {
      const testContact = await getTestContact(); // Ambil kontak uji
      const testAddress = await getTestAddress(); // Ambil alamat uji

      const result = await supertest(web)
         .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
         .set('Authorization', 'test');

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined(); // Memastikan data alamat sesuai
   });

   // Pengujian untuk memastikan penolakan jika kontak tidak ditemukan
   it('should reject if contact is not found', async () => {
      const testContact = await getTestContact(); // Ambil kontak uji
      const testAddress = await getTestAddress(); // Ambil alamat uji

      const result = await supertest(web)
         .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id) // ID kontak salah
         .set('Authorization', 'test');

      expect(result.status).toBe(404);
   });

   // Pengujian untuk memastikan penolakan jika alamat tidak ditemukan
   it('should reject if address is not found', async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web)
         .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1)) // ID alamat salah
         .set('Authorization', 'test');

      expect(result.status).toBe(404);
   });
});

// Menguji endpoint PUT untuk memperbarui alamat
describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
      await createTestAddress();
   });

   afterEach(async () => {
      await removeAllTestAddresses();
      await removeAllTestContacts();
      await removeTestUser();
   });

   // Pengujian untuk memastikan pembaruan alamat berhasil
   it('should can update address', async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web)
         .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id) // Memperbarui data alamat
         .set('Authorization', 'test')
         .send({
            street: 'street', city: 'city', province: 'province',
            country: 'indonesia', postal_code: '1111'
         });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testAddress.id); // Memastikan ID sesuai
   });

   // Pengujian untuk memastikan penolakan jika request tidak valid
   it('should reject if request is not found', async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web)
         .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id) // Data tidak valid
         .set('Authorization', 'test')
         .send({
            street: 'street', city: 'city', province: 'province',
            country: '', postal_code: '' // Kosong (tidak valid)
         });

      expect(result.status).toBe(400);
   });

   // Pengujian untuk memastikan penolakan jika alamat tidak ditemukan
   it('should reject if address is not found', async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web)
         .put('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1)) // ID alamat salah
         .set('Authorization', 'test')
         .send({
            street: 'street', city: 'city', province: 'province',
            country: 'indonesia', postal_code: '34342'
         });

      expect(result.status).toBe(404);
   });
});

// Menguji endpoint DELETE untuk menghapus alamat
describe('DELETE /api/contacts/:contactId/addressId', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
      await createTestAddress();
   });

   afterEach(async () => {
      await removeAllTestAddresses();
      await removeAllTestContacts();
      await removeTestUser();
   });

   // Pengujian untuk memastikan penghapusan alamat berhasil
   it('should can remove address', async () => {
      const testContact = await getTestContact();
      let testAddress = await getTestAddress();

      const result = await supertest(web)
         .delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id) // Menghapus alamat
         .set('Authorization', 'test');

      expect(result.status).toBe(200);
      expect(result.body.data).toBe('OK'); // Memastikan respons OK

      testAddress = await getTestAddress(); // Memastikan alamat benar-benar terhapus
      expect(testAddress).toBeNull();
   });
});

// Menguji endpoint GET untuk mendapatkan daftar alamat
describe('GET /api/contacts/:contactId/addresses', () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContacts();
      await createTestAddress();
   });

   afterEach(async () => {
      await removeAllTestAddresses();
      await removeAllTestContacts();
      await removeTestUser();
   });

   // Pengujian untuk memastikan pengambilan daftar alamat berhasil
   it('should can list addresses', async () => {
      const testContact = await getTestContact();

      const result = await supertest(web)
         .get('/api/contacts/' + testContact.id + '/addresses') // Mengambil daftar alamat
         .set('Authorization', 'test');

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(1); // Memastikan ada 1 alamat
   });
});
