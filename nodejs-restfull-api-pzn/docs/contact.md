# Contact API Spec

## Create Contact API

Endpoint : POST /api/contact
Headers :

-  Authorization : token

   Request Body :

   ```json
   {
      "first_name" : "Fajar",
      "last_name" : "Amir",
      "email" : "fajar@gmail.com",
      "phone" : "9238928"
   }
   ```

   Response Body Success :

   ```json
   {
      "data" : {
         "id" : 1,
         "first_name" : "Fajar",
         "last_name" : "Amir",
         "email" : "fajar@gmail.com",
         "phone" : "9238928"
      }
   }
   ```

   Response Body Error :

   ```json
   {
      "errors" : "Email is not valid format"
   }
   ```

## Update Contact API

Endpoint : PUT /api/contact
Headers :

-  Authorization : token

   Request Body :

   ```json
     {
      "first_name" : "Fajar",
      "last_name" : "Amir",
      "email" : "fajar@gmail.com",
      "phone" : "9238928"
   }
   ```

   Response Body Success :

   ```json
    {
      "data" : {
         "id" : 1,
         "first_name" : "Fajar",
         "last_name" : "Amir",
         "email" : "fajar@gmail.com",
         "phone" : "9238928"
      }
   }
   ```

   Response Body Error :

   ```json
   {
      "errors" : "Email is not valid format"
   }
   ```

## Get Contact API

Endpoint : GET /api/contact/:id
Headers :

-  Authorization : token

   Response Body Success :

   ```json
    {
      "data" : {
         "id" : 1,
         "first_name" : "Fajar",
         "last_name" : "Amir",
         "email" : "fajar@gmail.com",
         "phone" : "9238928"
      }
   }
   ```

   Response Body Error :

   ```json
   {
      "errors" : "Contact is not fount"
   }
   ```

## Search Contact API

Endpoint : GET /api/contacts
Headers :

-  Authorization : token

   Query params :

   -  name : Search by first_name or last_name, using like, optional
   -  email : Search by email using like, optional
   -  phone : Search by pbone usin like, optional
   -  page : number of page, default 1
   -  size : size per page, default 10

   Response Body Success :

   ```json
   {
      "data" : [
         {
            "id" : 1,
            "first_name" : "Fajar",
            "last_name" : "Amir",
            "email" : "fajar@gmail.com",
            "phone" : "9238928"
         }.
         {
            "id" : 2,
            "first_name" : "Fajar",
            "last_name" : "Amir",
            "email" : "fajar@gmail.com",
            "phone" : "9238928"
         }
      ],
      "paging" : {
         "page" : 1,
         "total_page" : 3,
         "total_item" : 30
      }
   }
   ```

   Response Body Error :

## Remove Contack API

Endpoint : DELEE /api/contact/:id
Headers :

-  Authorization : token

   Response Body Success :

   ```json
   {
      "data" : "OK"
   }
   ```

   Response Body Error :

   ```json
   {
      "errors" : "Contact is not found"
   }
   ```
