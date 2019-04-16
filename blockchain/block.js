const SHA256 = require('crypto-js/sha256');

const { DIFFICULTY } = require('../config');

class Block{
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString(){
        return `Block-
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0,10)}
        Hash     : ${this.hash.substring(0,10)}
        Data     : ${this.data}
        Nonce    : ${this.nonce}`;
    }

    static genesis(){
        return new Block('Genesis Time',"last_hash","first_hash",[], 0);
    }

    static hash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static mineBlock(lastBlock, data){
        let nonce = 0, timestamp, hash;
        const lastHash = lastBlock.hash;

        do{
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data, nonce);
        }while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new Block(timestamp, lastHash, hash, data, nonce);
    }

    static blockHash(block){
        const ipString = `${block.timestamp}${block.lastHash}${block.data}${block.nonce}`;
        return SHA256(ipString).toString();
    }
}

module.exports = Block;