const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());

app.post('/getmenunamesandlinks', (req,res)=>{
   console.log('post initiated..')
   /*********** FTP test ***********/
   var Client = require('ftp');
   var fs = require('fs');
   var c = new Client();
   c.on('ready', function() {
      c.put('food.jpg', 'food.jpg', function(err) {
      if (err) throw err;
      c.end();
      });
   });
   
   c.connect({
      host : 'ftp.militating.com',
      port : 21,
      user : 'images@qouh.com',
      password : 'Ads123.',
      connTimeout : 9000,
      pasvTimeout : 9000
   });
   /*********** END FTP test ***********/
   console.log('post ends..');
    res.send('testing works');
 });


app.listen(5000, ()=>{
   console.log('listening on Port 5000...testing.js');
});


// var express = require('express');
// const app = express();
// app.get('/', (req,res)=>{
//    res.send('Assalamualekum');
// });