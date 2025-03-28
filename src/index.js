const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api", routes);    

const port = 8081;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});