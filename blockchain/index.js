const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        let lastBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0])  !== JSON.stringify(Block.genesis())){
            console.log("Genesis block does not match");
            return false;
        }
        for(let i=1;i < chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)){
                    return false;
                }
        }

        return true;
    }

    replaceChain(newChain){
        
        if(newChain.length <= this.chain.length){
            console.log('new chain not longer than current chain');
            return;
        }
        else if(!this.isValidChain(newChain)){
            console.log('chain not valid');
            return;
        }
        this.chain = newChain;
        console.log('chain replaced');
    }
}

module.exports = Blockchain;