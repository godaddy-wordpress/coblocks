/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';
import VisualDropdown from '../../../components/visual-dropdown/';
import { styleOptions } from './styles';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { BlockControls } = wp.editor;
const { Toolbar } = wp.components;

function Controls( { attributes, setAttributes } ) {
	const {
		address,
		pinned,
		skin,
	} = attributes;

	if ( ! address || ! pinned ) {
		return null;
	}

	return (
		<BlockControls>
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
		</BlockControls>
	);
}

export default Controls;
