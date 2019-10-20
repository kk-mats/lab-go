import * as React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { Tab, Tabs, Grid, Hidden } from "@material-ui/core";

import LoginForm from "client/components/orgamisms/LoginForm";
import RegisterForm from "client/components/orgamisms/RegisterForm";
import CenteredForm from "client/components/templates/CenteredForm";

const Register: React.FunctionComponent = () => {
	const history = useHistory();
	const location = useLocation();
	const [index, setIndex] = React.useState(
		location.pathname === "/register" ? 1 : 0
	);

	const onChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
		history.push(newIndex === 1 ? "/register" : "/login");
		setIndex(newIndex);
	};

	return (
		<CenteredForm>
			<Grid container spacing={3}>
				<Hidden smDown>
					<Grid item xs={12} sm={6}>
						TODO HEADER
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={6}>
					<Tabs variant="fullWidth" value={index} onChange={onChange}>
						<Tab label="Sign in" />
						<Tab label="Sign up" />
					</Tabs>

					<Switch>
						<Route
							exact
							path="/register"
							component={RegisterForm}
						/>
						<Route path="/" component={LoginForm} />
					</Switch>
				</Grid>
			</Grid>
		</CenteredForm>
	);
};

export default Register;
