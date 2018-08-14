// https://www.youtube.com/watch?v=1qH-3SIFmXw
// https://www.youtube.com/watch?v=4fWWn2Pe2Mk
// https://www.youtube.com/watch?v=JH4qVqplC8E
// http://localhost:3000/products/

// download and install nodejs - https://nodejs.org/en/
// open command prompt and type:  node -v to get the version of node
// open command prompt and type:  npm -v to get the version of npm
// create folder, e.g. nodejs
// create server file, e.g. server.js
// execute:  node server.js

// npm install --save express@latest mysql@latest body-parser@latest
// npm install -g nodemon
// https://stackoverflow.com/questions/25808017/cannot-connect-nodejs-to-mysql
// Add account see Sony Arouje
// https://nodejs.org/api/readline.html
// https://coderwall.com/p/v16yja/simple-node-js-prompt

const mysql = require('mysql');  // use the mysql node module
const express = require('express');  // use express node module
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(express.static('./')); // sets the path to the html pages, e.g. localhost:3000/

const router = require('./routes/queries.js'); // router file with all the SQL commands
app.use(router); // set up a router

// setting up the server using port 3000 
app.listen(3000, () => console.log('Express Server is Running on Port 3000'));
