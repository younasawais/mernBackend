const {AddArticleModel, AddArticle, settingsModel} = require("../mongoWorks");
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
//const cryptr = new Cryptr(process.env.jwtKey);
const cryptr = new Cryptr('personalKey');
const jwt           = require('jsonwebtoken');

/************* Random functions ****************/

/*****************************************************/
/******************** (de)Encrypt ********************/
/*****************************************************/
function encryption(val){
    return cryptr.encrypt(val)
};
function decryption(val){
    return cryptr.decrypt(val)
};

exports.encryption = encryption;
exports.decryption = decryption;


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
    const { title, title2, menuItemName, newMenu, parentItemSelectedId, selectedMenu, 
        createParent, tags, text1, text2, reference, active, 
        checkBoxCreateMenu,  checkBoxCreateParent, 
        imageName1, imageName2} = obj;
    //logToConsole('req body info ', obj);
    //logToConsole('obj addArticleFiltered input :: ',obj);
    let menu;
    if(checkBoxCreateMenu !== 'false'){menu = newMenu }else{menu = selectedMenu};
    let parent;
    if(checkBoxCreateParent !== 'false'){parent = idTime + '-' + createParent}
    else if(parentItemSelectedId !== "false"){parent = parentItemSelectedId}else{parent = parentItemSelectedId};
    let idTimeImg1 = idTime + '-';
    let idTimeImg2 = idTime + '-';
    if(imageName1 === ""){idTimeImg1 = ""};
    if(imageName2 === ""){idTimeImg2 = ""};

    let newAddArticle = {   title                   : title,
                            title2                  : title2,
                            menuItemName            : menuItemName,
                            parentItem              : parent,
                            menu                    : menu,
                            linkId                  : idTime + '-' + textToLink(title),
                            tags                    : tags,
                            text1                   : text1,
                            text2                   : text2,
                            imageName1              : idTimeImg1 + imageName1,
                            imageName2              : idTimeImg2 + imageName2,
                            creationDate            : current().today,
                            creationTime            : current().time,
                            reference               : reference,
                            active                  : active};
    //logToConsole('addArticleFiltered :: ',newAddArticle);
    if(imageName1 !== ""){sendImagesToFtp('../fileUpload/' + idTimeImg1 + imageName1, idTimeImg1 + imageName1)};
    if(imageName2 !== ""){sendImagesToFtp('../fileUpload/' + idTimeImg2 + imageName2, idTimeImg2 + imageName2)};
    
    return newAddArticle;
}

/*****************************************************/
/********************** FTP test *********************/
/*****************************************************/
function sendImagesToFtp(image, imageName){
    var Client = require('ftp');
    var fs = require('fs');
   
    var c = new Client();
    c.on('ready', function() {
      c.put(image, imageName, function(err) {
        if (err) throw err;
        c.end();
      });
    });
    
    c.connect({
       host : process.env.ftphost,
       port : 21,
       user : process.env.ftpuser,
       password : process.env.ftppass,
       connTimeout : 9000,
       pasvTimeout : 9000
    });
}

/*****************************************************/
/****************** add new Parent *******************/
/*****************************************************/
function addArticleEmptyParent(obj, idTime){
    const { newMenu, selectedMenu, createParent, active, checkBoxCreateMenu} = obj;
    let menu;
    if(checkBoxCreateMenu !== 'false'){menu = newMenu }else{menu = selectedMenu};
    // let parent;
    // if(checkBoxCreateParent){parent = createParent}
    // else if(addSubItemToParent){parent = parentItemSelected}else{parent = parentItemSelected};

    let newAddParent = {    title                   : createParent,
                            title2                  : '',
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
                            active                  : active };
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

/*****************************************************/
/***************** Tags String -> Array **************/
/*****************************************************/
function tagsStringToArray(stringTags){
    let arrayTags = stringTags.split(';');
    return arrayTags;
}




/*****************************************************/
/******************** (de)Encrypt ********************/
/*****************************************************/
// async function checkToken(reqToken){
//     try {
//         const verify = jwt.verify(reqToken,process.env.jwtKey);
//         const {adminPassword, adminEmail} = verify;
//         logToConsole('adminEmail', adminEmail);
//         const response = await settingsModel.findOne({'adminEmail' : adminEmail});
//         // console.log(response); 
//         // console.log(adminPassword);
//         if(response.adminPassword === adminPassword){
//             return true;  
//         }else{
//             return false;
//         }
//     } catch (error) {
//         logToConsole('error token', error);
//         return false;
//     }
// }

//exports.checkToken = checkToken;

/*****************************************************/
/************************ BCrypt *********************/
/*****************************************************/
async function encrypt(value){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(value, salt);
    return hashed;
};



exports.tagsStringToArray       = tagsStringToArray;
exports.current                 = current;
exports.addArticleFiltered      = addArticleFiltered;
exports.addArticleEmptyParent   = addArticleEmptyParent;
exports.addNewMenu              = addNewMenu;
exports.logToConsole            = logToConsole;
//exports.getParentAndChildren    = getParentAndChildren;