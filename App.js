const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

if(typeof process.env.PORT === 'undefined'){
   require('dotenv').config({path:'./env.development'});
}else{
   require('dotenv').config({path:'./env.production'});
}
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost/ads',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false})
.then(()=>{console.log("Connected to DB.............................................................")})
.catch((err)=>("Can't connect to db : " + err));

const Article = mongoose.model('Article', new mongoose.Schema({
   name  : String,
   id    : String,
   text1 : String,
   text2 : String
}));


app.post('/', (req,res)=>{
   res.send('Assalamualekum');
});

app.post("/mongoose", async (req, res)=>{
   console.log(req.body);
   const {name, id, text1, text2} = req.body;
   let article = new Article({
      name  : name,
      id    : id,
      text1 : text1,
      text2 : text2
   })
   article = await article.save();
   res.send('check db');
});

app.post('/mongoose', (req,res)=>{

   res.send('ssalamualekum');
});

app.listen(4000, ()=>{
   console.log('listening on Port 4000');
});
