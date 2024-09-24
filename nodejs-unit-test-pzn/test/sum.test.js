import { sum, sumAll } from "../src/sum";

// Pengujian untuk fungsi sum
test("test sum function 1", () => {
   const result = sum(1, 2);
   expect(result).toBe(3);
});

test("test sum function 2", () => {
   const result = sum(1, 2);
   expect(result).toBe(3);
});

test("test sum function 3", () => {
   const result = sum(1, 2);
   expect(result).toBe(3);
});

// Pengujian untuk fungsi sumAll
test("test sum all", () => {
   const numbers = [1, 1, 1, 1, 1];
   expect(sumAll(numbers)).toBe(5);
});
