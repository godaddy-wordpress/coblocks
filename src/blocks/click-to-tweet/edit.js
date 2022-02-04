/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { RichText, useBlockProps } from '@wordpress/block-editor';

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

	const blockProps = useBlockProps( { className: blockquoteClasses } );
	/**
	 * blockStylesToDescend is an Immediately Invoked Function Expression.
	 *
	 * The `blockProps` will indicate in the editor what is the block root
	 * by applying block classnames and DOM attributes. By default `blockProps`
	 * will contain the block styles set through block supports.
	 *
	 * We can descend those styles into sub components and thereby
	 * eliminate superfluous style bleed.
	 *
	 * @function blockStylesToDescend IIFE
	 * @return {Object} The block styles coming from blockProps.
	 */
	const blockStylesToDescend = ( () => {
		const blockStyle = { ...blockProps?.style ?? {} };
		delete blockProps.style;
		return blockStyle;
	} )();

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<Inspector { ...props } />
				</>
			) }
			<blockquote { ...blockProps }>
				<RichText
					allowedFormats={ [] } // Disable controls.
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
					} }
					/* translators: the text of the click to tweet element */
					placeholder={ __( 'Add a quote to tweet…', 'coblocks' ) }
					style={ {
						color: textColor.color,
						...blockStylesToDescend,
					} }
					tagName="p"
					value={ content }
				/>
				<RichText
					allowedFormats={ [] } // Disable controls.
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__twitter-btn', {
							'has-button-color': buttonColor.color,
							[ buttonColor.class ]: buttonColor.class,
						}
					) }
					multiline="false"
					onChange={ ( nextButtonText ) => setAttributes( { buttonText: nextButtonText } ) }
					placeholder={ __( 'Add button…', 'coblocks' ) }
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
