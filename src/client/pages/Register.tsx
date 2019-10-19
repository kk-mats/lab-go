import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Button, TextField, InputAdornment, ListItem } from "@material-ui/core";

import * as UserError from "common/constants/errorMessages/UserError";
import * as limitations from "common/constants/limitations";
import * as User from "common/models/User";

const isAvailable = async (key: string, value: string): Promise<boolean> => {
	return axios
		.get(`/api/register/validation?${key}=${value}`)
		.then((res: AxiosResponse<{ available: boolean; error?: any }>) => {
			const { available, error } = res.data;
			if (error) {
				throw error;
			}
			return available;
		})
		.catch(err => {
			console.log(err);
			return false;
		});
};

const validators = {
	uid: async (value: string): Promise<string> => {
		if (value.length > limitations.user.uid.maxlength) {
			return UserError.uid.TOO_LONG;
		}

		if (!limitations.user.uid.validate.exec(value)) {
			return UserError.uid.INVALID;
		}

		if (await isAvailable("uid", value)) {
			return "";
		}

		return UserError.uid.NOT_AVAILABLE;
	},
	email: async (value: string): Promise<string> => {
		if (value.length > limitations.user.email.maxlength) {
			return UserError.email.TOO_LONG;
		}

		if (!limitations.user.email.validate.exec(value)) {
			return UserError.email.INVALID;
		}

		if (await isAvailable("email", value)) {
			return "";
		}

		return UserError.email.NOT_AVAILABLE;
	},
	password: async (value: string): Promise<string> => {
		if (value.length < limitations.user.password.minlength) {
			return UserError.password.TOO_SHORT;
		}

		if (value.length > limitations.user.password.maxlength) {
			return UserError.password.TOO_LONG;
		}

		if (limitations.user.password.validate.exec(value)) {
			return "";
		}

		return UserError.password.INVALID;
	},
	name: async (value: string): Promise<string> => {
		if (value.length < limitations.user.name.minlength) {
			return UserError.name.TOO_SHORT;
		}

		if (value.length > limitations.user.name.maxlength) {
			return UserError.name.TOO_LONG;
		}

		return "";
	}
};

type Field = {
	key: keyof User.Type;
	label: string;
	type: string;
	InputProps?: {
		startAdornment: any;
	};
};

const fields: Field[] = [
	{
		key: "uid",
		label: "ID",
		type: "text",
		InputProps: {
			startAdornment: <InputAdornment position="start">@</InputAdornment>
		}
	},
	{
		key: "email",
		label: "E-mail",
		type: "email"
	},
	{
		key: "password",
		label: "Password",
		type: "password"
	},
	{
		key: "name",
		label: "Username",
		type: "text"
	}
];

const Register: React.FunctionComponent<RouteComponentProps> = (
	props: RouteComponentProps
) => {
	const [user, setUser] = React.useState<User.Type>({
		uid: "",
		email: "",
		password: "",
		name: ""
	});

	const [helperText, setHelperText] = React.useState<User.Type>({
		uid: UserError.uid.INVALID,
		email: UserError.email.INVALID,
		password: UserError.password.INVALID,
		name: UserError.name.TOO_SHORT
	});

	const onChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		key: string,
		callback: (value: string) => Promise<string>
	): void => {
		const { value } = event.target;
		setUser({ ...user, [key]: value });
		callback(value).then((text: string) => {
			setHelperText({
				...helperText,
				[key]: text
			});
		});
	};

	const onSubmit = React.useCallback(
		(event: React.FormEvent<HTMLFormElement>): void => {
			event.preventDefault();
			axios
				.post("/api/register", user)
				.then(
					(
						res: AxiosResponse<{
							success: boolean;
							redirect: string;
							error?: any;
						}>
					) => {
						const { success, error } = res.data;
						if (success) {
							props.history.push("/");
						}
					}
				);
		},
		[user]
	);

	const submitDisabled = React.useCallback((): boolean => {
		const { uid, email, password, name } = helperText;
		return (
			uid.length > 0 ||
			email.length > 0 ||
			password.length > 0 ||
			name.length > 0
		);
	}, [helperText]);

	return (
		<form onSubmit={onSubmit}>
			{fields.map(field => {
				const { key, label, type, InputProps } = field;
				return (
					<TextField
						required
						key={key}
						label={label}
						type={type}
						value={user[key]}
						error={Boolean(helperText[key])}
						helperText={helperText[key]}
						InputProps={InputProps || {}}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						): void => {
							onChange(event, key, validators[key]);
						}}
					/>
				);
			})}

			<Button type="submit" disabled={submitDisabled()}>
				Submit
			</Button>
		</form>
	);
};

export default Register;
