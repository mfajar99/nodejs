import express from "express";
import request from "supertest";

const app = express();

// Mendefinisikan route GET untuk root ("/")
app.get('/', (req, res) => {
   // Mengalihkan permintaan ke route "/to-next-page"
   res.redirect('/to-next-page');
});

// Tes untuk memeriksa respons redirect
test("Test Response Redirect", async () => {
   // Mengirimkan permintaan GET ke route root ("/")
   const response = await request(app).get("/");

   // Memeriksa bahwa status respons adalah 302 (Found)
   expect(response.status).toBe(302);
   // Memeriksa bahwa header 'location' berisi '/to-next-page'
   expect(response.get('location')).toBe('/to-next-page');
});
