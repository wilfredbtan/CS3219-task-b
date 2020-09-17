'use strict';

require('dotenv').config({ path: './variables.env' });
const middy = require('middy');
const { cors } = require('middy/middlewares');

const connectToDatabase = require('./db');
const Cat = require('./cats.model.js');

// const wrapResponseWithCors = (object) => {
//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Credentials': true,
//     },
//     body: JSON.stringify(object),
//   };
// }

// module.exports.hello = (event, context, callback) => {
//   console.log('Hello World');
//   callback(null, 'Hello World');
// };

const withMiddy = (handler) => {
  return middy(handler).use(cors());
};

module.exports.create = withMiddy((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.create(JSON.parse(event.body))
      .then((cat) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(cat),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the cat.',
        })
      );
  });
});

module.exports.getOne = withMiddy((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.findById(event.pathParameters.id)
      .then((cat) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(cat),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the cat.',
        })
      );
  });
});

module.exports.getAll = withMiddy((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.find()
      .then((cats) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(cats),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the cats.',
        })
      );
  });
});

module.exports.update = withMiddy((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true,
    })
      .then((cat) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(cat),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the cats.',
        })
      );
  });
});

module.exports.delete = withMiddy((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.findByIdAndRemove(event.pathParameters.id)
      .then((cat) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed cat with id: ' + cat._id,
            cat: cat,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the cats.',
        })
      );
  });
});
