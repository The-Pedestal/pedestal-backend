const mongoose = require('mongoose');
const User = require('./models/User.js');

module.exports.connect = async (user, password, cluster, database) => {
    await mongoose.connect(`mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports.User = User;
