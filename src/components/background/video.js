/**
 * External dependencies
 */
import PropTypes from 'prop-types';

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
			<video autoPlay="" className="w-full h-full bg-center-center object-cover object-position" loop={ videoLoop } muted={ videoMuted } playsinline="" src={ backgroundImg }></video>
		</div>
		: null;
}

BackgroundVideo.propTypes = {
	attributes: PropTypes.shape( {
		backgroundImg: PropTypes.string,
		backgroundType: PropTypes.string,
		videoLoop: PropTypes.bool,
		videoMuted: PropTypes.bool,
	} ),
};

export default BackgroundVideo;
