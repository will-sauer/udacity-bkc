

/**
 * Step 1: Verify 'crypto-js' module is installed for your project.
 * After verifying it is installed, move on to Step 2. No code needs to be written here.
 */

/**
 * Step 2: Import from crypto-js module the SHA256 library.
 */

 var SHA256 = require("crypto-js/sha256");

/**
 * Variables: Do not change variable values.
 */

 const data1 = "Blockchain Rock!";
 const dataObject = {
     id: 1,
       body: "With Object Works too",
       time: new Date().getTime().toString().slice(0,-3)
 };
 
 /**
  * Step 3: Add code to the `generate hash function
  * Function that generates the SHA256 Hash
  * @param {*} obj 
  */
 
 function generateHash(obj) {
     return SHA256(JSON.stringify(obj));
 }
 
 console.log(`SHA256 Hash: ${generateHash(data1)}`);
 console.log("************************************");
 console.log(`SHA256 Hash: ${generateHash(dataObject)}`);

 /**
  * Run your application using `node hashing.js`
  */