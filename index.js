const mongoose = require('mongoose');
const User = require('./models/User.js');

module.exports.connect = () => {
    await mongoose.connect('mongodb+srv://pedestalapp:FKA0Z7ajvRdRC7Ez@cluster0.ib7jt.mongodb.net/pedestal?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports.User = User;
