const jwt = require("jsonwebtoken");
const jwtAuthKey = "Gcoe@r@N@vod@y@";


const fetchUser = (req,res,next)=>{
    let token = req.header("auth-token");

    if(!token){
        res.status(401).json({eror:"Not a authenticate user"});
    }

    try {
        let data = jwt.verify(token,jwtAuthKey);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({eror:"Not a authenticate user"});
    }
}

module.exports = fetchUser;