test("truthiness", () => {
   let value = null;
   expect(value).toBeNull();        // Memeriksa apakah value adalah null
   expect(value).not.toBeDefined(); // Memeriksa bahwa value tidak terdefinisi
   expect(value).toBeFalsy();       // Memeriksa apakah value adalah falsy

   value = undefined;
   expect(value).toBeUndefined();   // Memeriksa apakah value adalah undefined
   expect(value).toBeFalsy();       // Memeriksa apakah value adalah falsy

   value = "Fajar";
   expect(value).toBeTruthy();      // Memeriksa apakah value adalah truthy
   expect(value).toBe("Fajar");     // Memeriksa apakah value adalah "Fajar"
});
