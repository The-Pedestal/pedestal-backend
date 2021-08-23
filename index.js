const mongoose = require('mongoose');
const User = require('./models/User.js');
const Connection = require('./models/Connection.js');
const Interests = require('./models/Interest.js');
const CONNECTION_STATUSES = require('./constants/ConnectionStatuses.js');

module.exports.connect = async (user, password, cluster, database) => {
    await mongoose.connect(`mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports.User = User;
module.exports.Connection = Connection;
module.exports.Interests = Interests;

module.exports.CONSTANTS = {
    CONNECTION_STATUSES: CONNECTION_STATUSES
};
