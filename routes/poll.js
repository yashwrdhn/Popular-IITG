const express = require('express');
const router = express.Router();
const Pusher = require("pusher");
const fs = require("fs");

let datajson = fs.readFileSync("Polls.json","utf-8");
let data = JSON.parse(datajson);

const pusher = new Pusher({
    appId: "1475538",
    key: "f66f339574913b40b1bc",
    secret: "a996713efaad9cff40de",
    cluster: "ap2",
    useTLS: true
  });


router.post('/', (req, res) => {
    console.log(req.body.option)
    pusher.trigger("poll", "vote", {
        points: 1,
        option : req.body.option
      });

    return res.json({success: true, message: "Thank you"});
})

router.get('/create', (req, res) => {
  res.render('createPoll.html') ;
})

function addData(newPoll) {
  
  
  
  let obj = {
    "id": Object.keys(data.Polls).length+1,
    "title" : newPoll.title,
    "options" : [
      { "text" : newPoll.option[0], "val" : 0 },
      { "text" :  newPoll.option[1], "val" : 0 },
      { "text" : newPoll.option[2], "val" : 0 },
      { "text" :  newPoll.option[3], "val" : 0 } 
    ]
  };
  // console.log(obj);
  data.Polls.push(obj);
  datajson = JSON.stringify(data);
  fs.writeFileSync("Polls.json",datajson,"utf-8");
  // console.log(datajson);
}


router.post('/create', (req, res) => {
  
  addData(req.body);
  res.redirect('../'); 
  ;
})

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  const poll = data.Polls[req.params.id-1];
  if( !poll ) res.send('not found'); 
  console.log(poll); 
  res.render('poll.html', { poll : poll, title: 'some poll'});
})



module.exports = router;