import { sumAll } from "../src/sum.js"; // Mengimpor fungsi sumAll dari file yang relevan

// Mengelompokkan pengujian untuk fungsi sumAll
describe("when call sumAll()", () => {
   // Menguji bahwa sumAll mengembalikan 30 untuk parameter [10, 10, 10]
   it("should get 30 with parameter [10, 10, 10]", () => {
      expect(sumAll([10, 10, 10])).toBe(30);
   });

   // Menguji bahwa sumAll mengembalikan 50 untuk parameter [10, 10, 10, 10, 10]
   it("should get 50 with parameter [10, 10, 10, 10, 10]", () => {
      expect(sumAll([10, 10, 10, 10, 10])).toBe(50);
   });
});
