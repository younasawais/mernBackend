const mongoose = require('mongoose');
//const {logToConsole} = require('./generalFunctions.js');

mongoose.connect('mongodb://localhost/ads',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false})
.then(()=>{console.log("Connected to DB.............................................................")})
.catch((err)=>("Can't connect to db : " + err));


/*****************************************************/
/************** Article Collection *******************/
/*****************************************************/
const addArticleSchema = new mongoose.Schema({
    title                   : String,
    menuItemName            : String,
    parentItem              : String,
    menu                    : String,
    linkId                  : String,
    tags                    : String,
    text1                   : String,
    text2                   : String,
    imageName1              : String,
    imageName2              : String,
    reference               : String,
    creationDate            : String,
    creationTime            : String,
    active                  : Boolean
 });

const AddArticleModel = mongoose.model('Article', addArticleSchema);


async function addArticle(addArticleModel){
    const article = new AddArticleModel(addArticleModel);
    const result = await article.save();
    return result;
}

exports.addArticle       = addArticle;


/*****************************************************/
/***************** Menu Collection *******************/
/*****************************************************/
const addMenuSchema = new mongoose.Schema({
    name                    : String,
    id                      : String,
    creationDate            : String,
    creationTime            : String,
    active                  : Boolean
 })
const AddMenuModel = mongoose.model('menu', addMenuSchema);

async function addMenu(addMenuModel){
    const menu = new AddMenuModel(addMenuModel);
    const result = await menu.save();
    return result;
}

exports.addMenu       = addMenu;
/*****************************************************/
/***************** User Collection *******************/
/*****************************************************/
// TODO