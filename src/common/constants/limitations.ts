type validator = (value: string) => boolean | string;

export const user = {
	uid: {
		minlength: 1,
		maxlength: 16,
		validate: /^[a-zA-Z\d](([a-zA-Z\d-]){0,14}[a-zA-Z\d])?$/
	},
	email: {
		maxlength: 128,
		validate: /^\S+@\S+\.\S+$/
	},
	password: {
		minlength: 8,
		maxlength: 128,
		validate: /^.*(([A-Z].*[0-9])|([0-9].*[A-Z])).*$/
	},
	name: {
		minlength: 1,
		maxlength: 32,
		validate: /^.{1,32}$/
	}
};

export const record = {};
