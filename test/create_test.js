const assert = require('assert');
const Cat = require('../src/models/cat');

describe('Creating cats', () => {
    it('creates a cat', (done) => {
        const cat = new Cat({ name: 'Tom', breed: 'Tammy' });
        cat.save().then(() => {
            assert(!cat.isNew); // if cat is saved to db it is not new
            done();
        });
    });
});
