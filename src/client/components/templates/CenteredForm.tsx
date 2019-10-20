import * as React from "react";
import { Container } from "@material-ui/core";

type Props = {
	children: React.ReactNode;
};

const CenteredForm: React.FunctionComponent<Props> = (props: Props) => {
	const { children } = props;
	return <Container maxWidth="md">{children}</Container>;
};

export default CenteredForm;
