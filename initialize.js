const { settings, settingsModel } = require('./mongoWorks');
const { logToConsole, encryption, decryption } = require('./routes/generalFunctions');
const jwt = require('jsonwebtoken');

async function initializeLogin(){
    response  = await settingsModel.findOne();
    if(!response && (typeof(process.env.adminEmail) !== 'undefined')){
        const { adminEmail, adminPassword} = process.env;
        let settingsResponse = await settings({adminEmail:adminEmail, adminPassword: encryption(adminPassword)});
        logToConsole('initialized credentials', settingsResponse);
        return settingsResponse;
    }else{
        return false;
    }
}
initializeLogin();