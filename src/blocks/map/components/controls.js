/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';
import VisualDropdown from '../../../components/visual-dropdown/';
import { styleOptions } from './styles'

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.editor;
const { Toolbar, DropdownMenu } = wp.components;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			address,
			pinned,
			skin,
		} = attributes;

		return (
			<Fragment>
				{ address && pinned &&
					<BlockControls>
						<Toolbar>
							<VisualDropdown
								icon={ icons.style }
								label={ __( 'Map style' ) }
								controls={ [
									map( styleOptions, ( { value, label } ) => ({
										title: label,
										label: label,
										key: value,
										value: skin,
										onClick: () => { setAttributes( { skin: value } ) }
									}) )
								] }
							/>
						</Toolbar>
					</BlockControls>
				}
			</Fragment>
		);
	}
}

export default Controls;
