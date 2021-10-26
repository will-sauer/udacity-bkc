const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(blockData){
      this.chain = [];
      this.hash = "";
      this.height = 0;
      this.body = blockData;
      this.time = 0;
      // this.previousBlockhash = "";
  }
}

class Blockchain {
  constructor(){
    this.chain = [];

    this.addBlock(new Block("genesis block"));
  }

  addBlock(newBlock){
    newBlock.height = this.chain.length;
    newBlock.time = new Date().getTime().toString().slice(0,-3);

    if (this.chain.length > 0) {
      newBlock.previousblockhash = this.chain[this.chain.length-1].hash; 
    }
    else
      newBlock.previousblockhash = "";
    
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    
    this.chain.push(newBlock);
  }
}
