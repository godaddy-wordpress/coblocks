/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from '../../utils/icons';
import VisualDropdown from '../../components/visual-dropdown';
import { styleOptions } from './styles';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

function Controls( { attributes, setAttributes, apiKey } ) {
	const {
		address,
		pinned,
		skin,
	} = attributes;

	const toolbarControls = [
		{
			icon: icons.mapEdit,
			title: __( 'Edit Location' ),
			isActive: ! pinned,
			onClick: () => setAttributes( { pinned: ! pinned } ),
		},
	];

	return (
		<BlockControls>
			{ apiKey &&
				<Toolbar>
					<VisualDropdown
						icon={ icons.style }
						label={ __( 'Map style' ) }
						controls={ [
							map( styleOptions, ( { value, label } ) => ( {
								title: label,
								label: label,
								key: value,
								value: skin,
								onClick: () => {
									setAttributes( { skin: value } );
								},
							} ) ),
						] }
					/>
				</Toolbar>
			}
			{ address &&
				<Toolbar controls={ toolbarControls } />
			}
		</BlockControls>
	);
}

export default Controls;
