import { getAllProducts, getProductById } from "../src/database"; // Mengimpor fungsi dari modul database
import { ProductService } from "../src/product-service"; // Mengimpor ProductService

// Memock modul database
jest.mock("../src/database.js");

// Menguji fungsi findById pada ProductService
test('mock modules getProductById', () => {
   // Mengatur implementasi mock untuk getProductById
   getProductById.mockImplementation((id) => {
      return {
         id: id, // Mengembalikan objek produk dengan id yang diberikan
         name: "Product Mock" // Mengembalikan nama produk mock
      }
   });

   const product = ProductService.findById(1); // Memanggil findById dengan id 1

   // Memeriksa apakah produk yang dikembalikan sesuai dengan harapan
   expect(product).toEqual({
      id: 1,
      name: "Product Mock"
   });
});

// Menguji fungsi findAll pada ProductService
test('mock modules getAllProducts', () => {
   const products = [ // Array produk mock
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
      return products; // Mengembalikan array produk mock
   });

   // Memeriksa apakah findAll mengembalikan produk yang sesuai
   expect(ProductService.findAll()).toEqual(products);
});
