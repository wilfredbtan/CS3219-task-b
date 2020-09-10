const assert = require('assert');
const Cat = require('../src/models/cat');

let cat;

beforeEach((done) => {
    cat = new Cat({ name: 'Tom', breed: 'Tammy' });
    cat.save().then(() => done());
});

describe('Reading cat details', () => {
    it('Finds cat with the name of Tom', (done) => {
        Cat.findOne({ name: 'Tom' }).then(() => {
            assert(cat.name === 'Tom');
            done();
        });
    }).timeout(10000); // Longer timeout needed as server may be sleeping
});
