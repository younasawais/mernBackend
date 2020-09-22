const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());



app.get('/testget', (req,res)=>{
    res.send('testing get sub works');
 });

app.post('/testpost', (req,res)=>{
    res.send('testing works');
 });

 /*********** FTP test ***********/
 var Client = require('ftp');
 var fs = require('fs');

 var c = new Client();
 c.on('ready', function() {
   c.put('foo.txt', 'foo.remote-copy.txt', function(err) {
     if (err) throw err;
     c.end();
   });
 });
 
 c.connect({
    host : 'ftp.militating.com',
    port : 21,
    user : 'images@qouh.com',
    password : 'Images123.',
    connTimeout : 9000,
    pasvTimeout : 9000
 });
 /*********** END FTP test ***********/


app.listen(5000, ()=>{
   console.log('listening on Port 5000');
});


// var express = require('express');
// const app = express();
// app.get('/', (req,res)=>{
//    res.send('Assalamualekum');
// });