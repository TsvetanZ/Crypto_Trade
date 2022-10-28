const autController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const errController = require("../controllers/errControler");
const homeController = require("../controllers/homecontroller");
const { hasUser, isGuest } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', autController);
    app.use('/course', hasUser(), courseController);
    app.use('/*', errController);


};

 