import * as express from "express";
import {
	queryResult,
	isAvailableUid,
	isAvailableEmail
} from "./db/userMethods";

const validation = (req: express.Request, res: express.Response): void => {
	const { uid, email } = req.query;
	let result: queryResult<{ available: boolean }> = { available: false };

	(async (): Promise<void> => {
		if (uid) {
			result = await isAvailableUid(req.query.uid);
		} else if (email) {
			result = await isAvailableEmail(req.query.email);
		} else {
			result.error = {
				message: "invalid parameter query",
				query: req.query
			};
		}

		res.json(result);
	})();
};

export default validation;
