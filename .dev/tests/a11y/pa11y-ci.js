module.exports = {
	defaults: {
		timeout: 5000,
		viewport: {
			width: 1280,
			height: 720,
		}
	},
	concurrency: 1,
	urls: [
		"http://coblocks.test"
	],
	actions: [
		'wait for element img[alt="Image"] to be visible'
	]
};
