const { AddArticle } = require("../mongoWorks");
/************* Random functions ****************/

/*****************************************************/
/******************** Current time *******************/
/*****************************************************/
function current(){
    let date = new Date();
    // let tempYear = date.getFullYear();
    // console.log(tempYear);

    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear() - 2000;
    let datum = {
        today : dd + '/' + mm + '/' + yyyy,
        time : date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        id: yyyy+mm+dd+date.getHours() + date.getMinutes() + date.getSeconds()}
    return datum;
}

function textToLink(name){
    let temp = name.toLowerCase().replace(/\s/g, '-');
    return temp;
}

/*****************************************************/
/***************** add new Article *******************/
/*****************************************************/
function addArticleFiltered(obj, idTime){
    const { title, menuItemName, newMenu, parentItemSelected, parentItemSelectedId, selectedMenu, 
        createParent, tags, text1, text2, reference, active, 
        checkBoxCreateMenu, addSubItemToParent, checkBoxCreateParent, 
        imageName1, imageName2} = obj;
    //logToConsole('req body info ', obj);
    //logToConsole('obj addArticleFiltered input :: ',obj);
    let menu;
    if(checkBoxCreateMenu !== 'false'){menu = newMenu }else{menu = selectedMenu};
    let parent;
    if(checkBoxCreateParent !== 'false'){parent = idTime + '-' + createParent}
    else if(parentItemSelectedId !== "false"){parent = parentItemSelectedId}else{parent = parentItemSelectedId};

    let newAddArticle = {   title                   : title,
                            menuItemName            : menuItemName,
                            parentItem              : parent,
                            menu                    : menu,
                            linkId                  : idTime + '-' + textToLink(title),
                            tags                    : tags,
                            text1                   : idTime + '-' + text1,
                            text2                   : idTime + '-' + text2,
                            imageName1              : imageName1,
                            imageName2              : imageName2,
                            creationDate            : current().today,
                            creationTime            : current().time,
                            reference               : reference,
                            active                  : active};
    //logToConsole('addArticleFiltered :: ',newAddArticle);
    return newAddArticle;
}

/*****************************************************/
/***************** add new Parent *******************/
/*****************************************************/
function addArticleEmptyParent(obj, idTime){
    const { newMenu, selectedMenu, createParent, active, checkBoxCreateMenu} = obj;
    let menu;
    if(checkBoxCreateMenu !== 'false'){menu = newMenu }else{menu = selectedMenu};
    // let parent;
    // if(checkBoxCreateParent){parent = createParent}
    // else if(addSubItemToParent){parent = parentItemSelected}else{parent = parentItemSelected};

    let newAddParent = {    title                   : createParent,
                            parentItem              : '',
                            menu                    : menu,
                            menuItemName            : createParent,
                            linkId                  : idTime + '-' + textToLink(createParent),
                            tags                    : '',
                            text1                   : '',
                            text2                   : '',
                            imageName1              : '',
                            imageName2              : '',
                            creationDate            : current().today,
                            creationTime            : current().time,
                            reference               : '',
                            active                  : active};
    // console.log('newAddParent');
    // console.log(newAddParent);
    return newAddParent;
}

/*****************************************************/
/******************** add new menu *******************/
/*****************************************************/
function addNewMenu(obj, idTime){
    const { newMenu, checkBoxCreateMenu} = obj;
    let menu;
    if(checkBoxCreateMenu){menu = newMenu }else{menu = selectedMenu};
    // let parent;
    // if(checkBoxCreateParent){parent = createParent}
    // else if(addSubItemToParent){parent = parentItemSelected}else{parent = parentItemSelected};

    let addNewMenu = {    
        name                    : newMenu,
        id                      : idTime + '-' + textToLink(newMenu),
        creationDate            : current().today,
        creationTime            : current().time,
        active                  : true};
    console.log('addNewMenu');
    console.log(addNewMenu);
    return addNewMenu;
}

/*****************************************************/
/******************** console log  *******************/
/*****************************************************/
function logToConsole(comment, value){
    console.log("*************************************** " + comment + " *********************************");
    console.log("*************************************** " + current().time +  " *********************************");
    console.log(value);
    console.log("********************************* END : " + comment + " *********************************");
}


exports.current                 = current;
exports.addArticleFiltered      = addArticleFiltered;
exports.addArticleEmptyParent   = addArticleEmptyParent;
exports.addNewMenu              = addNewMenu;
exports.logToConsole            = logToConsole;