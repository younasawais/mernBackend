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
app.listen(5000, ()=>{
   console.log('listening on Port 5000');
});


// var express = require('express');
// const app = express();
// app.get('/', (req,res)=>{
//    res.send('Assalamualekum');
// });