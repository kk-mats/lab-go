import * as React from "react";
import { TextField, InputAdornment, Button, Grid } from "@material-ui/core";

const LoginForm: React.FunctionComponent = () => {
	const [user, setUser] = React.useState({ uid: "", password: "" });

	const submitDisabled = (): boolean => {
		return !user.uid || !user.password;
	};

	return (
		<form>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						label="ID"
						type="text"
						value={user.uid}
						onChange={event => {
							setUser({
								...user,
								uid: event.target.value as string
							});
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									@
								</InputAdornment>
							)
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						label="Password"
						type="password"
						value={user.password}
						onChange={event => {
							setUser({
								...user,
								password: event.target.value as string
							});
						}}
					/>
				</Grid>
				<Button
					type="submit"
					variant="contained"
					disabled={submitDisabled()}
				>
					Sign in
				</Button>
			</Grid>
		</form>
	);
};

export default LoginForm;
