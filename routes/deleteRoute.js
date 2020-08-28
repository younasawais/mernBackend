const {AddArticleModel}      = require('../mongoWorks');
const { logToConsole } = require('./generalFunctions');

module.exports = function(app){
    /*****************************************************/
    /******* Delete & Get updated articles list **********/
    /*****************************************************/
    app.post('/deleteArticlesgetUpdatedList', async(req,res)=>{
        const {deleteIds}     = req.body;
        let totalDeleted = 0;
        console.log(deleteIds);
        for (let i = 0; i < deleteIds.length; i++) {
            let deleteResponse = await AddArticleModel.deleteMany({'parentItem' : deleteIds[0].id});
            totalDeleted =  totalDeleted + deleteResponse.deletedCount;
            logToConsole('deleteResponse', deleteResponse);            
        }
        let response = null;
        for (let i = 0; i < deleteIds.length; i++) {
            response  = await AddArticleModel.deleteOne({'linkId' : deleteIds[i].id});
            totalDeleted =  totalDeleted + response.deletedCount;
        }
        const articles   = await AddArticleModel.find();
        logToConsole('totalDeleted', totalDeleted);
        res.status(200).send({'articles': articles,'totalDeleted' :totalDeleted });
        
        
    });
}