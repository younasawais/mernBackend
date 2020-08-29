const {AddArticleModel, AddMenuModel}      = require('../mongoWorks');
//const {addArticleFiltered, addArticleEmptyParent, addNewMenu, current, logToConsole} = require('./generalFunctions.js');
const multer        = require('multer');
const Cryptr        = require('cryptr');
const { logToConsole } = require('./generalFunctions');
const cryptr        = new Cryptr('maryam123!');

module.exports = function(app){
    /*****************************************************/
    /*********************** Home ************************/
    /*****************************************************/
    app.post('/encode', (req,res)=>{
        res.send(cryptr.encrypt('475734255Bb'));
    });
        
    /*****************************************************/
    /********************** Add menu data ****************/
    /*****************************************************/
    app.post('/addArticleMenuData', async (req, res)=>{
            const menus = await AddMenuModel.find();
            const parentArticles   = await AddArticleModel
                .find({'parentItem' : ''})
                .select({title: 1, linkId: 1, menu: 1});
            //logToConsole('parentArticles', parentArticles);
            res.status(200).send({'menus': menus,'parentArticles' : parentArticles});
        });

    /*****************************************************/
    /****************** Get articles list ****************/
    /*****************************************************/
    app.post('/getArticleListManageArticles', async(req,res)=>{
        const articles   = await AddArticleModel.find();
        //console.log(articles);
        res.send(articles);
    });
}