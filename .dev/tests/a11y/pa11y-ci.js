module.exports = {
	defaults: {
		timeout: 5000,
		viewport: {
			width: 1280,
			height: 720,
		},
		actions: [
			'wait for element button[aria-label="Previous"] to be visible'
		]
	},
	concurrency: 1,
	urls: [
		"http://coblocks.test"
	]
};
