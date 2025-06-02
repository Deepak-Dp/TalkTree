const cloudinary = require('cloudinary').v2

async function uploadToCloudinary(file, folder){
    const options = {folder}
    console.log(file.tempFilePath);
    console.log(folder);
    
   return await cloudinary.uploader.upload(file.tempFilePath, options)
}

module.exports = uploadToCloudinary