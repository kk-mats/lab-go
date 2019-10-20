import * as express from "express";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import register from "server/register";
import validation from "server/validation";
import * as User from "common/models/User";
import { dev } from "common/constants/variables";

mongoose.connect(dev.url.userDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const router = express.Router();

server.use(express.static(path.join("./", "dist")));

server.use(passport.initialize());

server.get("/api", (req, res) => {
	res.send({ api: "test" });
});

server.get("/api/register/validation", validation);

server.post("/api/register", register);

server.post(
	"/api/login",
	passport.authenticate(
		"local",
		{ failureRedirect: "/login" },
		(req, res: express.Response) => {
			res.redirect("/");
		}
	)
);

server.listen(3000, () => {
	console.log("server started");
});
