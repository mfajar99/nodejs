import { sayHello } from "../src/sayHello"; // Mengimpor fungsi sayHello dari file yang relevan

// Menguji keberhasilan fungsi sayHello
test("sayHello success", () => {
   // Mengharapkan bahwa memanggil sayHello dengan argumen "Fajar" akan mengembalikan "Hello Fajar"
   expect(sayHello("Fajar")).toBe("Hello Fajar");
});

// Menguji bahwa fungsi sayHello gagal saat diberikan argumen null
test.failing("sayHello error", () => {
   // Memanggil sayHello dengan argumen null; pengujian ini diharapkan gagal
   sayHello(null);
});

// Menguji fungsi sayHello untuk memastikan bahwa ia melemparkan pengecualian saat diberikan argumen null
test("sayHello error matcher", () => {
   // Mengharapkan bahwa memanggil sayHello dengan argumen null akan melempar pengecualian
   expect(() => sayHello(null)).toThrow();
});
