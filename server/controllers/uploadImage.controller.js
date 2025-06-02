//const uploadToCloudinary = require("../utils/uploadImageCloudinary")

const uploadToCloudinary = require("../utils/uploadImageCloudinary")


const uploadImageController = async(req, res) =>{
     
    try {

        const file = req.files.file

      
        const uploadedFile = await uploadToCloudinary(file, "twitter")

        return res.json({
            message: ' Image Upload Done ',
            data: uploadedFile.url,
            success : true
        })
        
    } catch (error) {

        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

module.exports = uploadImageController