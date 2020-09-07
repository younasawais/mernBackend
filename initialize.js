const { settings, settingsModel } = require('./mongoWorks');
const { logToConsole } = require('./routes/generalFunctions');

async function initializeLogin(){
    response  = await settingsModel.findOne();
    if(!response){
        return await settings({adminEmail:process.env.adminEmail, adminPassword: process.env.adminPassword});
    }else{
        return false;
    }
}

           
initializeLogin();