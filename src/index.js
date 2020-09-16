const express = require('express');
const cors = require('cors');

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
