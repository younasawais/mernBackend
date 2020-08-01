const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.post('/', (req,res)=>{
   res.send('Assalamualekum');
});
app.listen(4000, ()=>{
   console.log('listening on Port 4000');
});
