const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        //console.log(token);
        try {
          const userData = verifyToken(token); 
          req.user = userData;
          res.locals.username = userData.username; // по тизи нначин го правим глобален и ще можем да зададем какво ще вижда user anmd guest

        } catch (error) {
            //console.log('Invalid token');
            res.clearCookie('token'); // изчистваме кокито и в сгобите казваме кое е то;
            res.redirect('/auth/login');
            return
        }
        
    }

    next();
};