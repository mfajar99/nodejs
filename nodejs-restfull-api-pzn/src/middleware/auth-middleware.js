import { prismaClient } from "../application/database.js"; // Mengimpor prismaClient untuk berinteraksi dengan database.

// Middleware untuk otentikasi pengguna berdasarkan token.
export const authMiddleware = async (req, res, next) => {
   // Mengambil token dari header Authorization pada request.
   const token = req.get('Authorization');

   // Jika tidak ada token yang ditemukan di header, kembalikan respons status 401 (Unauthorized).
   if (!token) {
      return res.status(401).json({
         errors: 'Unauthorized' // Mengirimkan pesan error "Unauthorized" ke klien.
      });
   }

   // Mencari pengguna di database berdasarkan token yang diberikan.
   const user = await prismaClient.user.findFirst({
      where: { token: token } // Cari pengguna yang memiliki token yang cocok.
   });

   // Jika pengguna dengan token tersebut tidak ditemukan, kembalikan respons status 401 (Unauthorized).
   if (!user) {
      return res.status(401).json({
         errors: 'Unauthorized' // Mengirimkan pesan error "Unauthorized" ke klien.
      });
   }

   // Jika pengguna ditemukan, simpan data pengguna di req.user agar bisa diakses di route berikutnya.
   req.user = user;

   // Panggil next() untuk melanjutkan ke middleware atau route handler berikutnya.
   next();
};
