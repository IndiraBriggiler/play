var express = require('express');
var app = express();
const path = require('path')
var multer = require('multer');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/images'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, './images');
  },

  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).array('imgUploader'); 


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/Upload', function(req, res) {
  upload(req, res, function(err) {
      if (err) {
        console.log(err)
          return res.end('Something went wrong!');
          
      }
      return res.end('File uploaded sucessfully!.');
  });
});

let ranking = {
  'FACIL': [],
  'INTERMEDIO': [],
  'EXPERTO': []
};


app.get('/ranking', function (req, res) {
  res.send(ranking[req.query.level].slice(0, 5));
})

app.post('/newScore', function (req, res) {
  let newScore = {
    player: req.body.player,
    level: req.body.playerLevel,
    attempts: req.body.playerAttempts
  }
  ranking[newScore.level].push(newScore);
  res.sendStatus(200);
  ranking[newScore.level].sort(function(a, b){
    return a.attempts - b.attempts;
  });
})

