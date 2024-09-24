import { callMe, MyException } from "../src/exception"; // Mengimpor fungsi dan kelas exception

// Menguji apakah fungsi callMe melemparkan pengecualian ketika dipanggil dengan nama "Fajar"
test("exception", () => {
   // Mengharapkan bahwa memanggil callMe dengan "Fajar" akan melempar pengecualian
   expect(() => callMe("Fajar")).toThrow();

   // Mengharapkan bahwa pengecualian yang dilempar adalah MyException
   expect(() => callMe("Fajar")).toThrow(MyException);

   // Mengharapkan bahwa pengecualian yang dilempar berisi pesan tertentu
   expect(() => callMe("Fajar")).toThrow("Ups my exception happens");
});

// Menguji bahwa tidak ada pengecualian yang dilempar ketika dipanggil dengan nama "Budi"
test("exception not happens", () => {
   // Mengharapkan bahwa memanggil callMe dengan "Budi" akan mengembalikan "OK"
   expect(callMe("Budi")).toBe("OK");
});
