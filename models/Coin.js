const { Schema, model, Types } = require ('mongoose');


const URL_PATTERN = /^https?:\/\/.+$/i; 

const coinSchema = new Schema ({
    name: {type: String, minlength: [2, 'The Name should be at least two characters'] },
    imageUrl: {
        type: String,
         validate: {
            validator: (value) => URL_PATTERN.test(value), 
            message: 'Image URL is not valid'
        }
    },
    price: {type: Number, min: [0.1, 'The Price should be a positive number'] },
    description: {
        type: String,
         minlength:[10, 'Description must at least 10 characters long']
        // maxlength:[50, 'Course description must at most 50 characters long']
    },
    paymentMethod: {type: String, required: true, enum: {
        values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal' ],
        message: 'Payment method is not valid'
    }},
    //duration: {type: String, required: [true, 'Duration is required']},
    //createAdt:{type: String, required: true, default: () => (new Date()).toISOString().slice(0, 10)}, 
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    //userCount: {type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User'}
});

coinSchema.index ({name: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Coin = model ('Coin', coinSchema);

module.exports = Coin;
