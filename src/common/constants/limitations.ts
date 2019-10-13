export const user = {
	uid: {
		minlength: 0,
		maxlength: 15,
		regex: /^[a-z]([a-z0-9-]){0,14}$/
	},
	email: {
		regex: /^.{1,}@.{1,}$/
	},
	password: {
		minlength: 16,
		maxlength: 64,
		regex: /^\w{8,64}$/
	},
	name: {
		minlength: 1,
		maxlength: 32,
		regex: /^.{1,32}$/
	}
};

export const record = {};
