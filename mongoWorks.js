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
    parentItem              : String,
    menu                    : String,
    linkId                  : String,
    tags                    : String,
    text1                   : String,
    text2                   : String,
    reference               : String,
    creationDate            : String,
    creationTime            : String,
    active                  : Boolean
 })
const AddArticleModel = mongoose.model('Article', addArticleSchema);


async function AddArticle(addArticleModel){
    const registrar = new AddArticleModel(addArticleModel);
    const result = await registrar.save();
    return result;
}

exports.AddArticle       = AddArticle;







//  const UserModel = mongoose.model('User', userSchema);

// const domainRegistrar = new mongoose.Schema({ 
//     name        : String, 
//     surname     : String,
//     email       : String,
//     phoneNumber : Number,
//     address     : String,
//     address2    : String,
//     city        : String,
//     state       : String,
//     country     : String,
//     zip         : String,
//     studiotorontoEmail   : String,
//     time        : String,
//     date        : String,
//     domainName  : String
// });

// const RegistrarModel = mongoose.model('Registrar', domainRegistrar);

// async function CreateRegistrar(userInfo){
//     const registrar = new RegistrarModel(userInfo);
//     const result = await registrar.save();
//     return result;
// }

// exports.CreateRegistrar = CreateRegistrar;