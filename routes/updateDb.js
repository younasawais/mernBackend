const {AddArticle}      = require('../mongoWorks');
const {current, addArticleFiltered}         = require('./generalFunctions.js');

module.exports = function(app){
    /*****************************************************/
    /***************** Send back userInfo ****************/
    /*****************************************************/
    app.post("/saveAddArticle", async (req, res)=>{
        //console.log(req.body);
        // const { title, menuItemName, newMenu, parentItem, selectedMenu, 
        //    createParent, linkId, tags, text1, text2, reference, active, 
        //    checkBoxCreateMenu, addSubItemToParent, checkBoxCreateParent} = req.body;

        // Save article according to checkboxes
        // let addArticle = 
        //      {   title                   : title,
        //          menuItemName            : menuItemName,
        //          newMenu                 : newMenu,
        //          parentItem              : parentItem,
        //          selectedMenu            : selectedMenu,
        //          createParent            : createParent,
        //          linkId                  : linkId,
        //          tags                    : tags,
        //          text1                   : text1,
        //          text2                   : text2,
        //          creationDate            : current().today,
        //          creationTime            : current().time,
        //          reference               : reference,
        //          active                  : active
        // };
        /************* Create user in DB ****************/
        const resultaddArticle          = await AddArticle(addArticleFiltered(req.body));
        console.log(resultaddArticle);
        res.send('check db');
     });
     
    /*****************************************************/
    /*********************** Home ************************/
    /*****************************************************/
    app.post('/', (req,res)=>{
        res.send('Assalamualekum');
    });
}