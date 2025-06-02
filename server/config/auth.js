const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.authMiddleware = async (req, res, next) =>{

   

        const token = req.cookies.token;
        if (!token) {
            return res.json({
                message: "User Not Authenticated.",
                success: false
            })
        }

        console.log(token);
        

try {

    const decode =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ) 
        console.log(decode);
        if(!decode) {
            return res.status(400).json({
                message: 'unauthorized access',
                error: true,
                success: false
            })
        } 
        
        req.userId = decode.userId;
        next();
    
} catch (error) {

    return res.status(401).json({
        success: false,
        message: 'Unauthorised user!'
    })
    
}

        
        
    
}