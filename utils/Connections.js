const mongoose = require('mongoose');

module.exports.connect = async () => {
	const user = process.env.MONGODB_USER;
	const password = process.env.MONGODB_PASSWORD;
	const cluster = process.env.MONGODB_CLUSTER;
	const database = process.env.MONGODB_DATABASE;

	await mongoose.connect(
		`mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		}
	);
};
