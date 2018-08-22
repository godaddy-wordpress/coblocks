/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls, BlockAlignmentToolbar } = wp.editor;
const { Toolbar, DropdownMenu } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			align,
			textAlign,
			customTextColor,
			type,
		} = attributes;

		function styles( value ) {

			setAttributes( { backgroundColor: value } )

			if ( value == '#e2e3e5' ) {
				setAttributes( { customTextColor: '#383d41', customTitleColor: '#383d41', customBorderColor: '#d6d8db' } )
			} else if  ( value == '#cce5ff' ) {
				setAttributes( { customTextColor: '#004085', customTitleColor: '#004085', customBorderColor: '#b8daff' } )
			} else if  ( value == '#d4edda' ) {
				setAttributes( { customTextColor: '#155724', customTitleColor: '#155724', customBorderColor: '#c3e6cb' } )
			} else if  ( value == '#f8d7da' ) {
				setAttributes( { customTextColor: '#721c24', customTitleColor: '#721c24', customBorderColor: '#f5c6cb' } )
			} else if  ( value == '#fff3cd' ) {
				setAttributes( { customTextColor: '#856404', customTitleColor: '#856404', customBorderColor: '#ffeeba' } )
			}
		}

		function icon() {

			if ( type == 'default' ) {
				return icons.alertMenu;
			} else if  ( type == 'info' ) {
				return 'info';
			} else if  ( type == 'success' ) {
				return icons.success;
			} else if  ( type == 'warning' ) {
				return 'warning';
			} else if  ( type == 'error' ) {
				return 'dismiss';
			}
		}

		return (
			<BlockControls key="controls">
				<Toolbar>
					<DropdownMenu
						icon= { icon() }
						label={ __( 'Alert Type' ) }
						controls={ [
							{
								icon: icons.alertMenu,
								title: __( 'Default' ),
								onClick: () => { styles( '#e2e3e5' ), setAttributes( { type: 'default' } ) },
							},
							{
								icon: 'info',
								title: __( 'Info' ),
								onClick: () => { styles( '#cce5ff' ), setAttributes( { type: 'info' } ) },
							},
							{
								icon: icons.success,
								title: __( 'Success' ),
								onClick: () => { styles( '#d4edda' ), setAttributes( { type: 'success' } ) },
							},
							{
								icon: 'warning',
								title: __( 'Warning' ),
								onClick: () => { styles( '#fff3cd' ), setAttributes( { type: 'warning' } ) },
							},
							{
								icon: 'dismiss',
								title: __( 'Error' ),
								onClick: () => { styles( '#f8d7da' ), setAttributes( { type: 'error' } ) },
							},
						] }
					/>
				</Toolbar>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
				/>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
				/>
			</BlockControls>
		);
	}
}
