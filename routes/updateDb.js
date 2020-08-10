const {addArticle, addMenu}      = require('../mongoWorks');
const {addArticleFiltered, addArticleEmptyParent, addNewMenu} = require('./generalFunctions.js');

module.exports = function(app){
    /*****************************************************/
    /***************** Send back userInfo ****************/
    /*****************************************************/
    app.post("/saveAddArticle", async (req, res)=>{
        //console.log(req.body);
        // const { title, menuItemName, newMenu, parentItem, selectedMenu, 
        //    createParent, linkId, tags, text1, text2, reference, active, 
        //    checkBoxCreateMenu, addSubItemToParent, checkBoxCreateParent} = req.body;
        //const { checkBoxCreateParent } = req.body;

        /************* Add Article in DB ****************/
        const resultaddArticle = await addArticle(addArticleFiltered(req.body));
        console.log(resultaddArticle);
        /************* Add Parent in DB ****************/
        if(req.body.checkBoxCreateParent){
            const resultaddParent = await addArticle(addArticleEmptyParent(req.body));
            // console.log('newAddParent');
            console.log(resultaddParent);}
        if(req.body.checkBoxCreateMenu){
            const resultAddMenu = await addMenu(addNewMenu(req.body))
            console.log(resultAddMenu);
        }
        
        res.send('check db');
     });
     
    /*****************************************************/
    /*********************** Home ************************/
    /*****************************************************/
    app.post('/', (req,res)=>{
        res.send('Assalamualekum');
    });
}