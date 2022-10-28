const {Schema, model} = require('mongoose');

//TODO add User properties list and validation according to assigment
const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: [5, 'Username must be at last 5 characters']}, //  "unique: true" work only there is index(userSchema.index)
    email: {type: String, required: true, unique: true},
    hashedPassword: {type: String, required:  true},
});

userSchema.index ({username: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index ({email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

