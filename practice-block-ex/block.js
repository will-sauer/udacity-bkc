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
            let self = this;
            return new Promise(function(resolve, reject) {
                self.hash = SHA256(JSON.stringify(self)).toString();
                if (self) {
                    resolve(self);
                }
                else {
                    reject(self)
                }
            });
        }
 }
 
 // Exporting the class Block to be reuse in other files
 module.exports.Block = Block;