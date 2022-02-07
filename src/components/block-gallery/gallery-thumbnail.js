import classnames from 'classnames';
import PropTypes from 'prop-types';

const GalleryCarouselThumbnail = ( { changeStep, item, index } ) => {
	return (
		<button className={ classnames( {
			'is-active': false,
			'wp-block-coblocks-gallery-carousel-thumbnail': true,
		} ) } onClick={ () => changeStep( index ) } style={ { height: '80px', width: '100px' } } >
			<img alt={ item.alt } data-id={ item.id } data-link={ item.link } src={ item.url } style={ { height: '100%', width: '100%' } } />
		</button>
	);
};

export default GalleryCarouselThumbnail;

GalleryCarouselThumbnail.propTypes = {
	changeStep: PropTypes.func,
	index: PropTypes.number,
	item: PropTypes.shape( {
		alt: PropTypes.string,
		id: PropTypes.number,
		link: PropTypes.string,
		url: PropTypes.string,
	} ),
};
