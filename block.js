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

    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;
        const timestamp = Date.now();
        const hash = "todo";

        return new Block(timestamp, lastHash, hash, data);
    }
}

module.exports = Block;