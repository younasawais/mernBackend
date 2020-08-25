const {addArticle, addMenu}      = require('../mongoWorks');
const {addArticleFiltered, addArticleEmptyParent, addNewMenu, current, logToConsole} = require('./generalFunctions.js');
const multer = require('multer');

module.exports = function(app){
    /*****************************************************/
    /****************** Add sample article data **********/
    /*****************************************************/
    app.post('/addSampleData', async (req, res)=>{
        const {articles} = req.body;
        //console.log(articles)
        let resultaddArticle = null;
        for (let i = 0; i < articles.length; i++) {
            resultaddArticle = await addArticle(articles[i]);
            //logToConsole('resultaddArticle : '+ i,resultaddArticle);
        }
        res.status(200).send(req.body);
    });

    /*****************************************************/
    /****************** Multi Upload Test ****************/
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
            logToConsole('resultaddArticle',resultaddArticle);
            /************* Add Parent in DB ****************/
            if(req.body.checkBoxCreateParent !== 'false'){
                resultaddParent = await addArticle(addArticleEmptyParent(req.body, idTime));
                logToConsole('resulAddParent',resultaddParent)}
            if(req.body.checkBoxCreateMenu !== 'false'){
                resultAddMenu = await addMenu(addNewMenu(req.body, idTime))
                logToConsole('resultAddMenu',resultAddMenu); }
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
}