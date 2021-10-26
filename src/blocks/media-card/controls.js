/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Icon, ToolbarGroup } from '@wordpress/components';
import { pullLeft, pullRight } from '@wordpress/icons';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		mediaPosition,
	} = attributes;

	const toolbarControls = [ {
		icon: <Icon icon={ pullLeft } />,
		isActive: mediaPosition === 'left',
		onClick: () => setAttributes( { mediaPosition: 'left' } ),
		title: __( 'Show media on left', 'coblocks' ),
	}, {
		icon: <Icon icon={ pullRight } />,
		isActive: mediaPosition === 'right',
		onClick: () => setAttributes( { mediaPosition: 'right' } ),
		title: __( 'Show media on right', 'coblocks' ),
	} ];

	return (
		<>
			<BlockControls>
				<ToolbarGroup
					controls={ toolbarControls }
				/>
				{ BackgroundControls( props ) }
			</BlockControls>
		</>
	);
};

export default Controls;
