// Menguji pengujian menggunakan Jest
test('test 1', () => console.log("test 1")); // Pengujian ini akan dicetak ke konsol
test('test 2', () => console.log("test 2")); // Pengujian ini akan dicetak ke konsol
test.only('test 3', () => console.log("test 3")); // Hanya pengujian ini yang akan dijalankan
test('test 4', () => console.log("test 4")); // Pengujian ini tidak akan dijalankan
test('test 5', () => console.log("test 5")); // Pengujian ini tidak akan dijalankan
