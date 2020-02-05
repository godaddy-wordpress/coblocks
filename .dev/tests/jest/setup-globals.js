
// TODO: Utilize the REST API without the global.
// Backbone REST API client
global.wp = {
	api: {
		loadPromise: {
			then: () => { },
		},
		models: {},
	},
};

// Prevent console messages when running tests.
console = {
	log: () => { },
	info: () => { },
	error: () => { },
};
