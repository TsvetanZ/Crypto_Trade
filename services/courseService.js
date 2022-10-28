const Course = require('../models/Course')

//async function getAllByDate(){
//    return  Course.find({}).sort({createAdt:1 }).lean();// по този начин го сортираме по дата на създаване
//}

async function getAllByDate(search) { // this is  for search
    const query = {};
    if(search) {
        query.title = new RegExp(search, `i`);
    }
        return  Course.find(query).sort({createAdt:1 }).lean();
}

async function getRecent(){
    return  Course.find({}).sort({userCount:-1 }).limit(3).lean();//  по този начин го сортираме по  userCount в намаляващ ред
}

async function getById(_id){
    return Course.findById(_id).lean();
}

//async function getByUserBooking(userId){
//    return Course.find({bookings: userId}).lean();
//} 

async function create(course) {
    return Course.create(course)
}

async function update(id, data) {
    const existing = await Course.findById(id);
   
    existing.title = data.title;
    existing.description = data.description;
    existing.imageUrl = data.imageUrl;
    existing.duration = data.duration;
   
    //await existing.save();

    return existing.save();
}

async function deleteCourseById (id) {
     await Course.findByIdAndDelete(id);
}

async function enrollUser(courseId, courseId) {
    const existing = await Course.findById(courseId);
    existing.users.push(userId);
    existing.userCount++; userCount
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
    getAllByDate,
    getRecent,
    getById,
    create,
    update,
    deleteCourseById,
    enrollUser,
}