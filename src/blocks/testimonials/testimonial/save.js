/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import { BackgroundStyles } from '../../../components/background';

/**
 * WordPress dependencies.
 */
import { getColorClassName, RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'name' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

export default function save( { attributes } ) {
	const {
		alt,
		backgroundColor,
		customBackgroundColor,
		customTextColor,
		focalPoint,
		headingLevel,
		imageHeight,
		imageWidth,
		name,
		role,
		showImage,
		showRole,
		styleName,
		text,
		textColor,
		url,
	} = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );

	const styles = {
		...BackgroundStyles( attributes ),
		background: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
	};

	const classes = classnames(
		'wp-block-coblocks-testimonial', {
			[ backgroundClass ]: backgroundClass,
			'has-background-color': backgroundColor || customBackgroundColor,
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
		}
	);

	const renderImage = () => {
		const imageStyles = {
			height: imageHeight,
			width: imageWidth,
		};

		return !! showImage && url ? (
			<figure className="wp-block-coblocks-testimonial__image" style={ imageStyles }>
				<img
					alt={ alt }
					src={ url }
					style={ {
						objectPosition: focalPoint
							? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`
							: undefined,
					} }
				/>
			</figure>
		) : null;
	};

	const renderHeading = () => (
		<div className="wp-block-coblocks-testimonial__heading">
			<RichText.Content
				className="wp-block-coblocks-testimonial__heading__name"
				tagName={ `h${ headingLevel }` }
				value={ name }
			/>
			{ !! showRole && role && (
				<RichText.Content
					className="wp-block-coblocks-testimonial__heading__role"
					tagName="p"
					value={ role }
				/>
			) }
		</div>
	);

	const renderText = () => (
		<RichText.Content
			className="wp-block-coblocks-testimonial__text"
			itemprop="description"
			tagName="p"
			value={ text }
		/>
	);

	return isEmpty( attributes ) ? null : (
		<div className={ classes } style={ styles }>
			{ styleName === 'boxy' && (
				<>
					{ renderImage() }
					{ renderHeading() }
					{ renderText() }
				</>
			) }
			{ styleName === 'conversation' && (
				<>
					{ renderText() }
					<div className="wp-block-coblocks-testimonial__content">
						{ renderImage() }
						{ renderHeading() }
					</div>
				</>
			) }
			{ styleName === 'horizontal' && (
				<>
					{ renderImage() }
					<div className="wp-block-coblocks-testimonial__content">
						{ renderHeading() }
						{ renderText() }
					</div>
				</>
			) }
		</div>
	);
}
