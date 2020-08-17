const {addArticle, addMenu}      = require('../mongoWorks');
const {addArticleFiltered, addArticleEmptyParent, addNewMenu, current, logToConsole} = require('./generalFunctions.js');
const multer = require('multer');

module.exports = function(app){
    /*****************************************************/
    /*********************** Home ************************/
    /*****************************************************/
    app.post('/', (req,res)=>{
        res.send('Assalamualekum');
    });
        
    /*****************************************************/
    /********************** Add menu data ****************/
    /*****************************************************/
    app.post('/addArticleMenuData', async (req, res)=>{
        console.log('Received from : ',req.body);
       const menus = [{
               name : 'spaceX',
               id: '9230303-spacex'
           },{
               name : 'Habib',
               id: '9230303-habib'                
           },{
               name : 'Jannah',
               id: '9230303-jannah'                
           }]
       res.send(menus);
       });
}