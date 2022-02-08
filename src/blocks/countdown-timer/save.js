import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eventTime } = attributes;

	return (
		<div { ...useBlockProps.save() }></div>
	);
}
