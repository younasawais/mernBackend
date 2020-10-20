const {addArticle, addMenu, AddArticleModel}      = require('../mongoWorks');
// const multer        = require('multer');
const fs = require('fs');
const {addArticleFiltered, addArticleEmptyParent, getParentAndChildren, addNewMenu, current, logToConsole} = require('./generalFunctions.js');

const { AddMenuModel } = require("../mongoWorks");
const multer = require('multer');

module.exports = function(app){
    /*****************************************************/
    /****************** Add sample article data **********/
    /*****************************************************/
    app.post('/addSampleData', async (req, res)=>{
        const {articles, menus} = req.body;
        console.log('add sample processing');
        //console.log(articles)
        let resultaddArticle = null;
        for (let i = 0; i < articles.length; i++) {
            resultaddArticle = await addArticle(articles[i]);
            //logToConsole('resultaddArticle : '+ i,resultaddArticle);
        }
        for(let j = 0; j < menus.length; j++ ){
            resultAddMenu = await AddMenuModel(menus[j]);
            const menu = new AddMenuModel(menus[j]);
            const resultMenu = await menu.save();
            //logToConsole('result:' + j, resultMenu);
        }
        res.status(200).send(req.body);
    });

    /*****************************************************/
    /**************** Add new article data ***************/
    /*****************************************************/
    let idTimePic;
    app.post('/addArticleData', async (req, res)=>{
        const idTime = current().id;
        idTimePic = idTime;
        let resultaddParent = null;
        let resultAddMenu = null;
        upload(req,res, async function(err){

            /************* Add Article in DB ****************/
            const resultaddArticle = await addArticle(addArticleFiltered(req.body, idTime));
            //logToConsole('resultaddArticle general',resultaddArticle);

            /************* Add Parent in DB ****************/
            if(req.body.checkBoxCreateParent !== 'false'){
                resultaddParent = await addArticle(addArticleEmptyParent(req.body, idTime));
                //logToConsole('resulAddParent createParent true',resultaddParent)
            }
            if(req.body.checkBoxCreateMenu !== 'false'){
                resultAddMenu = await addMenu(addNewMenu(req.body, idTime))
                //logToConsole('resultAddMenu createMenu true',resultAddMenu); 
            }

            /************* Reply to client ****************/
            if(err){res.status(500).send(err);}else {res.status(200).send({
                'resultaddArticle'  : resultaddArticle,
                'resulAddParent'    : resultaddParent,
                'resultAddMenu'     : resultAddMenu
            });}
        })
    });
    
    
    /************* Save attachments ****************/
    const storage = multer.diskStorage({
        destination : './fileUpload/',
        filename : function(req, file, cb){
            cb(null, idTimePic + '-' + file.originalname)
        }
    });    
    let upload = multer({ storage : storage }).array('file');   

    /*****************************************************/
    /**** (de)activate & Get updated articles list *******/
    /*****************************************************/
    app.post('/publishArticlesgetUpdatedList', async(req,res)=>{
        const {publishIds, active}     = req.body;
        //logToConsole('publishIds', publishIds);
        //logToConsole('active', active);
        let response = null;
        for (let i = 0; i < publishIds.length; i++) {
            response  = await AddArticleModel.findOneAndUpdate({'linkId' : publishIds[i].id}, {'active' : active});
            //console.log(response);
        }
        const articles   = await AddArticleModel.find();
        
        res.send(articles);
    });
    
    /*****************************************************/
    /******* (de)activate & Get updated menus list *******/
    /*****************************************************/
    app.post('/publishMenusgetUpdatedList', async(req,res)=>{
        const {publishIds, active}     = req.body;
        let response = null;
        for (let i = 0; i < publishIds.length; i++) {
            response  = await AddMenuModel.findOneAndUpdate({'id' : publishIds[i].id}, {'active' : active});
            //console.log(response);
        }
        let menus   = await AddMenuModel
        .find()
        .select({
            '_id' : 0,
            '__v' : 0
        });
        let parentsAndChildren = getParentAndChildren(menus);
        res.send({menus: menus, children : (await parentsAndChildren).children, parents : (await parentsAndChildren).parents});
    });


    /*****************************************************/
    /********************* Backup DB *********************/
    /*****************************************************/
    app.post('/backupArticlesAndMenus', async (req,res)=>{
        const articleInfo   = await AddArticleModel.find().select('-__v -_id');
        const menuInfo      = await AddMenuModel.find().select('-__v -_id');
        fs.writeFile(current().id + '_BackupArticles.json', dbToJson(articleInfo),'utf8', ()=>{
            console.log('ArticlesBackup Done..')
        });
        fs.writeFile(current().id + '_BackupMenus.json', dbToJson(menuInfo),'utf8', ()=>{
            console.log('MenusBackup Done..')
        });

        res.status(200).send({works: "In Process.."});
    });
}


/*****************************************************/
/***************** DB to JSON ************************/
/*****************************************************/
function dbToJson(dbInfo){
    let jsonFixed = dbInfo.toString();
    jsonFixed = jsonFixed.replace(/"/g, "'");
    jsonFixed = jsonFixed.replace(/(\s{2})(_?_?[a-zA-Z0-9]+)(:\s)/g,'$1' + '"' + '$2' + '"' + '$3');
    jsonFixed = jsonFixed.replace(/(\s)'(.+)'(,\n)/g, '$1'+ '"' + '$2' + '"' + '$3');
    jsonFixed = jsonFixed.replace(/(:\s)''(,)/g, '$1'+'""'+'$2');
    jsonFixed = jsonFixed.replace(/({\s)([a-zA-Z0-9]+)(:)/g,'$1' +'"' + '$2' + '"' + '$3');
    return jsonFixed;
}