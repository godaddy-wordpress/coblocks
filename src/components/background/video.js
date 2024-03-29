/**
 * Background Video.
 *
 * @param {Object} attributes The attributes.
 * @return {string} html content.
 */
function BackgroundVideo( attributes ) {
	const {
		backgroundImg,
		backgroundType,
		videoMuted,
		videoLoop,
	} = attributes;

	return backgroundType === 'video'
		? <div className="coblocks-video-bg position-absolute overflow-hidden w-full h-full pin-t pin-r pin-b pin-l">
			{ /* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#playsinline */ }
			{ /* eslint-disable-next-line react/no-unknown-property */ }
			<video className="w-full h-full bg-center-center object-cover object-position" playsinline="" autoPlay="" muted={ videoMuted } loop={ videoLoop } src={ backgroundImg }></video>
		</div>
		: null;
}

export default BackgroundVideo;
