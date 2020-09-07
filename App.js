const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/images', express.static('fileUpload'))
if(typeof process.env.PORT === 'undefined'){
   require('dotenv').config({path:'./env.development'});
}else{
   require('dotenv').config({path:'./env.production'});
};

require('./routes/updateDbRoute')(app);
require('./routes/infoRoute')(app);
require('./routes/deleteRoute')(app);

app.listen(4000, ()=>{
   console.log('listening on Port 4000');
});