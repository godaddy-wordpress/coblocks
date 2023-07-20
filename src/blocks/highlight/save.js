/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getColorClassnames, getColorStyles } from '../../utils/helper.js';

/**
 * External dependencies
 */
import classnames from 'classnames';

const save = ( { attributes } ) => {
	const { content } = attributes;

	const saveBlockProps = useBlockProps.save();

	/**
	 * In the Highlight block we descend only the `color` and `backgroundColor` styles and classnames but keep all others on the parent.
	 */
	const highlightClasses = getColorClassnames( saveBlockProps );

	return RichText.isEmpty( content ) ? null : (
		<p { ...saveBlockProps }>
			<RichText.Content
				className={ classnames( 'wp-block-coblocks-highlight__content', highlightClasses ) }
				tagName="mark"
				value={ content }
			/>
		</p>
	);
};

export default save;
