var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'), function(req,res){
  console.log(req.file);
  console.log(req.body);
  const name = req.file.originalname;
  const type = req.file.mimetype;
    const size = req.file.size;
  res.json({name: name, type: type, size: size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
