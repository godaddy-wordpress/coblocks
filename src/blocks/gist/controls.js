/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { edit } from '@wordpress/icons';

const Controls = ( props ) => {
	const {
		preview,
		setPreview,
	} = props;

	const editControl = [
		{
			icon: edit,
			title: preview
				? sprintf(
					/* translators: %s: "Gist", the name of a code sharing platform */
					__( 'Return to %s', 'coblocks' ),
					'Gist'
				)
				: sprintf(
					/* translators: %s: "Gist", the name of a code sharing platform */
					__( 'Edit %s URL', 'coblocks' ),
					'Gist'
				),
			onClick: () => setPreview( ! preview ),
			isActive: ! preview,
		},
	];

	return (
		<BlockControls>
			<Toolbar controls={ editControl } />
		</BlockControls>
	);
};

export default Controls;
