import Redis from "ioredis";

describe('belajar nodejs redis', () => {

   let redis = null;

   // Sebelum setiap pengujian dijalankan, buat koneksi baru ke Redis
   beforeEach(async () => {
      redis = new Redis({
         host: "localhost", // Host Redis yang sedang berjalan (localhost)
         port: 6379,        // Port default Redis
         db: 0              // Menggunakan database Redis nomor 0
      });
   });

   // Setelah setiap pengujian selesai, tutup koneksi Redis
   afterEach(async () => {
      await redis.quit(); // Pastikan koneksi ke Redis tertutup
   });

   // Tes untuk memeriksa apakah Redis dapat merespons perintah PING
   it('should can ping', async () => {
      const pong = await redis.ping();  // Mengirim perintah PING ke Redis
      expect(pong).toBe('PONG');        // Memastikan Redis merespons dengan 'PONG'
   });

   // Tes untuk memeriksa apakah Redis dapat menyimpan dan menghapus data string dengan waktu kadaluarsa
   it('should support string', async () => {
      await redis.setex('name', 3, 'Fajar'); // Menyimpan 'Fajar' ke key 'name', akan hilang setelah 3 detik
      let name = await redis.get('name');    // Mengambil data dari key 'name'
      expect(name).toBe('Fajar');            // Pastikan nilainya adalah 'Fajar'

      // Menunggu selama 3 detik agar data kadaluarsa
      await new Promise(resolve => setTimeout(resolve, 3000));

      name = await redis.get('name');        // Coba ambil lagi setelah 3 detik
      expect(name).toBeNull();               // Pastikan data sudah hilang (karena kadaluarsa)
   });

   // Tes untuk memeriksa apakah Redis dapat bekerja dengan tipe data List
   it('should support list', async () => {

      await redis.del("names"); // Hapus data lama dari key 'names'

      // Menambahkan elemen ke dalam list 'names'
      await redis.rpush('names', "Fajar");
      await redis.rpush('names', "Muhammad");
      await redis.rpush('names', "Amir");

      expect(await redis.llen("names")).toBe(3); // Pastikan panjang list adalah 3

      // Mengambil semua elemen dari list 'names'
      const names = await redis.lrange("names", 0, -1);
      expect(names).toEqual(["Fajar", "Muhammad", "Amir"]); // Memastikan isi list sesuai

      // Menghapus elemen dari list dan memeriksa hasilnya
      expect(await redis.lpop("names")).toBe("Fajar");  // Hapus dan cek elemen pertama (Fajar)
      expect(await redis.rpop("names")).toBe("Amir");   // Hapus dan cek elemen terakhir (Amir)
      expect(await redis.llen("names")).toBe(1);        // Pastikan hanya ada 1 elemen yang tersisa
   });

   // Tes untuk memeriksa apakah Redis dapat bekerja dengan tipe data Set
   it('should support set', async () => {

      await redis.del('names'); // Hapus set 'names' jika ada

      // Menambahkan elemen ke dalam set 'names' (set tidak menyimpan elemen duplikat)
      await redis.sadd('names', 'Fajar');
      await redis.sadd('names', 'Muhammad');
      await redis.sadd('names', 'Amir');

      expect(await redis.scard('names')).toBe(3); // Pastikan ada 3 elemen unik dalam set

      // Mengambil semua elemen dari set 'names'
      const names = await redis.smembers('names');
      expect(names).toEqual(['Fajar', 'Muhammad', 'Amir']); // Memastikan isi set sesuai
   });

   // Tes untuk memeriksa apakah Redis dapat bekerja dengan Sorted Set
   it('should support sorted set', async () => {

      await redis.del('names'); // Hapus sorted set 'names'

      // Menambahkan elemen ke dalam sorted set dengan skor tertentu
      await redis.zadd('names', 100, 'Fajar');
      await redis.zadd('names', 85, 'Budi');
      await redis.zadd('names', 95, 'Andi');

      expect(await redis.zcard('names')).toBe(3); // Pastikan ada 3 elemen dalam sorted set

      // Mengambil elemen dalam urutan skor dari yang terkecil hingga terbesar
      const names = await redis.zrange('names', 0, -1);
      expect(names).toEqual(['Budi', 'Andi', 'Fajar']); // Memastikan urutannya benar

      // Menghapus elemen dengan skor tertinggi dan memeriksa hasilnya
      expect(await redis.zpopmax('names')).toEqual(['Fajar', '100']);
      expect(await redis.zpopmax('names')).toEqual(['Andi', '95']);
      expect(await redis.zpopmax('names')).toEqual(['Budi', '85']);
   });

   // Tes untuk memeriksa apakah Redis dapat bekerja dengan tipe data Hash
   it('should support hash', async () => {

      await redis.del('user:1'); // Hapus hash 'user:1' jika ada

      // Menambahkan field dan value ke hash 'user:1'
      await redis.hset('user:1', {
         'id': '1',
         'name': 'Fajar',
         'email': 'fajar@gmail.com'
      });

      // Mengambil seluruh hash 'user:1'
      const user = await redis.hgetall('user:1');
      expect(user).toEqual({
         'id': '1',
         'name': 'Fajar',
         'email': 'fajar@gmail.com'
      }); // Memastikan isi hash sesuai
   });

   // Tes untuk memeriksa apakah Redis mendukung operasi Geo
   it('should support geo point', async () => {
      await redis.geoadd('sellers', 106.822673, -6.177616, "Toko A"); // Menambahkan titik geografis
      await redis.geoadd('sellers', 106.820646, -6.175366, "Toko B");

      const distance = await redis.geodist('sellers', 'Toko A', 'Toko B', "KM");
      expect(distance).toBe(String(0.3361)); // Memeriksa jarak antar titik dalam kilometer

      // Mencari titik-titik dalam radius 5 km dari lokasi tertentu
      const result = await redis.geosearch('sellers', 'fromlonlat', 106.822443, -6.176966, 'byradius', 5, 'km');
      expect(result).toEqual(['Toko A', 'Toko B']); // Memastikan hasil pencarian sesuai
   });

   // Tes untuk memeriksa apakah Redis mendukung HyperLogLog
   it('should support hyper log log', async () => {
      await redis.pfadd('visitors', 'fajar', 'muhammad', 'amir'); // Menambahkan elemen ke HyperLogLog
      await redis.pfadd('visitors', 'salam', 'andi');
      await redis.pfadd('visitors', 'budi', 'andi');

      const total = await redis.pfcount('visitors');
      expect(total).toBe(6); // Memeriksa perkiraan jumlah elemen unik (approximation)
   });

   // Tes untuk memeriksa apakah Redis mendukung Pipeline
   it('should support pipeline', async () => {
      const pipeline = redis.pipeline(); // Membuat pipeline untuk mengirim perintah secara batch

      pipeline.setex('name', 2, 'Fajar'); // Set key 'name' dengan kadaluarsa 2 detik
      pipeline.setex('address', 2, 'Indonesia');

      await pipeline.exec(); // Eksekusi semua perintah dalam pipeline

      expect(await redis.get('name')).toBe('Fajar');
      expect(await redis.get('address')).toBe('Indonesia');
   });

   // Tes untuk memeriksa apakah Redis mendukung Transaksi (MULTI)
   it('should support transaction', async () => {
      const transaction = redis.multi(); // Membuat transaksi Redis

      transaction.setex('name', 2, 'Fajar'); // Set key 'name' dengan kadaluarsa 2 detik
      transaction.setex('address', 2, 'Indonesia');

      await transaction.exec(); // Eksekusi semua perintah dalam transaksi

      expect(await redis.get('name')).toBe('Fajar');
      expect(await redis.get('address')).toBe('Indonesia');
   });

   // Tes untuk memeriksa apakah Redis mendukung Stream (XADD)
   it('should support publish to stream', async () => {
      for (let i = 0; i < 10; i++) {
         // Menambahkan data ke stream 'members' dengan field dan value
         await redis.xadd('members', '*', 'name', `Fajar ${i}`, 'address', 'Indonesia');
      }
   });

   // Tes untuk memeriksa apakah Redis mendukung Consumer Group pada Stream
   it('should support create consumer end consumer group', async () => {
      await redis.xgroup('CREATE', 'members', 'group-1', '0'); // Membuat consumer group baru
      await redis.xgroup('CREATECONSUMER', 'members', 'group-1', 'consumer-1'); // Membuat consumer pertama
      await redis.xgroup('CREATECONSUMER', 'members', 'group-1', 'consumer-2'); // Membuat consumer kedua
   });

   // Tes untuk memeriksa konsumsi data dari stream oleh consumer group
   it('should can consumer stream', async () => {
      // Membaca data dari stream 'members' menggunakan consumer group
      const result = await redis.xreadgroup('GROUP', 'group-1', 'consumer-1', 'COUNT', 2, 'BLOCK', 3000, 'STREAMS', 'members', '>');
      expect(result).not.toBeNull(); // Pastikan data berhasil dibaca dari stream

      console.log(JSON.stringify(result, null, 2)); // Menampilkan hasil konsumsi stream
   });

   // Tes untuk memeriksa subscribe ke channel Pub/Sub di Redis
   it('should can subscribe to pubsub', async () => {
      redis.subscribe('channel-1'); // Subscribe ke channel 'channel-1'

      // Ketika ada pesan baru di channel, Redis akan memanggil fungsi ini
      redis.on('message', (channel, message) => {
         console.log(`Receive message from channel ${channel} with message ${message}`);
      });

      // Tunggu selama 60 detik agar ada waktu untuk pesan diterima
      await new Promise(resolve => setTimeout(resolve, 60000));
   }, 60000); // Set timeout 60 detik untuk pengujian ini

   // Tes untuk memeriksa publish ke channel Pub/Sub di Redis
   it('should can publish to pubsub', async () => {
      for (let i = 0; i < 10; i++) {
         // Mempublikasikan pesan ke channel 'channel-1'
         await redis.publish('channel-1', `Hello World ${i}`);
      }
   });
});