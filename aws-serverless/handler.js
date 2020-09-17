'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Cat = require('./cats.model.js');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.create(JSON.parse(event.body))
      .then((body) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(body),
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
};

module.exports.getOne = (event, context, callback) => {
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
};

module.exports.getAll = (event, context, callback) => {
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
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // console.log('event.pathParameters: ');
  // console.log(event.pathParameters);

  // console.log('event.pathParameters.id: ');
  // console.log(event.pathParameters.id);

  // console.log('event.body: ');
  // console.log(event.body);

  // console.log('PARSED event.body: ');
  // console.log(JSON.parse(event.body));

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
};

module.exports.delete = (event, context, callback) => {
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
};
