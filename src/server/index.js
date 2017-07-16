const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');

// DB Setup
mongoose.connect('mongodb://localhost/invoices');


// App Setup
app.use(morgan('combined')); // Login Framework (debugging)
app.use(cors()); // Enable CORS
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.use('/public', expressStaticGzip('./public/'));

// console.log(__dirname + '/public/');

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);