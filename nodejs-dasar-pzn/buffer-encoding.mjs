// Membuat buffer dari string "Fajar Muhammad Amir" dengan encoding "utf8"
const buffer = Buffer.from("Fajar Muhammad Amir", "utf8");

// Menampilkan buffer sebagai string dengan encoding default ("utf8")
console.info(buffer.toString()); // Output: Fajar Muhammad Amir

// Menampilkan buffer sebagai string dengan encoding "hex"
console.info(buffer.toString("hex")); // Output: 466a617269205d6d616d6d616420416d697220
// Ini adalah representasi heksadesimal dari buffer

// Menampilkan buffer sebagai string dengan encoding "base64"
console.info(buffer.toString("base64")); // Output: RmFqYXIgTXVoYW1tYWQgQW1pcg==
// Ini adalah representasi base64 dari buffer

// Membuat buffer dari string "RmFqYXIgTXVoYW1tYWQgQW1pcg==" dengan encoding "base64"
const bufferBase64 = Buffer.from("RmFqYXIgTXVoYW1tYWQgQW1pcg==", "base64");

// Menampilkan buffer hasil decoding base64 sebagai string dengan encoding "utf8"
console.info(bufferBase64.toString("utf8")); // Output: Fajar Muhammad Amir
