/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		buttonColor,
		buttonText,
		customButtonColor,
		customTextColor,
		content,
		textColor,
		textAlign,
		via,
	} = attributes;

	const viaUrl = via ? `&via=${ via }` : '';

	// See PHP filter render_block_coblocks/click-to-tweet for [post_permalink] token replacement.
	const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=[post_permalink]${ viaUrl }`;

	const textColorClass = getColorClassName( 'color', textColor );

	const textClasses = classnames( 'wp-block-coblocks-click-to-tweet__text', {
		'has-text-color': textColor || customTextColor,
		[ textColorClass ]: textColorClass,
	} );

	const blockquoteClasses = classnames( { [ `has-text-align-${ textAlign }` ]: textAlign } );

	const textStyles = {
		color: textColorClass ? undefined : customTextColor,
	};

	const buttonColorClass = getColorClassName( 'background-color', buttonColor );

	const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
		'has-button-color': buttonColor || customButtonColor,
		[ buttonColorClass ]: buttonColorClass,
	} );

	const buttonStyles = {
		backgroundColor: buttonColorClass ? undefined : customButtonColor,
	};

	return (
		! RichText.isEmpty( content ) && (
			<blockquote className={ blockquoteClasses }>
				<RichText.Content
					{ ...useBlockProps.save( { className: textClasses } ) }
					className={ textClasses }
					style={ textStyles }
					tagName="p"
					value={ content }
				/>
				<RichText.Content
					{ ...useBlockProps.save( { className: buttonClasses } ) }
					href={ tweetUrl }
					rel="noopener noreferrer"
					style={ buttonStyles }
					tagName="a"
					target="_blank"
					value={ buttonText }
				/>
			</blockquote>
		)
	);
};

export default save;
