/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
const { Toolbar, DropdownMenu } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
		this.styles = this.styles.bind( this );
	}

	componentDidMount() {

		const { customBackgroundColor } = this.props.attributes;

		if ( customBackgroundColor ) {
			return;
		}

		this.styles( '#e2e3e5' )
	}

	styles( value ) {

		this.props.setAttributes( {
			customBackgroundColor: value,
			backgroundColor: '',
			textColor: '',
			titleColor: '',
			borderColor: '',
		} )

		if ( value == '#e2e3e5' ) {
			this.props.setAttributes( { customTextColor: '#383d41', customTitleColor: '#383d41', customBorderColor: '#d6d8db' } )
		} else if  ( value == '#cce5ff' ) {
			this.props.setAttributes( { customTextColor: '#004085', customTitleColor: '#004085', customBorderColor: '#b8daff' } )
		} else if  ( value == '#d4edda' ) {
			this.props.setAttributes( { customTextColor: '#155724', customTitleColor: '#155724', customBorderColor: '#c3e6cb' } )
		} else if  ( value == '#f8d7da' ) {
			this.props.setAttributes( { customTextColor: '#721c24', customTitleColor: '#721c24', customBorderColor: '#f5c6cb' } )
		} else if  ( value == '#fff3cd' ) {
			this.props.setAttributes( { customTextColor: '#856404', customTitleColor: '#856404', customBorderColor: '#ffeeba' } )
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
			<BlockControls key="controls">
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
		);
	}
}
