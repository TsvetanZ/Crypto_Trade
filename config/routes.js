const autController = require("../controllers/authController");
const coinController = require("../controllers/coinController");
const errController = require("../controllers/errControler");
const homeController = require("../controllers/homecontroller");
const { hasUser, isGuest } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', autController);
    app.use('/coin', coinController);
    app.use('/*', errController);

};

 