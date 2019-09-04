/**
 * External dependencies
 */
import classnames from 'classnames';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import brandAssets from '../../utils/brand-assets';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const save = ( { attributes } ) => {
	const {
		coblocks,
		hasCardShadow,
		hasImgShadow,
		paddingSize,
		mediaAlt,
		mediaType,
		mediaUrl,
		mediaWidth,
		mediaId,
		maxWidth,
		mediaPosition,
		isStackedOnMobile,
		align,
	} = attributes;

	// Media.
	const mediaTypeRenders = {
		image: () => <img src={ mediaUrl } alt={ mediaAlt } className={ ( mediaId && mediaType === 'image' ) ? `wp-image-${ mediaId }` : null } />,
		video: () => <video controls src={ mediaUrl } />,
	};

	let gridTemplateColumns;
	if ( mediaWidth !== 55 ) {
		gridTemplateColumns = mediaPosition === 'right' ? `auto ${ mediaWidth }%` : `${ mediaWidth }% auto`;
	}

	let classes = classnames( {
		[ `is-style-${ mediaPosition }` ]: mediaPosition,
		'has-no-media': ! mediaUrl || null,
		'is-stacked-on-mobile': isStackedOnMobile,
	} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-media-card-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-media-card__inner',
		...BackgroundClasses( attributes ), {
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
		} );

	const innerStyles = {
		...BackgroundStyles( attributes ),
	};

	const wrapperStyles = {
		gridTemplateColumns,
		maxWidth: maxWidth ? ( 'full' === align || 'wide' === align ) && maxWidth : undefined,
	};

	const cardClasses = classnames(
		'wp-block-coblocks-media-card__content', {
			'has-shadow': hasCardShadow,
		} );

	return (
		<div className={ classes }>
			<div className={ innerClasses } style={ innerStyles } >
				{ BackgroundVideo( attributes ) }
				<div className="wp-block-coblocks-media-card__wrapper" style={ wrapperStyles }>
					<figure className={ classnames(
						'wp-block-coblocks-media-card__media', {
							'has-shadow': hasImgShadow,
						}
					) }
					>
						{ ( mediaTypeRenders[ mediaType ] || noop )() }
						{ ! mediaUrl ? brandAssets.logo : null }
					</figure>
					<div className={ cardClasses }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
};

export default save;
