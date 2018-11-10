/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
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

		if ( value == '#e2e3e5' ) {
			this.props.setAttributes( { customTextColor: '#383d41' } )
		} else if  ( value == '#cce5ff' ) {
			this.props.setAttributes( { customTextColor: '#004085' } )
		} else if  ( value == '#d4edda' ) {
			this.props.setAttributes( { customTextColor: '#155724' } )
		} else if  ( value == '#f8d7da' ) {
			this.props.setAttributes( { customTextColor: '#721c24' } )
		}
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
									onClick: () => { this.styles( '#e2e3e5' ), setAttributes( { type: 'default' } ) },
								},
								{
									icon: icons.info,
									title: __( 'Info' ),
									onClick: () => { this.styles( '#cce5ff' ), setAttributes( { type: 'info' } ) },
								},
								{
									icon: icons.success,
									title: __( 'Success' ),
									onClick: () => { this.styles( '#d4edda' ), setAttributes( { type: 'success' } ) },
								},
								{
									icon: icons.warning,
									title: __( 'Warning' ),
									onClick: () => { this.styles( '#fff3cd' ), setAttributes( { type: 'warning' } ) },
								},
								{
									icon: icons.error,
									title: __( 'Error' ),
									onClick: () => { this.styles( '#f8d7da' ), setAttributes( { type: 'error' } ) },
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
