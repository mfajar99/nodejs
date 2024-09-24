import http from "http"; // Mengimpor modul http untuk membuat server
import { TodoListService } from "./todolist-service.mjs"; // Mengimpor TodoListService dari file lain

// Membuat instance dari TodoListService
const service = new TodoListService();

// Membuat server HTTP
const server = http.createServer((request, response) => {
   // Mengatur header respons agar tipe kontennya adalah JSON
   response.setHeader("Content-Type", "application/json");

   // Memeriksa metode HTTP yang digunakan dalam permintaan
   if (request.method === "GET") {
      // Jika metode adalah GET, panggil metode getTodoList dari service
      service.getTodoList(request, response);
   } else if (request.method === "POST") {
      // Jika metode adalah POST, panggil metode createTodo dari service
      service.createTodo(request, response);
   } else if (request.method === "PUT") {
      // Jika metode adalah PUT, panggil metode updateTodo dari service
      service.updateTodo(request, response);
   } else if (request.method === "DELETE") {
      // Jika metode adalah DELETE, panggil metode deleteTodo dari service
      service.deleteTodo(request, response);
   } else {
      // Jika metode tidak dikenali, kembalikan kode status 405 (Method Not Allowed)
      response.writeHead(405, { "Content-Type": "text/plain" });
      response.end("Method Not Allowed");
   }
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
   console.log("Server is listening on port 3000");
});
