const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');
const {register, login} = require('../services/userService');
const { parseError } = require('../util/parser');

const autController = require('express').Router();


autController.get('/register', isGuest(), (req, res) =>{
    //TODO replace with actul view
    res.render('register', {
        title: 'Register Page'
    }); 
});

autController.post ('/register', isGuest(),
    body('username')  // това е от express-validator
    .isLength({min:5}).withMessage('Username must be least 5 characteras long')
    .isAlphanumeric().withMessage('Username may contain only letters and numbers'),
    body('email')  // това е от express-validator
    .isEmail().withMessage('Email must realy email')
    .isLength({min:10}).withMessage('email must be least 10 characteras long'),
    body('password')
    .isLength({min:4}).withMessage('Password must be least 4 characteras long')
    .isAlphanumeric().withMessage('Password may contain only letters and numbers'),  
    async(req, res) =>{
        try {
            const { errors } = validationResult(req);
            if(errors.length > 0) {
                throw errors;
            }
           // if(req.body.username == ''|| req.body.password =='') {
           //     throw new Error('All fields are required')
           // }
            if(req.body.password != req.body.repass) {
                throw new Error ('Password don\'t match');
            }
        const token = await register(req.body.username, req.body.email, req.body.password);

        // TODO CHECK assignment to see if register create session
        res.cookie('token', token);
        res.redirect('/'); //TODO replace with redirect by assignment
        //TODO add error display to actual templete assignment
        }catch (error) {
            //TODO add error parser
            const errors = parseError(error);
            //console.log(errors)
            res.render('register', {
                title: 'Register Error',
                errors,
                body: {
                    username: req.body.username
                }
            }); 

        }
}); 

autController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
})

autController.post('/login', isGuest(), async (req,res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //TODO replace with redirect by assignment
    } catch (error) {
        res.render('login', {
            title: 'Login Page',
            errors: parseError(error),
            body: {
                email : req.body.email
            }
        })
    }
})

autController.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = autController;