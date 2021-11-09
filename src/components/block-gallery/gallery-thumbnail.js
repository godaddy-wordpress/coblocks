import classnames from 'classnames';

const GalleryCarouselThumbnail = ({ changeStep, item, index }) => {
    return (
		<div className={classnames( {
			'wp-block-coblocks-gallery-carousel-thumbnail': true,
			'is-active': false,
		} )} style={{ height: '80px', width: '100px' }} onClick={() => changeStep( index )} >
			<img src={ item.url } alt={ item.alt } data-link={ item.link } data-id={ item.id } style={{ height: '100%', width: '100%' }} />	
		</div>
	);
}

export default GalleryCarouselThumbnail;