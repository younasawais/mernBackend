const {addArticle, addMenu, AddArticleModel}      = require('../mongoWorks');
const {addArticleFiltered, addArticleEmptyParent, addNewMenu, current, logToConsole} = require('./generalFunctions.js');
const { AddMenuModel } = require("../mongoWorks");
const multer = require('multer');

module.exports = function(app){
    /*****************************************************/
    /****************** Add sample article data **********/
    /*****************************************************/
    app.post('/addSampleData', async (req, res)=>{
        const {articles, menus} = req.body;
        //console.log(articles)
        let resultaddArticle = null;
        for (let i = 0; i < articles.length; i++) {
            resultaddArticle = await addArticle(articles[i]);
            //logToConsole('resultaddArticle : '+ i,resultaddArticle);
        }
        for(let j = 0; j < menus.length; j++ ){
            //resultAddMenu = await AddMenuModel(menus[j]);
            const menu = new AddMenuModel(menus[j]);
            const resultMenu = await menu.save();
            logToConsole('result:' + j, resultMenu);
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
                logToConsole('resulAddParent createParent true',resultaddParent)}
            if(req.body.checkBoxCreateMenu !== 'false'){
                resultAddMenu = await addMenu(addNewMenu(req.body, idTime))
                logToConsole('resultAddMenu createMenu true',resultAddMenu); }
            /************* Reply to client ****************/
            if(err){res.status(500).send(err);}else {res.status(200).send({
                'resultaddArticle'  : resultaddArticle,
                'resulAddParent'    : resultaddParent,
                'resultAddMenu'     : resultAddMenu
            });}
        })
    });
    
    const storage = multer.diskStorage({
        destination : './fileUpload/',
        filename : function(req, file, cb){
            cb(null,idTimePic + '-' + file.originalname)
        }
    });
    
    let upload = multer({ storage : storage }).array('file');   

    /*****************************************************/
    /**** (de)activate & Get updated articles list *******/
    /*****************************************************/
    app.post('/publishArticlesgetUpdatedList', async(req,res)=>{
        const {publishIds, active}     = req.body;
        logToConsole('publishIds', publishIds);
        logToConsole('active', active);
        let response = null;
        for (let i = 0; i < publishIds.length; i++) {
            response  = await AddArticleModel.findOneAndUpdate({'linkId' : publishIds[i].id}, {'active' : active});
            console.log(response);
        }
        const articles   = await AddArticleModel.find();
        
        res.send(articles);
    });
}