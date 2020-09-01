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
    /**************** Get Article content ****************/
    /*****************************************************/
    app.post('/getarticleinfo', async (req, res)=>{
        const {linkId} = req.body;
        const articleInfo   = await AddArticleModel
            .findOne({'linkId' : linkId})
            .select({title: 1, tags: 1, text1: 1, text2: 1, refernce: 1, active: 1, menu: 1});
        logToConsole('articleInfo', articleInfo);
        logToConsole('articleInfo.menu', articleInfo.menu);
        const menuItems = await AddArticleModel
            .find({'menu' : articleInfo.menu})
            .select({'linkId' : 1, 'menuItemName': 1, 'parentItem' : 1, '_id': 0});
        logToConsole('menuItems', menuItems);
        const articleMenuItems = generateArticleMenuItems(menuItems);
        res.status(200).send({'articleInfo' : articleInfo, 'articleMenuItems' : articleMenuItems });
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

function generateArticleMenuItems(menuItems){
    logToConsole('menuItems', menuItems);
    // let parentItems     = [];
    let subItems        = [];
    let menuItemSorted  = [];
    for(let i = 0; menuItems.length > i; i++ ){
        if(menuItems[i].parentItem === ''){
            menuItemSorted.push({
                name : menuItems[i].menuItemName,
                router : menuItems[i].linkId,
                sub : []
            });
        }else{
            subItems.push({
                name : menuItems[i].menuItemName,
                router : menuItems[i].linkId,
                parent: menuItems[i].parentItem
            });
        }
    }

    logToConsole('subItems', subItems);
    logToConsole('menuItemSorted', menuItemSorted);

    for (let j = 0; j < menuItemSorted.length; j++) {
        for (let x = 0; x < subItems.length; x++) {
            if(subItems[x].parent === menuItemSorted[j].router){
                menuItemSorted[j].sub.push(subItems[x]);
            }
        }
    }
    
    logToConsole('menuItemSorted', menuItemSorted);
    return menuItemSorted;
 // return structure as below
}

const articleMenuItems =  [{
    menuItemName: 'First one',
    router : 'first-one',
    sub: [{
        menuItemName: 'Second one',
        router : 'second-one'
    },{
        menuItemName: 'Sub Second two',
        router : 'sub-second-two'
    }]
  },{
    menuItemName: 'First Two',
    router : 'first2',
    sub: []
  },{
    menuItemName: 'Awais Younas',
    router : 'awais-younas',
    sub: [{
        menuItemName: 'Mohammad Younas',
        router : 'Mohammad-younas'
    }]
}]