import { sayHelloAsync } from "../src/async";

// Menguji beberapa fungsi asinkron secara bersamaan
test.concurrent("concurrent 1", async () => {
   // Memastikan bahwa sayHelloAsync dengan argumen "Fajar" menyelesaikan (resolves) dengan "Hello Fajar"
   await expect(sayHelloAsync("Fajar")).resolves.toBe("Hello Fajar");
});

test.concurrent("concurrent 2", async () => {
   // Memastikan bahwa sayHelloAsync dengan argumen "Fajar" menyelesaikan (resolves) dengan "Hello Fajar"
   await expect(sayHelloAsync("Fajar")).resolves.toBe("Hello Fajar");
});

test.concurrent("concurrent 3", async () => {
   // Memastikan bahwa sayHelloAsync dengan argumen "Fajar" menyelesaikan (resolves) dengan "Hello Fajar"
   await expect(sayHelloAsync("Fajar")).resolves.toBe("Hello Fajar");
});
