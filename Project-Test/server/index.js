const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const router = require("./Routers/routers");

const app = express();
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use(router);

const port = process.env.PORT || 8090;
const server = http.createServer(app);

/* Database Connection in mongodb-Atlas and server Setup*/
const url =
	"mongodb+srv://amal369krishnan:12345@cluster0.vvp7w.mongodb.net/project-test?retryWrites=true&w=majority";
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connection Successfull");
	})
	.catch((err) => console.log(err.message));
const connection = mongoose.connection;

connection
	.on("open", () => {
		console.log("Mongoose is connected with MongoDB");
	})
	.then(
		server.listen(port, () => {
			console.log(`Server running on the port : ${port}`);
		})
	);

/*Socket Setup */
const io = socketio(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
	console.log(socket.id);
});

global.io = io;
