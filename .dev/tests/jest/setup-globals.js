
// TODO: Utilize the REST API without the global.
// Backbone REST API client
global.wp = {};

// Prevent console messages when running tests.
console = {
	...console,
	log: () => { },
	info: () => { },
	error: () => { },
};
