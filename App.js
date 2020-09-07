const express = require('express');
const cors = require('cors');
const { logToConsole } = require('./routes/generalFunctions');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/images', express.static('fileUpload'))
if(typeof process.env.PORT === 'undefined'){
   require('dotenv').config({path:'./.env.development'});
   //logToConsole('development running', process.env);
}else{
   require('dotenv').config({path:'./.env.production'});
   //logToConsole('production running', process.env);
};

require('./initialize');
require('./routes/updateDbRoute')(app);
require('./routes/infoRoute')(app);
require('./routes/deleteRoute')(app);

app.listen(4000, ()=>{
   console.log('listening on Port 4000');
});