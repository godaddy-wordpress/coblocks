/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

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
		color,
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
		url,
	} = attributes;

	const saveBlockProps = useBlockProps.save();

	const styles = {
		backgroundColor,
		color,
	};

	const bubbleStyles = {
		backgroundColor: color,
		color: backgroundColor,
	};

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
			className={ classnames(
				'wp-block-coblocks-testimonial__text'
			) }
			itemprop="description"
			style={ styleName === 'conversation' ? bubbleStyles : null }
			tagName="p"
			value={ text }
		/>
	);

	const renderTextBubble = () => (
		<div className="wp-block-coblocks-testimonial__text-bubble">
			{ renderText() }
			<span className={ classnames(
				'wp-block-coblocks-testimonial__text-bubble__tip-back'
			) } style={ { backgroundColor: color ?? undefined } }></span>
			<span className={ classnames(
				'wp-block-coblocks-testimonial__text-bubble__tip-front'
			) } style={ { backgroundColor: backgroundColor ?? undefined } }></span>
		</div>
	);

	return isEmpty( attributes ) ? null : (
		<div { ...saveBlockProps } style={ styles }>
			{ styleName === 'tall' && (
				<>
					{ renderImage() }
					{ renderHeading() }
					{ renderText() }
				</>
			) }
			{ styleName === 'conversation' && (
				<>
					{ renderTextBubble() }
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
