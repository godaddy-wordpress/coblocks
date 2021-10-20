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
import { Toolbar, Icon } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const { contentAlign } = attributes;

	return (
		<>
			<BlockControls>
				<Toolbar label={ __( 'Hero controls', 'coblocks' ) }>
					<CSSGridToolbar
						icon={ <Icon icon={ icon } /> }
						label={ __( 'Change layout', 'coblocks' ) }
						props={ props }
					/>
				</Toolbar>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
				/>
				<BackgroundControls { ...props } />
			</BlockControls>
		</>
	);
};

export default Controls;
