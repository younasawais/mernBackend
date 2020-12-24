const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const helmet = require('helmet');
app.use(helmet());
const axios = require('axios');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
function check(){
  let res = xhr.send();
  return res;
}

let res = check();
console.log(res.response);

app.listen(5000, ()=>{
   console.log('************* DONE ****************');  // Console 3
});

