/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const { align, content } = attributes;

	const saveBlockProps = useBlockProps.save();
	saveBlockProps.style.textAlign = align;

	return RichText.isEmpty( content ) ? null : (
		<p { ...saveBlockProps }>
			<RichText.Content
				className="wp-block-coblocks-highlight__content"
				tagName="mark"
				value={ content }
			/>
		</p>
	);
};

export default save;
