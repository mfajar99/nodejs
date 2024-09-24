import { sayHelloAsync } from "../src/async";

// Menguji fungsi asinkron sayHelloAsync
test("test async function", async () => {
   // Memanggil sayHelloAsync dengan argumen "Fajar" dan menunggu hasilnya
   const result = await sayHelloAsync("Fajar");

   // Memastikan bahwa hasilnya adalah "Hello Fajar"
   expect(result).toBe("Hello Fajar");
});

// Menguji matcher asinkron
test('test async matchers', async () => {
   // Memastikan bahwa sayHelloAsync dengan argumen "Fajar" menyelesaikan (resolves) dengan "Hello Fajar"
   await expect(sayHelloAsync("Fajar")).resolves.toBe("Hello Fajar");

   // Memastikan bahwa sayHelloAsync tanpa argumen menolak (rejects) dengan pesan "Name is empty"
   await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});
