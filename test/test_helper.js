const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_TEST_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

console.log(mongoose.connection.collections);

beforeEach((done) => {
  mongoose.connection.collections.cats.drop(() => {
    done();
  });
});
