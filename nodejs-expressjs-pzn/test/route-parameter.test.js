import express from "express";
import request from "supertest";

// Membuat instance aplikasi Express
const app = express();

// Mendefinisikan route GET dengan parameter dinamis untuk produk
app.get('/products/:id', (req, res) => {
   // Mengambil parameter 'id' dari URL
   const idProduct = req.params.id;
   // Mengirimkan respons yang menyertakan parameter 'id'
   res.send(`Product: ${idProduct}`);
});

// Mendefinisikan route GET dengan parameter dinamis dan regex untuk kategori
app.get('/categories/:id(\\d+)', (req, res) => {
   // Mengambil parameter 'id' dari URL
   const idCategory = req.params.id;
   // Mengirimkan respons yang menyertakan parameter 'id'
   res.send(`Category: ${idCategory}`);
});

// Mendefinisikan route GET dengan lebih dari satu parameter dinamis
// app.get('/seller/:idSeller/products/:idProduct', (req, res) => {
//    // Mengambil parameter 'idSeller' dan 'idProduct' dari URL
//    const idSeller = req.params.idSeller;
//    const idProduct = req.params.idProduct;
//    // Mengirimkan respons yang menyertakan kedua parameter (catatan: `idCategory` seharusnya `idProduct`)
//    res.send(`Seller: ${idSeller}, Product: ${idProduct}`);
// });

// Tes untuk memeriksa route dengan parameter
test('Test Route Parameter', async () => {
   // Mengirimkan permintaan GET dengan parameter dinamis untuk produk
   let response = await request(app).get('/products/fajar');
   // Memeriksa bahwa responsnya sesuai dengan parameter yang diberikan
   expect(response.text).toBe('Product: fajar');

   // Mengirimkan permintaan GET dengan parameter dinamis untuk produk
   response = await request(app).get('/products/salah');
   // Memeriksa bahwa responsnya sesuai dengan parameter yang diberikan
   expect(response.text).toBe('Product: salah');

   // Mengirimkan permintaan GET dengan parameter yang memenuhi regex untuk kategori
   response = await request(app).get('/categories/1234');
   // Memeriksa bahwa responsnya sesuai dengan parameter yang diberikan
   expect(response.text).toBe('Category: 1234');

   // Mengirimkan permintaan GET dengan parameter yang tidak memenuhi regex untuk kategori
   response = await request(app).get('/categories/salah');
   // Memeriksa bahwa status respons adalah 404 karena URL tidak cocok dengan regex yang ditentukan
   expect(response.status).toBe(404);

   // Mengirimkan permintaan GET dengan dua parameter dinamis untuk seller dan produk
   response = await request(app).get('/seller/123/products/456');
   // Memeriksa bahwa responsnya sesuai dengan parameter yang diberikan
   expect(response.text).toBe('Seller: 123, Product: 456');
});
