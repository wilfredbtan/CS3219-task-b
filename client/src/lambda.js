const AWS = require('aws-sdk');

console.log('ACCESS ID!!!');
console.log(process.env.REACT_APP_SERVER_URL);

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const lambda = new AWS.Lambda();

export default lambda;
