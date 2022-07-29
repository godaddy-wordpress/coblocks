/**
 * WordPress dependencies.
 */
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const {
		attributes,
	} = props;

	const REVIEW_TEMPLATE = [
		[ 'core/image', { url: attributes.avatarUrl } ],
		[ 'core/heading', { placeholder: 'Author Name', content: attributes.author, level: 5 } ],
		[ 'core/heading', { placeholder: 'Review Date', content: attributes.localizedDate, level: 5 } ],
		[ 'core/heading', { placeholder: 'Rating', content: attributes.rating, level: 5 } ],
		[ 'core/heading', { placeholder: 'Comments...', content: attributes.comment, level: 6 } ],
	];

	return (
		<InnerBlocks template={ REVIEW_TEMPLATE } />
	);
};

export default compose( [ ] )( Edit );
