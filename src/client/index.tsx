import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "client/pages/Home";
import Register from "client/pages/Register";

const LabGo: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/register" component={Register} />
		</BrowserRouter>
	);
};

ReactDOM.render(<LabGo />, document.getElementById("root"));
