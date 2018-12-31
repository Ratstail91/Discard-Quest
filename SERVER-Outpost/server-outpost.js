// .env Variables
require("dotenv").config({path: "../.env"});

//socket.io setup
let server = require("http").createServer();
let io = require("socket.io")(server);
let ioAuth = require("socketio-auth");

ioAuth(io, {
	authenticate: function(socket, data, callback) {
		return callback(null, data.SERVER_PASS_KEY === process.env.SERVER_PASS_KEY);
	},
	postAuthenticate: function(socket, data) {
		console.log("Authenticated: " + data.username);
		socket.client.username = data.username;
	}
});

//mysql
let mysql = require("mysql");

let dbConnection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD
});

dbConnection.connect(err => {
	if (err) throw err;
	console.log("Connected to the database");
	dbConnection.query("USE discard;");
});

//TODO: isolate these responses to specific bots
io.on("connection", async (socket) => {
	console.log("made socket connection");

	socket.on("disconnect", async () => {
		console.log(socket.client.username + " disconnected");
	});

	socket.on("serverPing", handleServerPing);
});

//listen
server.listen(process.env.SERVER_PORT);
console.log("listening on port " + process.env.SERVER_PORT);

//utilities
async function dbLog(id, type, data) {
	let query = "INSERT INTO log (discordID, type, data) VALUES (?, ?, ?);";
	return dbConnection.query(query, [id, type, data], (err, result) => {
		if (err) throw err;
	});
}

//respond to a ping with a pong
async function handleServerPing(data, fn) {
	return fn("SERVER PONG!");
}
