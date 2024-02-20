const jwt = require("jsonwebtoken")

module.exports = veryfyToken = (req,res,next) => {
    const token = req.headers["authorization"]
    // console.log(token)
    if(!token){
        return res.status(403).send({error: "NO token provided...!!!"})
    }
    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET,(error,decoded) => {
        if(error){
            res.status(404).send({error : "Unauthorized!"})
        }
        req.email = decoded.email;
        next();
    })
    
}
