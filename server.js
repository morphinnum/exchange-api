const express = require('express');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html", {name:"helloo"});
});

app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + "/main.js");
});

app.get('/getKey', (req, res) => {
    const apiKey = {
        key: process.env.EXCHANGE_API_KEY
    };
    res.send(apiKey);
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});