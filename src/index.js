const express = require("express");
require("./db/mongoose");
const catRouter = require("./routers/cat");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(catRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
