/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	Toolbar,
	DropdownMenu,
} = wp.components;
const {
	BlockControls,
} = wp.editor;

class MediaFilterControl extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			filter,
		} = attributes;

		const filterControls = [
			{
				icon: icons.none,
				title: __( 'Original' ),
				onClick: () => { setAttributes( { filter: 'none' } ) },
				isActive: filter === 'none',
			},
			{
				icon: icons.grayscale,
				title: __( 'Grayscale' ),
				onClick: () => { setAttributes( { filter: 'grayscale' } ) },
				isActive: filter === 'grayscale',
			},
			{
				icon: icons.sepia,
				title: __( 'Sepia' ),
				onClick: () => { setAttributes( { filter: 'sepia' } ) },
				isActive: filter === 'sepia',
			},
			{
				icon: icons.saturation,
				title: __( 'Saturation' ),
				onClick: () => { setAttributes( { filter: 'saturation' } ) },
				isActive: filter === 'saturation',
			},
			{
				icon: icons.dark,
				title: __( 'Dim' ),
				onClick: () => { setAttributes( { filter: 'dim' } ) },
				isActive: filter === 'dim',
			},
			{
				icon: icons.vintage,
				title: __( 'Vintage' ),
				onClick: () => { setAttributes( { filter: 'vintage' } ) },
				isActive: filter === 'vintage',
			},
		];

		return (
			<Toolbar>
				<DropdownMenu
					icon= { icons.filter }
					label={ __( 'Apply filter' ) }_
					controls={ filterControls }
				/>
			</Toolbar>
		)
	}
}

export default MediaFilterControl;
