const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

require('./db/mongoose');
const catRouter = require('./routers/cat');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(catRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
