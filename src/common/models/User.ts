import * as mongoose from "mongoose";
import * as limitations from "common/constants/limitations";

export type Abstract<T> = {
	uid: T;
	email: T;
	password: T;
	name: T;
};

export type Type = Abstract<string>;

const Schema = new mongoose.Schema({
	uid: {
		type: String,
		unique: true,
		required: true,
		minlength: limitations.user.uid.minlength,
		maxlength: limitations.user.uid.maxlength,
		validate: limitations.user.uid.validate
	},
	email: {
		type: String,
		unique: true,
		required: true,
		maxlength: limitations.user.email.maxlength,
		validate: limitations.user.email.validate
	},
	password: {
		type: String,
		required: true,
		minlength: limitations.user.password.minlength,
		maxlength: limitations.user.password.maxlength,
		validate: limitations.user.password.validate
	},
	name: {
		type: String,
		required: true,
		minlength: limitations.user.name.minlength,
		maxlength: limitations.user.name.maxlength,
		validate: limitations.user.name.validate
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
