const { AddArticle } = require("../mongoWorks");
/************* Random functions ****************/
function current(){
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
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
function addArticleFiltered(obj){
    const { title, menuItemName, newMenu, parentItemSelected, selectedMenu, 
        createParent, tags, text1, text2, reference, active, 
        checkBoxCreateMenu, addSubItemToParent, checkBoxCreateParent} = obj;
    console.log(checkBoxCreateParent);
    let menu;
    if(checkBoxCreateMenu){menu = newMenu }else{menu = selectedMenu};
    let parent;
    if(checkBoxCreateParent){parent = createParent}
    else if(addSubItemToParent){parent = parentItemSelected}else{parent = parentItemSelected};

    let newAddArticle = {   title                   : title,
                            menuItemName            : menuItemName,
                            parentItem              : parent,
                            menu                    : menu,
                            linkId                  : current().id + '-' + textToLink(title),
                            tags                    : tags,
                            text1                   : text1,
                            text2                   : text2,
                            creationDate            : current().today,
                            creationTime            : current().time,
                            reference               : reference,
                            active                  : active};
    return newAddArticle;
}

/*****************************************************/
/***************** add new Parent *******************/
/*****************************************************/
function addArticleEmptyParent(obj){
    const { newMenu, selectedMenu, createParent, active, checkBoxCreateMenu} = obj;
    let menu;
    if(checkBoxCreateMenu){menu = newMenu }else{menu = selectedMenu};
    // let parent;
    // if(checkBoxCreateParent){parent = createParent}
    // else if(addSubItemToParent){parent = parentItemSelected}else{parent = parentItemSelected};

    let newAddParent = {    title                   : createParent,
                            parentItem              : '',
                            menu                    : menu,
                            linkId                  : current().id + '-' + textToLink(createParent),
                            tags                    : '',
                            text1                   : '',
                            text2                   : '',
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
function addNewMenu(obj){
    const { newMenu, checkBoxCreateMenu} = obj;
    let menu;
    if(checkBoxCreateMenu){menu = newMenu }else{menu = selectedMenu};
    // let parent;
    // if(checkBoxCreateParent){parent = createParent}
    // else if(addSubItemToParent){parent = parentItemSelected}else{parent = parentItemSelected};

    let addNewMenu = {    
        name                    : newMenu,
        id                      : current().id + '-' + textToLink(newMenu),
        creationDate            : current().today,
        creationTime            : current().time,
        active                  : true};
    console.log('addNewMenu');
    console.log(addNewMenu);
    return addNewMenu;
}

exports.current                 = current;
exports.addArticleFiltered      = addArticleFiltered;
exports.addArticleEmptyParent   = addArticleEmptyParent;
exports.addNewMenu              = addNewMenu;