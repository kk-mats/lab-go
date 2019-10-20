import * as express from "express";

import { saveUser } from "server/db/userMethods";
import * as User from "common/models/User";
import LGResponse from "common/types/LGResponse";

type RegisterationError =
	| string
	| {
			uid?: string;
			email?: string;
			password?: string;
			name?: string;
	  };

const register = (req: express.Request, res: express.Response): void => {
	const user = req.body as User.Type;
	const { uid, email, password, name } = user;
	const r: LGResponse<RegisterationError> = { success: false };

	if (!uid) {
		r.error = { uid: `Missing Property: User ID` };
	}
	if (!email) {
		r.error = { email: `Missing Property: Email` };
	}
	if (!password) {
		r.error = { password: `Missing Property: Password` };
	}
	if (!name) {
		r.error = { name: `Missing Property: Username` };
	}

	if (r.error) {
		res.json(r);
	}

	(async () => {
		const { success, error } = await saveUser(user);
		r.success = success;
		if (error) {
			r.error = JSON.stringify(error);
		}
		console.log(r);
		res.json(r);
	})();
};

export default register;
