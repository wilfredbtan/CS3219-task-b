const assert = require('assert');
const Cat = require('../src/models/Cat');

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
