const express = require('express');

const app = express();

const port = 3005;


app.get('/home/yash', (req, res) => {
    res.send('req received');
})

app.listen( port, () => { console.log('server is live')});