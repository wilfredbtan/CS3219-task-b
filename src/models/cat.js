const mongoose = require('mongoose');

const Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    default: 'Tabby',
    required: true,
    trim: true,
  },
});

module.exports = Cat;
