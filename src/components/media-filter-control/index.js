/**
 * Internal dependencies
 */
import icons from './icons';
import './styles/style.scss';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	Toolbar,
	DropdownMenu,
} from '@wordpress/components';

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
				/* translators: image style */
				title: __( 'Original', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				isActive: filter === 'none',
			},
			{
				icon: icons.grayscale,
				/* translators: image style */
				title: __( 'Grayscale Filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				isActive: filter === 'grayscale',
			},
			{
				icon: icons.sepia,
				/* translators: image style */
				title: __( 'Sepia Filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				isActive: filter === 'sepia',
			},
			{
				icon: icons.saturation,
				/* translators: image style */
				title: __( 'Saturation Filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				isActive: filter === 'saturation',
			},
			{
				icon: icons.dark,
				/* translators: image style */
				title: __( 'Dim Filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				isActive: filter === 'dim',
			},
			{
				icon: icons.vintage,
				/* translators: image style */
				title: __( 'Vintage Filter', 'coblocks' ),
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
					label={ __( 'Apply filter', 'coblocks' ) }
					controls={ filterControls }
					className="components-coblocks-media-filter"
				/>
			</Toolbar>
		);
	}
}

export default MediaFilterControl;
