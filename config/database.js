const mongoose = require('mongoose');


// TODO  change datanase according to assigment
const CONNECTION_STRING = 'mongodb://localhost:27017/coin'; // change name next to take real thema(task)


module.exports = async (app) => {
try {
    await mongoose.connect(CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Database connected');
    
    } catch (error) {
        console.error(error.message);
        //console.error('Error initializing database')
        process.exit(1)

    }
};