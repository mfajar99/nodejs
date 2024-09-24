import { getAllProducts, getProductById } from "../src/database"; // Mengimpor fungsi dari modul database
import { ProductService } from "../src/product-service"; // Mengimpor ProductService

// Memmock modul database
jest.mock("../src/database.js", () => {
   const originalModule = jest.requireActual("../src/database.js"); // Mendapatkan modul asli

   return {
      __esModule: true,
      ...originalModule,
      getAllProducts: jest.fn(), // Memmock hanya fungsi getAllProducts
   };
});

// Menguji fungsi findById dari ProductService (seharusnya gagal)
test.failing('mock modules getProductById', () => {
   ProductService.findById(1); // Memanggil findById tanpa implementasi
});

// Menguji fungsi findAll dari ProductService
test('mock modules getAllProducts', () => {
   const products = [ // Menyiapkan data produk mock
      {
         id: 1,
         name: "Product Mock"
      },
      {
         id: 2,
         name: "Product Mock"
      }
   ];

   // Mengatur implementasi mock untuk getAllProducts
   getAllProducts.mockImplementation(() => {
      return products; // Mengembalikan produk mock
   });

   // Memeriksa apakah findAll mengembalikan produk yang diharapkan
   expect(ProductService.findAll()).toEqual(products);
});
