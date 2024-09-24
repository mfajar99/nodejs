import { getBalance } from "../src/async"; // Mengimpor fungsi getBalance dari file yang relevan

// Pengujian untuk fungsi getBalance dengan memmock fungsi asinkron
test("mock async function", async () => {
   const from = jest.fn(); // Membuat mock function 'from'
   from.mockResolvedValueOnce(1000); // Mengatur nilai yang akan dikembalikan oleh mock function

   // Mengharapkan bahwa getBalance mengembalikan objek dengan nama dan saldo yang benar
   await expect(getBalance("Fajar", from)).resolves.toEqual({
      name: "Fajar",
      balance: 1000
   });

   // Memeriksa bahwa mock function telah dipanggil sekali
   expect(from.mock.calls.length).toBe(1);
   // Memeriksa bahwa nilai yang dikembalikan oleh mock function adalah 1000
   await expect(from.mock.results[0].value).resolves.toBe(1000);
});

// Pengujian yang diharapkan gagal untuk skenario ditolak
test.failing("mock async function rejected", async () => {
   const from = jest.fn(); // Membuat mock function 'from'
   from.mockRejectedValueOnce(new Error("Ups")); // Mengatur agar mock function menolak dengan error

   await getBalance("Fajar", from); // Mengharapkan bahwa ini akan melemparkan error
});

// Pengujian untuk skenario ditolak dengan penyesuaian matcher
test("mock async function error matchers", async () => {
   const from = jest.fn(); // Membuat mock function 'from'
   from.mockRejectedValueOnce("Rejected"); // Mengatur agar mock function menolak dengan pesan tertentu

   // Mengharapkan bahwa getBalance akan menolak dengan pesan yang tepat
   await expect(getBalance("Fajar", from)).rejects.toBe("Rejected");
});
