/**
 * External dependencies
 */
import {
	FilterDarkIcon,
	FilterGrayscaleIcon,
	FilterNoneIcon,
	FilterSaturationIcon,
	FilterSepiaIcon,
	FilterVintageIcon,
	FilterMainIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	Toolbar,
	DropdownMenu,
	Icon,
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
				icon: <Icon icon={ FilterNoneIcon } />,
				/* translators: image style */
				title: __( 'Original', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				isActive: filter === 'none',
			},
			{
				icon: <Icon icon={ FilterGrayscaleIcon } />,
				/* translators: image style */
				title: __( 'Grayscale filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				isActive: filter === 'grayscale',
			},
			{
				icon: <Icon icon={ FilterSepiaIcon } />,
				/* translators: image style */
				title: __( 'Sepia filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				isActive: filter === 'sepia',
			},
			{
				icon: <Icon icon={ FilterSaturationIcon } />,
				/* translators: image style */
				title: __( 'Saturation filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				isActive: filter === 'saturation',
			},
			{
				icon: <Icon icon={ FilterDarkIcon } />,
				/* translators: image style */
				title: __( 'Dim filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				isActive: filter === 'dim',
			},
			{
				icon: <Icon icon={ FilterVintageIcon } />,
				/* translators: image style */
				title: __( 'Vintage filter', 'coblocks' ),
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
					icon={ <Icon icon={ FilterMainIcon } /> }
					label={ __( 'Apply filter', 'coblocks' ) }
					controls={ filterControls }
					className="components-coblocks-media-filter"
				/>
			</Toolbar>
		);
	}
}

export default MediaFilterControl;
