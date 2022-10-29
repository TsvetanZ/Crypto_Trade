const { hasUser } = require('../middlewares/guards');
const { create, getById, update, enrollUser, getAll, buyCoin } = require('../services/coinService');
const { parseError } = require('../util/parser');

const coinController = require('express').Router();



coinController.get('/create', hasUser(), (req, res) =>{
    res.render('create', {
        title: 'Coin Create'
    })
});

coinController.get('/catalog', async(req, res) => {
    const coins = await getAll();
    res.render('catalog', {
        title:'Crypto Trade',
        coins
    });
})

coinController.get('/:id', hasUser(), async (req, res) =>{
    const coin = await getById(req.params.id);

    coin.isOwner = coin.owner.toString() == req.user._id.toString();
    coin.buy = coin.users.map(x => x.toString()).includes(req.user._id).toString(); // това е за съобщението  че е записъл;
   console.log(coin.buy)

    res.render('details-coin', {
        title: 'Details',
        coin
    });
});

coinController.post( '/create', hasUser(), async (req, res) => {
    const coin = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price:req.body.price,
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        owner: req.user._id
    };

    
    try {
        if(Object.values(coin).some(v=> !v)){
            throw new Error('All feilds are required')
        }
        const result = await create(coin);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
           title: 'Create coin',
            body: coin,
            errors:parseError(error)
        });
       
    }
});



coinController.get('/:id/delete', hasUser(), async(req, res) =>{
    const coin =await getById(req.params.id);
   // if(course.owner != req.user._id) {
      if (coin.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login')
    } 
    await deleteCoin(req.params.id)
    res.redirect('/')
});



coinController.get('/:id/edit', hasUser(), async(req, res) =>{
    const coin =await getById(req.params.id);
    if(coin.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    
    res.render('edit', {
        title: 'Edit',
        coin
    })
});



coinController.post('/:id/edit', hasUser(), async(req, res) =>{
    const coin = await getById(req.params.id);

    if(coin.owner.toString() != req.user._id.toString()){
        return res.redirect('/auth/login')
    }

    try { 
        await update(req.params.id, req.body)
        res.redirect(`/coin/${req.params.id}`);
    } catch (error) {
        res.render('edit-course', {
            title: 'Edit',
            coin: req.body,
            errors:parseError(error)
        });  
    }
});


coinController.get('/:id/buy', async(req, res) => {
    const coin = await getById(req.params.id);
    console.log(coin)
   

    if(coin.owner.toString() != req.user._id.toString()
    && coin.users.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        console.log('MMM')
        await buyCoin(req.params.id, req.user._id);
    }

    return res.redirect(`/coin/${req.params.id}`)

});




module.exports = coinController;