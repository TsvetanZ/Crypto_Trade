module.exports= (... excludedKey) => (req, res,next) => {
    if(req.body) {
        for (let key in req.body) {
            if(excludedKey.includes(key) == false) {
               req.body[key] = req.body[key].trim(); 
            }
        }
    }
    next();
}