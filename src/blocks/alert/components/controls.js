/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar, DropdownMenu } = wp.components;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
		this.styles = this.styles.bind( this );
	}

	styles( value ) {

		this.props.setAttributes( {
			customBackgroundColor: value,
			backgroundColor: '',
			textColor: '',
		} )

		// Info (Blue)
		if  ( value == '#D6EFEE' ) {
			this.props.setAttributes( { customTextColor: '#094264' } )

		// Success (Green)
		} else if  ( value == '#D0EAC4' ) {
			this.props.setAttributes( { customTextColor: '#154a28' } )

		// Warning (Orange)
		} else if  ( value == '#FBE7DD' ) {
			this.props.setAttributes( { customTextColor: '#8a4b30' } )

		// Error (Red)
		} else if  ( value == '#ffdede' ) {
			this.props.setAttributes( { customTextColor: '#8b343c' } )
		}
	}

	render() {

		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			customTextColor,
			textAlign,
			type,
		} = attributes;

		function icon() {

			if ( type == 'default' ) {
				return icons.alertFilled;
			} else if  ( type == 'info' ) {
				return icons.info;
			} else if  ( type == 'success' ) {
				return icons.success;
			} else if  ( type == 'warning' ) {
				return icons.warning;
			} else if  ( type == 'error' ) {
				return icons.error;
			}
		}

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<DropdownMenu
							icon= { icon() }
							label={ __( 'Alert Type' ) }
							controls={ [
								{
									icon: icons.alertFilled,
									title: __( 'Default' ),
									onClick: () => { setAttributes( { type: 'default', backgroundColor: '',  customBackgroundColor: '', customTextColor: '' } ) },
								},
								{
									icon: icons.info,
									title: __( 'Info' ),
									onClick: () => { this.styles( '#D6EFEE' ), setAttributes( { type: 'info' } ) },
								},
								{
									icon: icons.success,
									title: __( 'Success' ),
									onClick: () => { this.styles( '#D0EAC4' ), setAttributes( { type: 'success' } ) },
								},
								{
									icon: icons.warning,
									title: __( 'Warning' ),
									onClick: () => { this.styles( '#FBE7DD' ), setAttributes( { type: 'warning' } ) },
								},
								{
									icon: icons.error,
									title: __( 'Error' ),
									onClick: () => { this.styles( '#ffdede' ), setAttributes( { type: 'error' } ) },
								},
							] }
						/>
					</Toolbar>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
};

export default Controls;
