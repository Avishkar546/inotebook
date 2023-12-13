// This middleware authenticate the user for each request
const jwt = require("jsonwebtoken");
const jwtAuthKey = "Gcoe@r@N@vod@y@";


const fetchUser = (req,res,next)=>{
    let token = req.header("auth-token");

    if(!token){
        res.status(401).json({eror:"Not a authenticate user"});
    }

    try {
        let data = jwt.verify(token,jwtAuthKey);
        // console.log("In fetchuser");
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({eror:"Not a authenticate user"});
    }
}

module.exports = fetchUser;