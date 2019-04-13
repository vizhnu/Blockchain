const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, block ;
    beforeEach(() => {
        bc = new Blockchain();
        
    });
    
    it('checks whether the first element is the genesis element', () => {
         expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual('foo');
    });
})
