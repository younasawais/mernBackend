const {AddArticleModel}      = require('../mongoWorks');

module.exports = function(app){
    /*****************************************************/
    /******* Delete & Get updated articles list **********/
    /*****************************************************/
    app.post('/deleteArticlesgetUpdatedList', async(req,res)=>{
        const deleteIds     = req.body.deleteIds;
        console.log(deleteIds);
        let response = null;
        for (let i = 0; i < deleteIds.length; i++) {
            response  = await AddArticleModel.deleteOne({'linkId' : deleteIds[i].id});
            console.log(response);
        }
        const articles   = await AddArticleModel.find();
        
        res.send(articles);
    });
}