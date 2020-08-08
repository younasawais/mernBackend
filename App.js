const express = require('express');
const cors = require('cors');
const app = express();

if(typeof process.env.PORT === 'undefined'){
   require('dotenv').config({path:'./env.development'});
}else{
   require('dotenv').config({path:'./env.production'});
}
app.use(cors());
app.use(express.json());





// app.post("/mongoose", async (req, res)=>{
//    console.log(req.body);
//    const {name, id, text1, text2, pic1, pic2, tags, reference} = req.body;
//    let article = new Article({
//       name        : name,
//       id          : id,
//       text1       : text1,
//       text2       : text2,
//       pic1        : pic1,
//       pic2        : pic2,
//       tags        : tags,
//       reference   : reference
//    })
//    article = await article.save();
//    res.send('check db');
// });

app.listen(4000, ()=>{
   console.log('listening on Port 4000');
});
