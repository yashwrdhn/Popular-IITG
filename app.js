const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// const qr = require('./qrcode.js');
const poll = require('./routes/poll');


let obj = {
    "id": 5,
    "title" : "poll1",
    "options" : [
      { "text" : "Lohit", "val" : 8 },
      { "text" : "New Sac", "val" : 18 },
      { "text" : "Khoka", "val" : 2 },
      { "text" : "food court", "val" : 0 } 
    ]
  };

// let datajson = fs.readFileSync("Polls.json","utf-8");
// let data = JSON.parse(datajson); 
// data.Polls.push(obj);
// console.log(datajson);
// data.push(obj);
// datajson = JSON.stringify(data);
// fs.writeFileSync("Polls.json",datajson,"utf-8");

app.get('/', function(req, res){

  let datajson = fs.readFileSync("Polls.json","utf-8");
  let data = JSON.parse(datajson);

  res.render('../public/index.html', {
      polls : data.Polls,
      
  });
});



app.engine('.html', require('ejs').__express);

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//enable cors
app.use(cors());


app.use('/poll', poll);
app.set('view engine', 'html');
app.set("views", path.join(__dirname, "views"));



const port = 3001;
app.listen( port, () => console.log(`server started on port ${port}`));