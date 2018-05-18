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
		} = attributes;

		function styles( value ) {

			setAttributes( { backgroundColor: value } )

			if ( value == '#e2e3e5' ) {
				setAttributes( { textColor: '#383d41', titleColor: '#383d41', borderColor: '#d6d8db' } )
			} else if  ( value == '#cce5ff' ) {
				setAttributes( { textColor: '#004085', titleColor: '#004085', borderColor: '#b8daff' } )
			} else if  ( value == '#d4edda' ) {
				setAttributes( { textColor: '#155724', titleColor: '#155724', borderColor: '#c3e6cb' } )
			} else if  ( value == '#f8d7da' ) {
				setAttributes( { textColor: '#721c24', titleColor: '#721c24', borderColor: '#f5c6cb' } )
			} else if  ( value == '#fff3cd' ) {
				setAttributes( { textColor: '#856404', titleColor: '#856404', borderColor: '#ffeeba' } )
			}
		}

		return (
			<BlockControls key="controls">
				<Toolbar>
					<DropdownMenu
						label={ __( 'Alert Type' ) }
						controls={ [
							{
								icon: icons.alertMenu,
								title: __( 'Default' ),
								onClick: () => { styles( '#e2e3e5' ) }, // Gray.
							},
							{
								icon: 'info',
								title: __( 'Info' ),
								onClick: () => { styles( '#cce5ff' ) }, // Blue.
							},
							{
								icon: icons.success,
								title: __( 'Success' ),
								onClick: () => { styles( '#d4edda' ) }, // Green.
							},
							{
								icon: 'warning',
								title: __( 'Warning' ),
								onClick: () => { styles( '#fff3cd' ) }, // Yellow.
							},
							{
								icon: 'dismiss',
								title: __( 'Error' ),
								onClick: () => { styles( '#f8d7da' ) }, // Red.
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
