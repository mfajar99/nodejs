import Mustache from "mustache";
import fs from "fs/promises";
import { title } from "process";

// proses compilasi ketika melakukan render
test("Menggunakan Mustache", () => {
   const data = Mustache.render("Hello {{ name }}", { name: "Fajar" });
   // Hello Fajar
   expect(data).toBe("Hello Fajar");
});

// ketika render hanya mengambil data compilasi di memory dan tidak perlu melakukan kompilasi lagi
test("Menggunakan Mustache Cache", () => {
   Mustache.parse("Hello {{ name }}");

   const data = Mustache.render("Hello {{ name }}", { name: "Fajar" });
   // Hello Fajar
   expect(data).toBe("Hello Fajar");
});

test("Tags", () => {
   const data = Mustache.render("Hello {{ name }}, my hobby is {{{ hobby }}}", {
      name: "Fajar",
      hobby: "<b>Programming</b>"
   });
   // Hello Fajar
   expect(data).toBe("Hello Fajar, my hobby is <b>Programming</b>");
});

test("Nested Object", () => {
   const data = Mustache.render("Hello {{ person.name }}", {
      person: {
         name: "Fajar"
      }
   });
   // Hello Fajar
   expect(data).toBe("Hello Fajar");
});

test("Mustache File", async () => {
   const helloTemplate = await fs.readFile("./templates/hello.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {
      title: "Muhammad Fajar Amir"
   });
   console.log(data);
   expect(data).toContain("Muhammad Fajar Amir");
});

// pengganti logic di mustache agar tidak menampilkan 
test("Mustache Sections Not Show", async () => {
   const helloTemplate = await fs.readFile("./templates/person.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {});
   console.log(data);
   expect(data).not.toContain("Hello Person");
});

// pengganti logic di mustache agar menampilkan 
test("Mustache Sections Show", async () => {
   const helloTemplate = await fs.readFile("./templates/person.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {
      person: {
         name: "Fajar"
      }
   });
   console.log(data);
   expect(data).toContain("Hello Person");
});

// pengganti if
test("Sections Data", async () => {
   const helloTemplate = await fs.readFile("./templates/person.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {
      person: {
         name: "Fajar"
      }
   });
   console.log(data);
   expect(data).toContain("Hello Person");
});

// pengganti else
test("Inverted Sections", async () => {
   const helloTemplate = await fs.readFile("./templates/person.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {});
   console.log(data);
   expect(data).toContain("Hello Guest");
});

// membuat array
test("List", async () => {
   const helloTemplate = await fs.readFile("./templates/hobbies.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {
      hobbies: ["Coding", "Gaming", "Reading"]
   });
   console.log(data);
   expect(data).toContain("Coding");
   expect(data).toContain("Gaming");
   expect(data).toContain("Reading");
});

// menambahkan function
test("Function", async () => {
   const parameter = {
      name: "Fajar",
      upper: () => {
         return (text, render) => {
            return render(text).toUpperCase();
         }
      }
   }

   const data = Mustache.render("Hello {{ #upper }}{{ name }}{{ /upper }}", parameter);
   console.log(data);
   expect(data).toBe("Hello FAJAR");
});

test("Comment", async () => {
   const helloTemplate = await fs.readFile("./templates/comment.mustache")
      .then(data => data.toString());

   const data = Mustache.render(helloTemplate, {
      title: "Fajar"
   });
   console.log(data);
   expect(data).toContain("Fajar");
   expect(data).not.toContain("Ini Komentar");
});

test("Partials", async () => {
   const headerTemplate = await fs.readFile("./templates/header.mustache").then(data => data.toString());
   const footerTemplate = await fs.readFile("./templates/footer.mustache").then(data => data.toString());
   const contentTemplate = await fs.readFile("./templates/content.mustache").then(data => data.toString());

   const data = Mustache.render(contentTemplate, {
      title: "Belajar Partials",
      content: "Muhammad Fajar Amir"
   }, {
      header: headerTemplate,
      footer: footerTemplate
   });
   console.log(data);
   expect(data).toContain("Belajar Partials");
   expect(data).toContain("Muhammad Fajar Amir");
   expect(data).toContain("Programmer Desa");
});