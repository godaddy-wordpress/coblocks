module.exports = {
	defaults: {
		timeout: 35000,
		viewport: {
			width: 1280,
			height: 720,
		},
		actions: [
			'screen capture ./.dev/tests/a11y/pa11y-homepage.png',
			'wait for element button[aria-label="Previous"] to be visible'
		]
	},
	concurrency: 1,
	urls: [
		"http://coblocks.test"
	]
};
