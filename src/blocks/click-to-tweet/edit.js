/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';
import { computeFontSize } from '../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText, withFontSizes } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';

/**
 * Block constants
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getPermalink } = select( 'core/editor' );

	return {
		postLink: getPermalink(),
	};
} );

const Edit = ( props ) => {
	const {
		attributes,
		buttonColor,
		className,
		isSelected,
		setAttributes,
		textColor,
		fontSize,
		onReplace,
	} = props;

	const {
		buttonText,
		content,
		textAlign,
	} = attributes;

	const blockquoteClasses = classnames( className, { [ `has-text-align-${ textAlign }` ]: textAlign } );

	return (
		<>
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<blockquote className={ blockquoteClasses }>
				<RichText
					tagName="p"
					multiline="false"
					/* translators: the text of the click to tweet element */
					placeholder={ __( 'Add a quote to tweet…', 'coblocks' ) }
					value={ content }
					allowedFormats={ [] } // disable controls
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__text', {
							'has-text-color': textColor.color,
							[ textColor.class ]: textColor.class,
							[ fontSize?.class ]: fontSize?.class,
						}
					) }
					style={ {
						color: textColor.color,
						fontSize: computeFontSize( fontSize ),
					} }
					onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
					keepPlaceholderOnFocus
					onRemove={ ( forward ) => {
						const hasEmptyTweet = content.length === 0 || content.length === 1;

						if ( ! forward && hasEmptyTweet ) {
							onReplace( [] );
						}
					} }
				/>
				<RichText
					tagName="span"
					multiline="false"
					placeholder={ __( 'Add button…', 'coblocks' ) }
					value={ buttonText }
					allowedFormats={ [] } // disable controls
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__twitter-btn', {
							'has-button-color': buttonColor.color,
							[ buttonColor.class ]: buttonColor.class,
						}
					) }
					style={ {
						backgroundColor: buttonColor.color,
					} }
					onChange={ ( nextButtonText ) => setAttributes( { buttonText: nextButtonText } ) }
					keepPlaceholderOnFocus
				/>
			</blockquote>
		</>
	);
};

export default compose( [
	applyWithSelect,
	applyWithColors,
	withFontSizes( 'fontSize' ),
] )( Edit );
