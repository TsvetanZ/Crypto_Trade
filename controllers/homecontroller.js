const { getAll } = require('../services/coinService');

const homeController = require('express').Router();


// TODO replace whit real controller by assigment
homeController.get('/', async (req, res) => {
    //let view; 
    //let courses = [];
//
    //console.log(req.query)
//
    //if(req.user) {
    //    view = 'user-home'
    //    // courses = await getAllByDate(); this without search
    //    courses = await getAllByDate(req.query.search);
    //     
//
    //} else {
    //    view = 'guest-home'
    //    courses = await getRecent()
    //   
    //}
    const coins = await getAll();
    res.render('home', {
        title:'Home page',
        coins
       // user: req.user,
       //courses,
       //search: req.query.search
    });
    
});




module.exports = homeController;