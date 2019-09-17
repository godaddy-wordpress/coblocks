/**
 * Internal dependencies
 */
import icons from './icons';
import './styles/style.scss';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component } = wp.element;
const {
	Toolbar,
	DropdownMenu,
} = wp.components;

class MediaFilterControl extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			filter,
		} = attributes;

		const filterControls = [
			{
				icon: icons.none,
				title: _x( 'Original', 'image styles' ),
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				isActive: filter === 'none',
			},
			{
				icon: icons.grayscale,
				title: _x( 'Grayscale Filter', 'image styles' ),
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				isActive: filter === 'grayscale',
			},
			{
				icon: icons.sepia,
				title: _x( 'Sepia Filter', 'image styles' ),
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				isActive: filter === 'sepia',
			},
			{
				icon: icons.saturation,
				title: _x( 'Saturation Filter', 'image styles' ),
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				isActive: filter === 'saturation',
			},
			{
				icon: icons.dark,
				title: _x( 'Dim Filter', 'image styles' ),
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				isActive: filter === 'dim',
			},
			{
				icon: icons.vintage,
				title: _x( 'Vintage Filter', 'image styles' ),
				onClick: () => {
					setAttributes( { filter: 'vintage' } );
				},
				isActive: filter === 'vintage',
			},
		];

		return (
			<Toolbar>
				<DropdownMenu
					hasArrowIndicator
					icon={ icons.filter }
					label={ __( 'Apply filter' ) }
					controls={ filterControls }
					className="components-coblocks-media-filter"
				/>
			</Toolbar>
		);
	}
}

export default MediaFilterControl;
