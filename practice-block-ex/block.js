/**
 * Import crypto-js/SHA256 library
 */
 var SHA256 = require('crypto-js/sha256');


 /**
  * Class with a constructor for block 
  */
 class Block {
 
     constructor(data){
         this.id = 0;
         this.nonce = 144444;
           this.body = data;
           this.hash = "";
     }
     
     /**
      * Step 1. Implement `generateHash()`
      * method that will return the `self` block with the hash.
      * 
      * Create a Promise that resolves with `self` after you create 
      * the hash of the object and assigned to the hash property `self.hash = ...`
      */
       // 
       generateHash() {
           // Use this to create a temporary reference of the class object
           let self = this;
           self.hash = SHA256(JSON.stringify(self)).toString();
           return self.hash;
        }
 }
 
 // Exporting the class Block to be reuse in other files
 module.exports.Block = Block;