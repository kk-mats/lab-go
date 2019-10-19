import * as limitations from "common/constants/limitations";

export const uid = {
	INVALID:
		"User ID may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.",
	NOT_AVAILABLE: "User ID is not available.",
	TOO_LONG: `User ID is too long (maximum is ${limitations.user.uid.maxlength} characters).`
};

export const email = {
	INVALID: "It is invalid e-mail address.",
	NOT_AVAILABLE: "E-mail is not available.",
	TOO_LONG: `E-mail is too long (maximum is ${limitations.user.email.maxlength} characters).`
};

export const password = {
	INVALID:
		"Password must be at least 8 characters include a number and a uppercase letter",
	TOO_SHORT: `Password is too short (minimum is ${limitations.user.password.minlength} characters).`,
	TOO_LONG: `Password is too long (maximum is ${limitations.user.password.maxlength} characters).`
};

export const name = {
	TOO_SHORT: `User name is too short (minimum is ${limitations.user.name.minlength} characters).`,
	TOO_LONG: `User name is too long (maximum is ${limitations.user.name.minlength} characters).`
};
