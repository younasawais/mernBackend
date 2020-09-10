const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const helmet = require('helmet');
app.use(helmet());
app.use('/images', express.static('fileUpload'));

require('dotenv').config({path:'./.env'});

// if(typeof process.env.PORT === 'undefined'){
//    require('dotenv').config({path:'./.env.development'});
// }else{
//    require('dotenv').config({path:'./.env.production'});
// };

// require('./initialize');
console.log(process.env);
require('./routes/updateDbRoute')(app);
require('./routes/infoRoute')(app);
require('./routes/deleteRoute')(app);

app.get('/test', async(req,res)=>{
   res.send('test works');
});
// app.get('/', (req,res)=>{
//    res.send('walekumsalam 5');
// });

app.listen(process.env.port, ()=>{
   console.log('listening on port ' + process.env.port);
});



/************************ Underneath works ***************************/
// var express = require('express');
// const app = express();
// app.get('/', (req,res)=>{
//    res.send('Assalamualekum');
// });
// app.listen(5000, ()=>{
//    console.log('listening on Port 5000');
// });
