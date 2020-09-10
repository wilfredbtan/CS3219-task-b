const assert = require('assert');
const Cat = require('../src/models/cat');

describe('Updating a cat', () => {
    let cat;

    beforeEach((done) => {
        cat = new Cat({ name: 'Tom' });
        cat.save().then(() => done());
    });

    function assertHelper(statement, done) {
        statement
            .then(() => Cat.find({}))
            .then((cats) => {
                assert(cats.length === 1);
                // Check that name is updated
                assert(cats[0].name === 'Jerry');
                done();
            });
    }

    it('Sets and saves cat using an instance', (done) => {
        cat.set('name', 'Jerry');
        assertHelper(cat.save(), done);
    });

    it('Updates cat using instance', (done) => {
        assertHelper(cat.updateOne({ name: 'Jerry' }), done);
    });

    it('Updates all one cat using model', (done) => {
        assertHelper(
            Cat.findOneAndUpdate({ name: 'Tom' }, { name: 'Jerry' }),
            done
        );
    });

    it('Updates one cat with id using model', (done) => {
        assertHelper(Cat.findByIdAndUpdate(cat._id, { name: 'Jerry' }), done);
    });
});
