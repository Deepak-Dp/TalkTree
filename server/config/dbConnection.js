
const mongoose = require('mongoose')

require('dotenv').config()

const connectDataBase = async ()=>{
   await mongoose.connect(process.env.MONGO_URI)
   .then(()=> {
    console.log('database connection successfull');
    
   })
   .catch((error)=>{
      console.log(`database connection failed => ${error}`);
      
   })
}

module.exports = connectDataBase