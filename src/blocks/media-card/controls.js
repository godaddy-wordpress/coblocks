/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, Icon } from '@wordpress/components';
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
		title: __( 'Show media on left', 'coblocks' ),
		isActive: mediaPosition === 'left',
		onClick: () => setAttributes( { mediaPosition: 'left' } ),
	}, {
		icon: <Icon icon={ pullRight } />,
		title: __( 'Show media on right', 'coblocks' ),
		isActive: mediaPosition === 'right',
		onClick: () => setAttributes( { mediaPosition: 'right' } ),
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
