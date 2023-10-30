const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`server listning to ${PORT}`) });
app.get(`/index(.html)?`, (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'index.html'));
})
app.get(`^/$`, (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'details.html'));
})
