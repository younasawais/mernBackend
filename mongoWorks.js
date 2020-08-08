const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ads',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false})
.then(()=>{console.log("Connected to DB.............................................................")})
.catch((err)=>("Can't connect to db : " + err));

const addArticleSchema = new mongoose.Schema({
    title                   : String,
    menuItemName            : String,
    newMenu                 : String,
    parentItem              : String,
    selectedMenu            : String,
    createParent            : String,
    linkId                  : String,
    tags                    : String,
    text1                   : String,
    text2                   : String,
    reference               : String,
    active                  : Boolean
 })
const AddArticleModel = mongoose.model('Article', addArticleSchema);


async function AddArticle(AddArticleModel){
    const registrar = new RegistrarModel(userInfo);
    const result = await registrar.save();
    return result;
}

exports.AddArticleModel       = AddArticleModel;







//  const UserModel = mongoose.model('User', userSchema);

const domainRegistrar = new mongoose.Schema({ 
    name        : String, 
    surname     : String,
    email       : String,
    phoneNumber : Number,
    address     : String,
    address2    : String,
    city        : String,
    state       : String,
    country     : String,
    zip         : String,
    studiotorontoEmail   : String,
    time        : String,
    date        : String,
    domainName  : String
});

const RegistrarModel = mongoose.model('Registrar', domainRegistrar);

async function CreateRegistrar(userInfo){
    const registrar = new RegistrarModel(userInfo);
    const result = await registrar.save();
    return result;
}

exports.CreateRegistrar = CreateRegistrar;