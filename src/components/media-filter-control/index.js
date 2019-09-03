/**
 * Internal dependencies
 */
import icons from './icons';
import './styles/style.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
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
				title: __( 'Original' ),
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				isActive: filter === 'none',
			},
			{
				icon: icons.grayscale,
				title: __( 'Grayscale Filter' ),
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				isActive: filter === 'grayscale',
			},
			{
				icon: icons.sepia,
				title: __( 'Sepia Filter' ),
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				isActive: filter === 'sepia',
			},
			{
				icon: icons.saturation,
				title: __( 'Saturation Filter' ),
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				isActive: filter === 'saturation',
			},
			{
				icon: icons.dark,
				title: __( 'Dim Filter' ),
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				isActive: filter === 'dim',
			},
			{
				icon: icons.vintage,
				title: __( 'Vintage Filter' ),
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
