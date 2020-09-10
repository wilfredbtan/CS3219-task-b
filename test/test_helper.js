const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

console.log(mongoose.connection.collections)

beforeEach((done) => {
    mongoose.connection.collections.cats.drop(() => {
        done()
    })
})