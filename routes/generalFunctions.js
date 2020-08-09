const { AddArticle } = require("../mongoWorks");


/************* Random functions ****************/
function current(){
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let datum = {
        today : dd + '/' + mm + '/' + yyyy,
        time : date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
    return datum;
}

function addArticleFiltered(obj){
    const { title, menuItemName, newMenu, parentItem, selectedMenu, 
        createParent, linkId, tags, text1, text2, reference, active, 
        checkBoxCreateMenu, addSubItemToParent, checkBoxCreateParent} = obj;

    if(!addSubItemToParent && !checkBoxCreateParent){
        let menu;
        if(checkBoxCreateMenu){menu = newMenu }else{menu = selectedMenu};
        let newAddArticle = 
             {   title                   : title,
                 menuItemName            : menuItemName,
                 parentItem              : '',
                 menu                    : menu,
                 linkId                  : linkId,
                 tags                    : tags,
                 text1                   : text1,
                 text2                   : text2,
                 creationDate            : current().today,
                 creationTime            : current().time,
                 reference               : reference,
                 active                  : active
        };
        return newAddArticle;
    }else if(addSubItemToParent || checkBoxCreateParent){
        
    }
}

exports.current = current;
exports.addArticleFiltered = addArticleFiltered;