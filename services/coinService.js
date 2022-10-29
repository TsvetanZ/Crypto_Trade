const Coin = require('../models/Coin')

async function getAll(){
    return  Coin.find({}).lean();
    //return  Course.find({}).sort({createAdt:1 }).lean();// по този начин го сортираме по дата на създаване
}

//async function getAllByDate(search) { // this is  for search
//    const query = {};
//    if(search) {
//        query.title = new RegExp(search, `i`);
//    }
//        return  Course.find(query).sort({createAdt:1 }).lean();
//}

//async function getRecent(){
//    return  Course.find({}).sort({userCount:-1 }).limit(3).lean();//  по този начин го сортираме по  userCount в намаляващ ред
//}

async function getById(id){
    return Coin.findById(id).lean();
}

//async function getByUserBooking(userId){
//    return Course.find({bookings: userId}).lean();
//} 

async function create(coin) {
    return Coin.create(coin)
}

async function update(id, data) {
    const existing = await Coin.findById(id);

    existing.name = data.name;
    existing.imageUrl = data.imageUrl;
    existing.description = data.description;
    existing.price = data.price;
    existing.paymentMethod = data.paymentMethod;
   
    //await existing.save();

    return existing.save();
}

async function deleteCoin (id) {
     await Coin.findByIdAndDelete(id);
}

async function buyCoin(coinId, userId) {
    const existing = await Coin.findById(coinId);
    existing.users.push(userId);
    //existing.userCount++; userCount
    return existing.save();
}
//async function bookRooom (hotelId, userId) {
//    const hotel = await Course.findById(hotelId);
//
//    if(hotel.bookings.includes(userId)) { 
//        throw new Error('Cannot book twice ');
//    }
//    hotel.bookings.push(userId);
//    hotel.rooms = hotel.rooms-1;
//    await hotel.save();
//}





module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteCoin,
    buyCoin
}