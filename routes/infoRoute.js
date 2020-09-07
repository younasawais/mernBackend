const {AddArticleModel, AddMenuModel, settingsModel}      = require('../mongoWorks');
const multer        = require('multer');
const { logToConsole, tagsStringToArray, getParentAndChildren, decryption } = require('./generalFunctions');
const jwt           = require('jsonwebtoken');

module.exports = function(app){
    /*****************************************************/
    /*********************** Home ************************/
    /*****************************************************/
    app.post('/loginAdmin', async (req,res)=>{
        const {email, password} = req.body;
        const response = await settingsModel.findOne({'adminEmail' : email});
        let token = null;
        if(decryption(response.adminPassword) === password){
            //console.log('successfull credentials checks!');
            token = jwt.sign({'username' : email}, process.env.jwtKey)
            res.send(token);
        }else{
            //console.log('Wrong password');
            res.send('Wrong password');
        }
        
    });
        
    /*****************************************************/
    /********************** Add menu data ****************/
    /*****************************************************/
    app.post('/addArticleMenuData', async (req, res)=>{
            const menus = await AddMenuModel.find();
            const parentArticles   = await AddArticleModel
                .find({'parentItem' : ''})
                .select({title: 1, linkId: 1, menu: 1});
            res.status(200).send({'menus': menus,'parentArticles' : parentArticles});
        });

    /*****************************************************/
    /**************** Get Article content ****************/
    /*****************************************************/
    app.post('/getarticleinfowithMenuItems', async (req, res)=>{
        const {linkId} = req.body;
        const articleInfo   = await AddArticleModel
            .findOne({'linkId' : linkId})
            .select({
                _id : 0,
                __v : 0,
                creationDate : 0,
                creationTime : 0
            });
        articleInfo.tags = tagsStringToArray(articleInfo.tags);
        const menuItems = await AddArticleModel
            .find({'menu' : articleInfo.menu})
            .select({'linkId' : 1, 'menuItemName': 1, 'parentItem' : 1, '_id': 0});
        const articleMenuItems = generateArticleMenuItems(menuItems);
        res.status(200).send({'articleInfo' : articleInfo, 'articleMenuItems' : articleMenuItems });
    });

    /*****************************************************/
    /********** Get Article content without menu *********/
    /*****************************************************/
    app.post('/getarticleinfo', async (req, res)=>{
        const {linkId} = req.body;
        const articleInfo   = await AddArticleModel
            .findOne({'linkId' : linkId})
            .select({title: 1, title2: 1, tags: 1, text1: 1, text2: 1, reference: 1, active: 1, menu: 1} -'_id' -'__v');
        articleInfo.tags = tagsStringToArray(articleInfo.tags);
        res.status(200).send({'articleInfo' : articleInfo });
    });

    /*****************************************************/
    /****************** Get articles list ****************/
    /*****************************************************/
    app.post('/getArticleListManageArticles', async(req,res)=>{
        const articles   = await AddArticleModel.find();
        res.send(articles);
    });

    /*****************************************************/
    /********************* Get Menu list *****************/
    /*****************************************************/
    app.post('/getMenuList', async(req,res)=>{
        let menus   = await AddMenuModel
        .find()
        .select({
            '_id' : 0,
            '__v' : 0
        });
        let parentsAndChildren = getParentAndChildren(menus);
        //logToConsole('parentsAndChildren', parentsAndChildren);
        res.send({menus: menus, children : (await parentsAndChildren).children, parents : (await parentsAndChildren).parents});
    });
    
    /*****************************************************/
    /********************* Get Menu list *****************/
    /*****************************************************/
    app.post('/getmenunamesandlinks', async(req,res)=>{
        let menus   = await AddMenuModel
        .find()
        .select({
            '_id' : 0,
            '__v' : 0,
            'creationDate'  : 0,
            'creationTime'  : 0,
        });

        let menuLinks = [];
        for (let i = 0; i < menus.length; i++) {    
            menuLinks[i] = await AddArticleModel
            .findOne({menu : menus[i].name })
            .select({title: 1, linkId : 1});
        }
        res.send({menus: menus, menuLinks : menuLinks});
    });

}

/**********************General functions ******************/
function generateArticleMenuItems(menuItems){
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

    for (let j = 0; j < menuItemSorted.length; j++) {
        for (let x = 0; x < subItems.length; x++) {
            if(subItems[x].parent === menuItemSorted[j].router){
                menuItemSorted[j].sub.push(subItems[x]);
            }
        }
    }
    return menuItemSorted;
}
