const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors({origin: "*"}));

routes(app);


app.listen(port, () => console.log('Ouvindo na porta 3000.'));

module.exports = app;