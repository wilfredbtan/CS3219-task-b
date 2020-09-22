'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Cat = require('./cats.model.js');

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Cat.create(JSON.parse(event.body))
      .then((body) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(body),
          headers: corsHeaders,
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
          headers: corsHeaders,
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
          headers: corsHeaders,
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

  connectToDatabase().then(() => {
    Cat.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true,
    })
      .then((cat) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(cat),
          headers: corsHeaders,
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
          headers: corsHeaders,
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
