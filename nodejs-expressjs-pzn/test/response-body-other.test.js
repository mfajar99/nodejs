import express from "express";
import request from "supertest";
import path from "path";
import fs from "fs";

const app = express();

// Mendefinisikan route GET untuk root ("/") yang mengirimkan file
app.get('/', (req, res) => {
   // Mengirimkan file "contoh.txt" dari direktori yang sama dengan skrip ini
   res.sendFile(path.join(__dirname, "contoh.txt"));
});

// Tes untuk memeriksa pengiriman file
test('Test Response Send File', async () => {
   // Mengirimkan permintaan GET ke route root ("/")
   const response = await request(app).get("/");

   // Memeriksa bahwa respons berisi teks "This is sample text"
   expect(response.text).toContain("This is sample text");
});
