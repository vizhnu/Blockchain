const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `Block-
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0,10)}
        Hash     : ${this.hash.substring(0,10)}
        Data     : ${this.data}`;
    }

    static genesis(){
        return new Block('Genesis Time',"last_hash","first_hash",[]);
    }

    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;
        const timestamp = Date.now();
        const hash = Block.hash(timestamp, lastHash, data);

        return new Block(timestamp, lastHash, hash, data);
    }

    static blockHash(block){
        const ipString = `${block.timestamp}${block.lastHash}${block.data}`;
        return SHA256(ipString).toString();
    }
}

module.exports = Block;