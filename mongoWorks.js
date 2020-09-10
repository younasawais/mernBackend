const mongoose = require('mongoose');
const { logToConsole } = require('./routes/generalFunctions');
//const {logToConsole} = require('./generalFunctions.js');
console.log(process.env.db);
mongoose.connect('mongodb+srv://awais:475734255Bbm@cluster0.96fww.mongodb.net/qouh?retryWrites=true&w=majority',{
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
    title2                  : String,
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
exports.AddArticleModel = AddArticleModel;


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
exports.AddMenuModel  = AddMenuModel ;


/*****************************************************/
/********************* Settings **********************/
/*****************************************************/
const settingsSchema = new mongoose.Schema({
    adminEmail              : String,
    adminPassword           : String,
 })
const settingsModel = mongoose.model('settings', settingsSchema);

async function settings(input){
    const settings = new settingsModel(input);
    const result = await settings.save();
    return result;
}

exports.settings      = settings;
exports.settingsModel = settingsModel;








/*****************************************************/
/***************** User Collection *******************/
/*****************************************************/
// TODO

