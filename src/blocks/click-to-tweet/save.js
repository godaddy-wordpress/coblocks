/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { blockStylesToDescend } from '../../utils/helper.js';

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
	const saveBlockProps = useBlockProps.save( { className: blockquoteClasses } );
	const descendingBlockStyles = blockStylesToDescend( saveBlockProps );

	const textStyles = {
		color: textColorClass ? undefined : customTextColor,
		...descendingBlockStyles,
	};

	const buttonColorClass = getColorClassName( 'background-color', buttonColor );

	const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
		[ buttonColorClass ]: buttonColorClass,
		'has-button-color': buttonColor || customButtonColor,
	} );

	const buttonStyles = {
		backgroundColor: buttonColorClass ? undefined : customButtonColor,
	};

	return (
		! RichText.isEmpty( content ) && (
			<blockquote { ...saveBlockProps }>
				<RichText.Content
					className={ textClasses }
					style={ textStyles }
					tagName="p"
					value={ content }
				/>
				<RichText.Content
					className={ buttonClasses }
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
