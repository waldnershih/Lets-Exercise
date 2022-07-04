// only server code
if (process.env.NODE_ENV !== 'production') {
	// if not a production mode
	require('dotenv').config();
}

const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./utils/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
	await mongoConnect();

	server.listen(PORT, () => {
		console.log(`Linstening on ${PORT}...`);
	});
}

// console.log(readJsonFile());

startServer();
