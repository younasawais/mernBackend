const {RegistrarModel}          = require('../mongoWorks');
const whois                     = require('whois');
const {UserModel}               = require('../mongoWorks');
const jwt                       = require('jsonwebtoken');
const {jwtKey}                  = require('../config/configData');
const {checkToken, logToConsole,
    errorLog, decrypt}          = require('../mods/randomFunctions');

module.exports = function(app){
    /*****************************************************/
    /************* Get all domain details ****************/
    /*****************************************************/
    app.post("/showDomainNames", async (req, res)=>{
        try {
            /********** CODDE START *********/
            const token     = req.body.token;
            const {email}   = checkToken(token);
            console.log(email)
            const domains   = await RegistrarModel
                .find({"studiotorontoEmail" : email})
                .select('-_id -__v -time -date');
            console.log(domains);
            res.send(domains);
            /********** CODE END*********/
        } catch (error) {errorLog('dataReq.js -> showDomainNames: '+ error);res.send("error");}
    });
    
    /*****************************************************/
    /************* Check domain available ****************/
    /*****************************************************/
    app.post("/checkdomain", (req, res)=>{
        try {
            /********** CODE START*********/
            const domainName    = req.body.domainName.toLowerCase();
            //logToConsole("domainName: ", domainName);
            whois.lookup(domainName, async function(err, data){
                const response = await data;
                logToConsole("response: ", response);
                let domainNameAvailable;
                if(response.includes("No match for domain") || response.includes("Not found: " + domainName)){
                    domainNameAvailable = "available"
                }else{
                    domainNameAvailable = "unavailable"
                }
                res.send({domainNameAvailable});
            });
            /********** CODE END *********/
        } catch (error) {errorLog('dataReq.js -> checkdomain: '+ error);res.send("error");}
    });

    /*****************************************************/
    /***************** Send back userInfo ****************/
    /*****************************************************/
    app.post("/getUserData", async (req, res)=>{
        try {
            /********** CODE START *********/
            const verify  = checkToken(req.body.token) //Check token
            const dbres   = await UserModel.findOne({"userInfo.email" : verify.email}); // get data from db
            logToConsole("userInfo", dbres);
            const {name, surname, email, phoneNumber, address, address2, city, 
                state,country, zip, registrationDate} = dbres.userInfo;
            let sendObj = {
                "name"          : name,
                "surname"       : surname,
                "email"         : email,
                "phoneNumber"   : phoneNumber,
                "address"       : address,
                "address2"      : address2,
                "city"          : city,
                "state"         : state,
                "country"       : country,
                "zip"           : zip,
                "registerDate"  : registrationDate
            }
            logToConsole("sendObj", sendObj);
            res.send(sendObj);
            /********** CODE END *********/
        } catch (error) {errorLog('dataReq.js -> getUserData: '+ error);res.send("error");}
    });

    /******************************************************/
    /************* Send back Subscriptions ****************/
    /******************************************************/
    app.post("/getUserSubscriptions", async (req, res)=>{
        try {
            /********** CODE START *********/
            const {email}  = checkToken(req.body.token) //Check token
            const {subscriptions} = await UserModel.findOne({"userInfo.email" : email});
            logToConsole("subscriptions", subscriptions);
            res.send(subscriptions);
            
            /********** CODE END *********/
        } catch (error) {errorLog('dataReq->getUserSubscriptions: '+ error);res.send("error");}
        });

    /*****************************************************/
    /**************** Check login details ****************/
    /*****************************************************/
    app.post("/login",async (req, res)=>{
        try {
        /********** CODE START *********/
        const email     = req.body.email;
        const password  = req.body.password;
        console.log("email : " + email + ", Password : " + password); 

        logToConsole("password",password);
        const dbres = await UserModel.findOne({"userInfo.email" : email});
        logToConsole("dbres",dbres);
        logToConsole("password",password);
        logToConsole("dbres.userInfo.password",dbres.userInfo.password);
        logToConsole("decrypt(dbres.userInfo.password)",decrypt(dbres.userInfo.password));

        let token;
        if (decrypt(dbres.userInfo.password) === password) {
            token = jwt.sign({ "email" : email}, jwtKey);
        } else {
            token = false;
        }
        logToConsole("token",token);

        res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send("check header");        
        /********** CODE END *********/
        } catch (error) {errorLog('dataReq.js -> login: '+ error);res.send("error");}
    });

    /*****************************************************/
    /************* Authorize protected links *************/
    /*****************************************************/
    app.post("/verifytoken",async (req, res)=>{
    try {
        /********** CODE START *********/
        const verify = checkToken(req.body.token);
        logToConsole("verify", verify);
        res.send(verify);
        /********** CODE END *********/
    } catch (error) {errorLog('dataReq.js -> verifytoken: '+ error);res.send("error");}
    });

    /*****************************************************/
    /********* Check if email already registered *********/
    /*****************************************************/
    app.post("/emailexist",async (req, res)=>{
        try {
            /********** CODE START *********/
            const {email} = req.body;        
            logToConsole("email", email);
            const dbres = await UserModel.findOne({"userInfo.email" : email});
            logToConsole("dbres", dbres);
            if(dbres){
                res.send(true);
            }else{
                res.send(false);
            }
            /********** CODE END *********/
        } catch (error) {
            errorLog('dataReq.js -> emailExist: '+ error);
            res.send("error");
        }
    });   
    
    /*****************************************************/
    /********* Check if email already registered *********/
    /*****************************************************/
    app.post("/",async (req, res)=>{
        try {
            /********** CODE START *********/
            res.send("ip");  
            /********** CODE END *********/        
        } catch (error) {
            errorLog('dataReq.js -> /: '+ error);
            res.send("Error present");
        }
    });  
}