const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const lambda = new AWS.Lambda();

export default lambda;
