import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Button, TextField, InputAdornment } from "@material-ui/core";

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

type registerFormElement = {
	label: string;
	type: string;
	value: keyof User.Type;
	validator: RegExp;
};

const normalFormElements: registerFormElement[] = [
	{
		label: "Name",
		type: "text",
		value: "name",
		validator: limitations.user.name.regex
	},
	{
		label: "Password",
		type: "password",
		value: "password",
		validator: limitations.user.password.regex
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

	const [missing, setMissing] = React.useState({
		uid: true,
		email: true,
		password: true,
		name: true
	});

	const onChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		key: string,
		callback: (value: string) => void
	): void => {
		const { value } = event.target;
		setUser({ ...user, [key]: value });
		callback(value);
	};

	const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const { uid, email, password, name } = user;
		const fd = new FormData();
		fd.append("uid", uid);
		fd.append("email", email);
		fd.append("password", password);
		fd.append("name", name);

		axios
			.post("/api/register", fd)
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
	};

	const submitDisabled = (): boolean => {
		const { uid, email, password, name } = missing;
		return uid || email || password || name;
	};

	return (
		<form onSubmit={onSubmitHandler}>
			<TextField
				required
				label="ID"
				name="uid"
				type="text"
				value={user.uid}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">@</InputAdornment>
					)
				}}
				error={missing.uid}
				onChange={(
					event: React.ChangeEvent<HTMLInputElement>
				): void => {
					const validate = (value: string): void => {
						(async (): Promise<void> => {
							const available = await isAvailable("uid", value);
							setMissing({
								...missing,
								uid:
									limitations.user.uid.regex.exec(value) ===
										null || !available
							});
						})();
					};
					onChange(event, "uid", validate);
				}}
			/>
			<TextField
				required
				label="E-mail"
				name="email"
				type="email"
				value={user.email}
				error={missing.email}
				onChange={(
					event: React.ChangeEvent<HTMLInputElement>
				): void => {
					const validate = (value: string): void => {
						(async (): Promise<void> => {
							const available = await isAvailable("email", value);
							setMissing({
								...missing,
								email:
									limitations.user.email.regex.exec(value) ===
										null || !available
							});
						})();
					};
					onChange(event, "email", validate);
				}}
			/>

			{normalFormElements.map(e => {
				return (
					<TextField
						key={e.label}
						required
						label={e.label}
						name={e.label}
						type={e.type}
						value={user[e.value]}
						error={missing[e.value]}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						): void => {
							const validate = (value: string): void => {
								const eError = !e.validator.exec(value);
								setMissing({
									...missing,
									[e.value]: eError
								});
							};
							onChange(event, e.value, validate);
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

export default withRouter(Register);
