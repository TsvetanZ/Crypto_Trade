

const errController = require('express').Router();
 


errController.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error page'
    });
});

module.exports = errController;