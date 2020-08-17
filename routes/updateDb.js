const {addArticle, addMenu}      = require('../mongoWorks');
const {addArticleFiltered, addArticleEmptyParent, addNewMenu, current, logToConsole} = require('./generalFunctions.js');
const multer = require('multer');

module.exports = function(app){
    /*****************************************************/
    /****************** Multi Upload Test ****************/
    /*****************************************************/
    let idTimePic;
    app.post('/addArticleData', async (req, res)=>{
        const idTime = current().id;
        idTimePic = idTime;
        upload(req,res, async function(err){
            logToConsole('req.files 2 : ',req.files);
            logToConsole('req.body 2 : ',req.body);

            /************* Add Article in DB ****************/
            const resultaddArticle = await addArticle(addArticleFiltered(req.body, idTime));
            logToConsole('resultaddArticle',resultaddArticle);
            /************* Add Parent in DB ****************/
            if(req.body.checkBoxCreateParent){
                const resultaddParent = await addArticle(addArticleEmptyParent(req.body, idTime));
                // console.log('newAddParent');
                logToConsole('resulAddParent',resultaddParent);
                console.log(resultaddParent);}
            if(req.body.checkBoxCreateMenu){
                const resultAddMenu = await addMenu(addNewMenu(req.body, idTime))
                logToConsole('resultAddMenu',resultAddMenu);
            }           

            if(err){res.status(500).send(err);}else {res.status(200).send(req.file);}
        })
    });
    
    const storage = multer.diskStorage({
        destination : './fileUpload/',
        filename : function(req, file, cb){
            cb(null,idTimePic + '-' + file.originalname)
        }
    })

    let upload = multer({ storage : storage }).array('file');


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
    /*****************************************************/
    /*********************** Home ************************/
    /*****************************************************/
    app.post('/', (req,res)=>{
        res.send('Assalamualekum');
    });
}