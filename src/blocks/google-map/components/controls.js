/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

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
		} = attributes;
		
		return (
			<Fragment>
				{ address &&
					<BlockControls>
						<Toolbar>
							<DropdownMenu
								icon= { icons.style }
								label={ __( 'Map style' ) }
								className="components-coblocks-map-style"
								controls={ [
									{
										icon: icons.style,
										title: __( 'Standard' ),
										onClick: () => { setAttributes( { skin: 'standard' } ) },
									},
									{
										icon: icons.mapStyleSilver,
										title: __( 'Silver' ),
										onClick: () => { setAttributes( { skin: 'silver' } ) },
									},
									{
										icon: icons.mapStyleRetro,
										title: __( 'Retro' ),
										onClick: () => { setAttributes( { skin: 'retro' } ) },
									},
									{
										icon: icons.mapStyleDark,
										title: __( 'Dark' ),
										onClick: () => { setAttributes( { skin: 'dark' } ) },
									},
									{
										icon: icons.mapStyleAubergine,
										title: __( 'Aubergine' ),
										onClick: () => { setAttributes( { skin: 'aubergine' } ) },
									},
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
