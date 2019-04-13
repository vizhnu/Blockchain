const block = require('./block');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        let lastBlock = this.chain[-1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }
}