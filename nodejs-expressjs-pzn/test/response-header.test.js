import express from "express";
import request from "supertest";

const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Menetapkan beberapa header pada respons
   res.set({
      "X-Powered-By": "Muhammad Fajar Amir",
      "X-Author": "Fajar"
   });
   // Mengirimkan respons dengan teks "Hello Response"
   res.send(`Hello Response`);
});

// Tes untuk memeriksa respons
test("Test Response", async () => {
   // Mengirimkan permintaan GET ke route root ("/")
   const response = await request(app).get("/");

   // Memeriksa bahwa teks respons adalah "Hello Response"
   expect(response.text).toBe("Hello Response");
   // Memeriksa bahwa header "X-Powered-By" berisi "Muhammad Fajar Amir"
   expect(response.get("X-Powered-By")).toBe("Muhammad Fajar Amir");
   // Memeriksa bahwa header "X-Author" berisi "Fajar"
   expect(response.get("X-Author")).toBe("Fajar");
});
