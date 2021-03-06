/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');


class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialize the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: {address: 'Genesis Block'}});
            await this.addBlock(block);
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            //note block comes in w just body
            block.time = Math.floor(+new Date() / 1000)
            
            //set prv block hash
            if (this.height == -1){
                block.previousBlockHash = 0;
            }
            //prev blockhash is hash of newest block
            else {
                block.previousBlockHash = this.chain[this.height].hash;
            }

            //set block height
            block.height = this.height + 1
            //generate hash
            block.hash = SHA256(JSON.stringify(block)).toString();
            //push block to array
            this.chain.push(block);    
            //increment chain height
            this.height++;

            resolve(block);
        });
    }

    /**
         * The requestMessageOwnershipVerification(address) method
         * will allow you  to request a message that you will sign
         * with your Bitcoin Wallet (Electrum or Bitcoin Core)
         * This is the first step before submitting your Block.
         * The method will return a Promise that will resolve with the message to be signed
         * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            resolve(`<WALLET_ADRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry`);
        });
    }

    /**
         * The submitStar(address, message, signature, star) method
         * will allow users to register a new Block with the star object
         * into the chain. This method will resolve with the Block added or
         * reject with an error.
         * Algorithm steps:
         * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
         * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
         * 3. Check if the time elapsed is less than 5 minutes
         * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
         * 5. Create the block and add it to the chain
         * 6. Resolve with the block added.
         * @param {*} address 
         * @param {*} message 
         * @param {*} signature 
         * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            // time less than 5m?
            let messageTime = parseInt(message.split(':')[1])
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
            let timeDifference = currentTime - messageTime;
            
            if(timeDifference >= 300) {
                reject('signature expired');
            }


            let newBlockData = {
                data: {
                    "address":  address,
                    "message": message,
                    "signature": signature,
                    "star": star
                }
            }

            let newBlock = new BlockClass.Block(newBlockData);

            // if verified, add block w star and resolve
            try {
                let verificationResult = bitcoinMessage.verify(message, address, signature)
            } catch (error) {
                reject("error in verification")
            }

            if(verificationResult) {
                this.addBlock(newBlock).then(function(block) {
                    resolve(block);
                });
            }
            else {
                reject('failed to verify message');
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    
    getBlockByHash(queryHash) {
        let self = this;
        return new Promise((resolve, reject) => {
            let result = this.chain.find( function(block ) {
                return block.hash === queryHash 
            });

            resolve(result);
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress (queryAddress) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            //map an array of block bodies (the stars)
            let stars = this.chain.map(block => block.decodeData());
            //return subset whose owner matches provided address
            let ownedStars = stars.filter(star => star.address == queryAddress);
            resolve(ownedStars);
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */
    validateChain() {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let results = this.chain.map(function(block) {
                 block.validate()
            }).filter(res => res != undefined);

            resolve(results);
        });
    }
}

module.exports.Blockchain = Blockchain;   