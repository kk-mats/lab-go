import * as mongoose from "mongoose";
import * as limitations from "common/constants/limitations";

export type Type = {
	uid: string;
	email: string;
	password: string;
	name: string;
};

const Schema = new mongoose.Schema({
	uid: {
		type: String,
		unique: true,
		required: true,
		minlength: limitations.user.uid.minlength,
		maxlength: limitations.user.uid.maxlength,
		validate: limitations.user.uid.regex
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: limitations.user.email.regex
	},
	password: {
		type: String,
		required: true,
		minlength: limitations.user.password.minlength,
		maxlength: limitations.user.password.maxlength,
		validate: limitations.user.password.regex
	},
	name: {
		type: String,
		required: true,
		minlength: limitations.user.name.minlength,
		maxlength: limitations.user.name.maxlength,
		validate: limitations.user.name.regex
	}
});

export const ModelName = "master";
export const CollectionName = "master";
export const Model = mongoose.model<Type & mongoose.Document>(
	ModelName,
	Schema,
	CollectionName
);

export default Model;
