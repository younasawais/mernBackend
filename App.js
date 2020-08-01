var express = require('express');
const app = express();
app.get('/', (req,res)=>{
   res.send('Assalamualekum');
});
app.listen(3000, ()=>{
   console.log('listening on Port 3000');
});
