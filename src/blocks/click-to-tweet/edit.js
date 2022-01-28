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

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText, useBlockProps } from '@wordpress/block-editor';
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
		onReplace,
	} = props;

	const {
		buttonText,
		content,
		textAlign,
	} = attributes;

	const blockquoteClasses = classnames( className, { [ `has-text-align-${ textAlign }` ]: textAlign } );

	const blockProps = useBlockProps();

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
			<blockquote className={ blockquoteClasses } { ...{ ...blockProps } }>
				<RichText
					allowedFormats={ [] }
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__text', {
							'has-text-color': textColor.color,
							[ textColor.class ]: textColor.class,
						}
					) }
					/* translators: the text of the click to tweet element */
					multiline="false"
					onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
					onRemove={ ( forward ) => {
						const hasEmptyTweet = content.length === 0 || content.length === 1;

						if ( ! forward && hasEmptyTweet ) {
							onReplace( [] );
						}
					} } // disable controls
					placeholder={ __( 'Add a quote to tweet…', 'coblocks' ) }
					style={ {
						color: textColor.color,
					} }
					tagName="p"
					value={ content }
				/>
				<RichText
					allowedFormats={ [] }
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__twitter-btn', {
							'has-button-color': buttonColor.color,
							[ buttonColor.class ]: buttonColor.class,
						}
					) }
					multiline="false"
					onChange={ ( nextButtonText ) => setAttributes( { buttonText: nextButtonText } ) }
					placeholder={ __( 'Add button…', 'coblocks' ) } // disable controls
					style={ {
						backgroundColor: buttonColor.color,
					} }
					tagName="span"
					value={ buttonText }
				/>
			</blockquote>
		</>
	);
};

export default compose( [
	applyWithSelect,
	applyWithColors,
] )( Edit );
