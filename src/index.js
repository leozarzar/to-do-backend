const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const io = require('./io.js');
const http = require('http');

//const url = require('url');
//const path = require('path');

//const thisPath = url.fileURLToPath(import.meta.url);
//const frontPath = path.join(thisPath, "../..", "public");
//app.use(express.static(frontPath));

const app = express();

const port = 3000;

app.use(cors({origin: "*"}));

routes(app);

const httpServer = http.createServer(app);
httpServer.listen(port, () => console.log(`Ouvindo na porta ${port}.`));

io(httpServer);

module.exports = app;