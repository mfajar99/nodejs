export class TodoListService {
   // Daftar tugas (todo list) yang diinisialisasi dengan beberapa nama
   todoList = ["Fajar", "Muhammad", "Amir"];

   // Mengubah daftar tugas menjadi format JSON
   getJsonTodoList() {
      return JSON.stringify({
         code: 200, // Kode status HTTP
         status: "OK", // Status
         data: this.todoList.map((value, index) => {
            // Mengubah setiap item dalam todoList menjadi objek dengan id dan nama todo
            return {
               id: index, // Menyimpan index sebagai id
               todo: value // Menyimpan nama todo
            };
         })
      });
   }

   // Menangani permintaan GET untuk mendapatkan daftar tugas
   getTodoList(request, response) {
      response.write(this.getJsonTodoList()); // Menulis data JSON ke respons
      response.end(); // Menutup respons
   }

   // Menangani permintaan POST untuk membuat tugas baru
   createTodo(request, response) {
      // Menambahkan pendengar untuk menangani data yang diterima
      request.addListener("data", (data) => {
         const body = JSON.parse(data.toString()); // Mengurai data JSON yang diterima
         this.todoList.push(body.todo); // Menambahkan tugas baru ke todoList

         response.write(this.getJsonTodoList()); // Mengembalikan daftar tugas yang diperbarui
         response.end(); // Menutup respons
      });
   }

   // Menangani permintaan PUT untuk memperbarui tugas yang ada
   updateTodo(request, response) {
      request.addListener("data", (data) => {
         const body = JSON.parse(data.toString()); // Mengurai data JSON yang diterima
         if (this.todoList[body.id]) { // Memeriksa apakah tugas dengan id tersebut ada
            this.todoList[body.id] = body.todo; // Memperbarui tugas
         }

         response.write(this.getJsonTodoList()); // Mengembalikan daftar tugas yang diperbarui
         response.end(); // Menutup respons
      });
   }

   // Menangani permintaan DELETE untuk menghapus tugas
   deleteTodo(request, response) {
      request.addListener("data", (data) => {
         const body = JSON.parse(data.toString()); // Mengurai data JSON yang diterima
         if (this.todoList[body.id]) { // Memeriksa apakah tugas dengan id tersebut ada
            this.todoList.splice(body.id, 1); // Menghapus tugas
         }

         response.write(this.getJsonTodoList()); // Mengembalikan daftar tugas yang diperbarui
         response.end(); // Menutup respons
      });
   }
}
