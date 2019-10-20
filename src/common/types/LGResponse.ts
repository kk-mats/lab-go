type LGResponse<E = any, T = {}> = T & {
	success: boolean;
	error?: E;
};

export default LGResponse;
