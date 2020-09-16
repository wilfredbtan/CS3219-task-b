const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
// const AWS = require('aws-sdk');

require('./db/mongoose');
const catRouter = require('./routers/cat');

dotenv.config();

// AWS.config.update({
//   region: 'us-east-2',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
// });

// var generateCat = new AWS.Lambda();
// var params = {
//   FunctionName: 'generateCatNames',
// };

// generateCat.invoke(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(catRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
