import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Register from "client/components/pages/Register";

const LabGo: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Route path="/" component={Register} />
		</BrowserRouter>
	);
};

ReactDOM.render(<LabGo />, document.getElementById("root"));
