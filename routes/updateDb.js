const {AddArticleModel}               = require('../mongoWorks');

    /*****************************************************/
    /***************** Send back userInfo ****************/
    /*****************************************************/
    app.post("/saveAddArticle", async (req, res)=>{
        //console.log(req.body);
        const { title, menuItemName, newMenu, parentItem, selectedMenu, 
           createParent, linkId, tags, text1, text2, reference, active, 
           checkBoxCreateMenu, addSubItemToParent, checkBoxCreateParent} = req.body;
        let addArticle = 
             {   title                   : title,
                 menuItemName            : menuItemName,
                 newMenu                 : newMenu,
                 parentItem              : parentItem,
                 selectedMenu            : selectedMenu,
                 createParent            : createParent,
                 linkId                  : linkId,
                 tags                    : tags,
                 text1                   : text1,
                 text2                   : text2,
                 reference               : reference,
                 active                  : active
        };
        /************* Create user in DB ****************/
        const resultaddArticle          = await CreateUser(addArticle);

        article = await addArticle.save();
        console.log(article);
        res.send('check db');
     });


// app.post("/getUserData", async (req, res)=>{
//     try {
//         /********** CODE START *********/
//         const verify  = checkToken(req.body.token) //Check token
//         const dbres   = await UserModel.findOne({"userInfo.email" : verify.email}); // get data from db
//         logToConsole("userInfo", dbres);
//         const {name, surname, email, phoneNumber, address, address2, city, 
//             state,country, zip, registrationDate} = dbres.userInfo;
//         let sendObj = {
//             "name"          : name,
//             "surname"       : surname,
//             "email"         : email,
//             "phoneNumber"   : phoneNumber,
//             "address"       : address,
//             "address2"      : address2,
//             "city"          : city,
//             "state"         : state,
//             "country"       : country,
//             "zip"           : zip,
//             "registerDate"  : registrationDate
//         }
//         logToConsole("sendObj", sendObj);
//         res.send(sendObj);
//         /********** CODE END *********/
//     } catch (error) {errorLog('dataReq.js -> getUserData: '+ error);res.send("error");}
// });

app.post('/', (req,res)=>{
    res.send('Assalamualekum');
});