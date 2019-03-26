/**
 * Background Video
 */
function BackgroundVideo( attributes ) {

	const {
		backgroundImg,
		backgroundType,
		videoMuted,
		videoLoop,
	} = attributes;

	return [
		backgroundType == 'video' ?
			<div className="coblocks-video-background">
				<video playsinline="" autoplay="" muted={ videoMuted } loop={ videoLoop } src={ backgroundImg } ></video>
			</div>
		: null
	];
}

export default BackgroundVideo;