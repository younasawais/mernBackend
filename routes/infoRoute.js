const {AddArticleModel, AddMenuModel}      = require('../mongoWorks');
//const {addArticleFiltered, addArticleEmptyParent, addNewMenu, current, logToConsole} = require('./generalFunctions.js');
const multer        = require('multer');
const Cryptr        = require('cryptr');
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
        // const menus = [{
        //         name : 'spaceX',
        //         id: '9230303-spacex'
        //     },{
        //         name : 'Habib',
        //         id: '9230303-habib'                
        //     },{
        //         name : 'Jannah',
        //         id: '9230303-jannah'                
        //     }]
        res.send(menus);
        });

    /*****************************************************/
    /****************** Get articles list ****************/
    /*****************************************************/
    app.post('/getArticleListManageArticles', async(req,res)=>{
        // const token     = req.body.token;
        // const {email}   = checkToken(token);
        // console.log(email)
        const articles   = await AddArticleModel.find();
        //console.log(articles);
        res.send(articles);
    });
}