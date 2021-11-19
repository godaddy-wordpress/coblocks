/**
 * External dependencies
 */
import { GridPositionIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { BackgroundControls } from '../../components/background';
import CSSGridToolbar from '../../components/grid-control/toolbar';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { Icon, ToolbarGroup } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const { contentAlign } = attributes;

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<CSSGridToolbar
						icon={ <Icon icon={ icon } /> }
						label={ __( 'Change layout', 'coblocks' ) }
						props={ props }
					/>
				</ToolbarGroup>
				<AlignmentToolbar
					onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					value={ contentAlign }
				/>
				<BackgroundControls { ...props } />
			</BlockControls>
		</>
	);
};

export default Controls;
