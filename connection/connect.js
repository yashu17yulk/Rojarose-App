const mongoose = require('mongoose');
const Config = require('../config/imp')
mongoose.connect(Config.URL/*, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }*/)
.then(()=>{
    console.log('connected to mongodb');
}).catch((error)=>{
    console.log(error);
})
