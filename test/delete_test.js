const assert = require('assert');
const Cat = require('../src/models/cat');

describe('Deleting a cat', () => {
  let cat;

  beforeEach((done) => {
    cat = new Cat({ name: 'Tom', breed: 'Tammy' });
    cat.save().then(() => done());
  });

  it('Removes a cat using its instance', (done) => {
    cat
      .delete()
      .then(() => Cat.findOne({ name: 'Tom' }))
      .then((cat) => {
        assert(cat === null);
        done();
      });
  });

  it('Removes a cat', (done) => {
    Cat.findOneAndDelete({ name: 'Tom' })
      .then(() => Cat.findOne({ name: 'Tom' }))
      .then((cat) => {
        assert(cat === null);
        done();
      });
  });

  it('Removes a cat using id', (done) => {
    Cat.findByIdAndDelete(cat._id)
      .then(() => Cat.findOne({ name: 'Tom' }))
      .then((cat) => {
        assert(cat == null);
        done();
      });
  });
});
