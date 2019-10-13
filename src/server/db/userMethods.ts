import * as User from "common/models/User";

require("mongoose").Promise = global.Promise;

export type queryResult<T> = T & {
	error?: any;
};

export const isAvailableUid = async (
	uid: string
): Promise<queryResult<{ available: boolean }>> => {
	const result: queryResult<{ available: boolean }> = { available: false };

	try {
		result.available = !(await User.Model.findOne({ uid }).exec());
	} catch (err) {
		result.error = err;
	}

	return result;
};

export const isAvailableEmail = async (
	email: string
): Promise<queryResult<{ available: boolean }>> => {
	const result: queryResult<{ available: boolean }> = { available: false };
	console.log(email);
	try {
		result.available = !(await User.Model.findOne({ email }).exec());
	} catch (err) {
		result.error = err;
	}

	return result;
};

export const saveUser = (
	user: User.Type
): queryResult<{ success: boolean }> => {
	const result: queryResult<{ success: boolean }> = { success: false };

	(async () => {
		const uid = await isAvailableUid(user.uid);
		const email = await isAvailableEmail(user.email);

		if (!uid.available || !email.available) {
			result.success = false;
			result.error = {
				uid: uid.error,
				email: email.error
			};
		}
	})();

	const instance = new User.Model();
	instance.uid = user.uid;
	instance.email = user.email;
	instance.password = user.password;
	instance.name = user.name;

	let res: queryResult<{ success: boolean }> = { success: false };
	instance.save(err => {
		if (err) {
			res = {
				success: false,
				error: err
			};
		}
	});

	return res;
};
