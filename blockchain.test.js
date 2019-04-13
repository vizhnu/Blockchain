const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, bc2 ;
    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });
    
    it('checks whether the first element is the genesis element', () => {
         expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual('foo');
    });

    it('validates a valid chain', () => {
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with corrupt genesis block', () => {
        bc2.chain[0].data = "bar";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a chain with a corrupt block', () => {
        bc2.addBlock('hello');
        bc2.chain[1].data = 'baz';
        expect(bc.isValidChain(bc2)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        bc2.addBlock("zoo");
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the current chain with a smaller chain', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    })
})
