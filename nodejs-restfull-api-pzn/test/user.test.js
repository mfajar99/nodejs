import supertest from "supertest";
import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

/**
 * Test untuk endpoint POST /api/users, yang digunakan untuk registrasi user baru.
 */
describe('POST /api/users', () => {

   // Setelah setiap tes selesai, user uji coba dihapus dari database
   afterEach(async () => {
      await removeTestUser();
   });

   /**
    * Tes untuk memastikan registrasi user baru berhasil.
    */
   it('should can registers new user', async () => {
      const result = await supertest(web)
         .post('/api/users')
         .send({
            username: 'test',
            password: 'secret',
            name: 'test'
         });

      expect(result.status).toBe(200); // Status 200 menandakan sukses
      expect(result.body.data.username).toBe('test');
      expect(result.body.data.name).toBe('test');
      expect(result.body.data.password).toBeUndefined(); // Password tidak dikembalikan dalam respon
   });

   /**
    * Tes untuk memastikan permintaan dengan data tidak valid ditolak.
    */
   it('should reject if request is invalid', async () => {
      const result = await supertest(web)
         .post('/api/users')
         .send({
            username: '',
            password: '',
            name: ''
         });

      logger.info(result.body);

      expect(result.status).toBe(400); // Status 400 menandakan permintaan buruk (bad request)
      expect(result.body.errors).toBeDefined(); // Error harus ada
   });

   /**
    * Tes untuk memastikan registrasi user yang sudah ada ditolak.
    */
   it('should reject if username already registered', async () => {
      // Registrasi user pertama
      let result = await supertest(web)
         .post('/api/users')
         .send({
            username: 'test',
            password: 'secret',
            name: 'test'
         });

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe('test');
      expect(result.body.data.name).toBe('test');
      expect(result.body.data.password).toBeUndefined();

      // Registrasi user dengan username yang sama
      result = await supertest(web)
         .post('/api/users')
         .send({
            username: 'test',
            password: 'secret',
            name: 'test'
         });

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined(); // Registrasi harus gagal karena username sudah ada
   });
});

/**
 * Test untuk endpoint POST /api/users/login, yang digunakan untuk login user.
 */
describe('POST /api/users/login', () => {
   // Sebelum setiap tes, buat user uji coba
   beforeEach(async () => {
      await createTestUser();
   });

   // Setelah setiap tes, hapus user uji coba
   afterEach(async () => {
      await removeTestUser();
   });

   /**
    * Tes untuk memastikan login berhasil dengan kredensial yang benar.
    */
   it('should can login', async () => {
      const result = await supertest(web)
         .post('/api/users/login')
         .send({
            username: 'test',
            password: 'secret'
         });
      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.token).toBeDefined(); // Token harus dikembalikan
      expect(result.body.data.token).not.toBe('test'); // Token harus berbeda dari token default
   });

   /**
    * Tes untuk memastikan login ditolak jika permintaan tidak valid.
    */
   it('should reject login if request is invalid', async () => {
      const result = await supertest(web)
         .post('/api/users/login')
         .send({
            username: '',
            password: ''
         });
      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined(); // Error harus ada
   });

   /**
    * Tes untuk memastikan login ditolak jika password salah.
    */
   it('should reject login if password is wrong ', async () => {
      const result = await supertest(web)
         .post('/api/users/login')
         .send({
            username: 'test',
            password: 'wrong'
         });
      logger.info(result.body);

      expect(result.status).toBe(401); // Status 401 untuk unauthorized
      expect(result.body.errors).toBeDefined();
   });

   /**
    * Tes untuk memastikan login ditolak jika username salah.
    */
   it('should reject login if username is wrong ', async () => {
      const result = await supertest(web)
         .post('/api/users/login')
         .send({
            username: 'wrong',
            password: 'wrong'
         });
      logger.info(result.body);

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
   });
});

/**
 * Test untuk endpoint GET /api/users/current, yang digunakan untuk mengambil data user yang sedang login.
 */
describe('GET /api/users/current', () => {
   beforeEach(async () => {
      await createTestUser();
   });

   afterEach(async () => {
      await removeTestUser();
   });

   /**
    * Tes untuk memastikan data user yang sedang login bisa didapatkan.
    */
   it('should can get current user', async () => {
      const result = await supertest(web)
         .get('/api/users/current')
         .set('Authorization', 'test'); // Set token 'test' untuk otorisasi

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe('test');
      expect(result.body.data.name).toBe('test');
   });

   /**
    * Tes untuk memastikan permintaan ditolak jika token tidak valid.
    */
   it('should reject if token is invalid', async () => {
      const result = await supertest(web)
         .get('/api/users/current')
         .set('Authorization', 'wrong'); // Token salah

      logger.info(result.body);

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
   });
});

/**
 * Test untuk endpoint PATCH /api/users/current, yang digunakan untuk memperbarui data user.
 */
describe('PATCH /api/users/current', () => {
   beforeEach(async () => {
      await createTestUser();
   });

   afterEach(async () => {
      await removeTestUser();
   });

   /**
    * Tes untuk memperbarui nama dan password user.
    */
   it('should can update user', async () => {
      const result = await supertest(web)
         .patch('/api/users/current')
         .set('Authorization', 'test')
         .send({
            name: "Fajar",
            password: "rahasialagi"
         });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe('test');
      expect(result.body.data.name).toBe('Fajar');

      const user = await getTestUser();
      expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true); // Password baru harus benar
   });

   /**
    * Tes untuk memperbarui hanya nama user.
    */
   it('should can update user name', async () => {
      const result = await supertest(web)
         .patch('/api/users/current')
         .set('Authorization', 'test')
         .send({
            name: "Fajar"
         });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe('test');
      expect(result.body.data.name).toBe('Fajar');
   });

   /**
    * Tes untuk memperbarui hanya password user.
    */
   it('should can update user password', async () => {
      const result = await supertest(web)
         .patch('/api/users/current')
         .set('Authorization', 'test')
         .send({
            password: "rahasialagi"
         });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe('test');
      expect(result.body.data.name).toBe('test');

      const user = await getTestUser();
      expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true); // Password baru harus benar
   });

   /**
    * Tes untuk memastikan pembaruan ditolak jika token tidak valid.
    */
   it('should reject if request is not valid', async () => {
      const result = await supertest(web)
         .patch('/api/users/current')
         .set('Authorization', 'wrong') // Token salah
         .send({});

      expect(result.status).toBe(401);
   });
});

/**
 * Test untuk endpoint DELETE /api/users/logout, yang digunakan untuk logout user.
 */
describe('DELETE /api/users/logout', () => {
   beforeEach(async () => {
      await createTestUser();
   });

   afterEach(async () => {
      await removeTestUser();
   });

   /**
    * Tes untuk memastikan user berhasil logout.
    */
   it('should can logout', async () => {
      const result = await supertest(web)
         .delete('/api/users/logout')
         .set('Authorization', 'test'); // Token yang valid

      expect(result.status).toBe(200);
      expect(result.body.data).toBe('OK'); // Respon harus OK

      const user = await getTestUser();
      expect(user.token).toBeNull(); // Token user harus kosong setelah logout
   });

   /**
    * Tes untuk memastikan logout ditolak jika token tidak valid.
    */
   it('should reject logout if token is invalid', async () => {
      const result = await supertest(web)
         .delete('/api/users/logout')
         .set('Authorization', 'wrong'); // Token salah

      expect(result.status).toBe(401);
   });
});
