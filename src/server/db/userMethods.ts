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

export const saveUser = async (
	user: User.Type
): Promise<queryResult<{ success: boolean }>> => {
	const result: queryResult<{ success: boolean }> = { success: false };

	const [uid, email] = await Promise.all([
		isAvailableUid(user.uid),
		isAvailableEmail(user.email)
	]);

	result.success = uid.available && email.available;
	if (!uid.available) {
		result.error = `User ID: ${user.uid} is not available.`;
	}
	if (!email.available) {
		result.error = `E-mail: ${user.email} is not available.`;
	}

	if (!result.success) {
		return result;
	}

	const instance = new User.Model();
	instance.uid = user.uid;
	instance.email = user.email;
	instance.password = user.password;
	instance.name = user.name;

	await instance.save(err => {
		if (err) {
			result.success = false;
			result.error = err;
		}
	});

	return result;
};
