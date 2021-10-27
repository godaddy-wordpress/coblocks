/**
 * External dependencies
 */
import _ from 'lodash';
import classnames from 'classnames';
import {
	FilterDarkIcon,
	FilterGrayscaleIcon,
	FilterMainIcon,
	FilterNoneIcon,
	FilterSaturationIcon,
	FilterSepiaIcon,
	FilterVintageIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockPreview } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import {
	DropdownMenu,
	Icon,
	MenuGroup,
	MenuItem,
	Popover,
	ToolbarGroup,
} from '@wordpress/components';

function PreviewImageFilterPopover( { hoveredFilter } ) {
	if ( ! hoveredFilter ) {
		return null;
	}

	const block = _.cloneDeep( wp.data.select( 'core/block-editor' ).getSelectedBlock() );

	block.attributes.filter = hoveredFilter;

	return (
		<div className="block-editor-block-switcher__popover__preview__parent">
			<div className="block-editor-block-switcher__popover__preview__container">
				<Popover
					className="block-editor-block-switcher__preview__popover coblocks-image-filter-popover"
					focusOnMount={ false }
					position="bottom right"
				>
					<div className="block-editor-block-switcher__preview coblocks__preview">
						<div className="block-editor-block-switcher__preview-title">
							{ __( 'Preview filter' ) }
						</div>
						<BlockPreview
							autoHeight
							blocks={ { ...block } }
						/>
					</div>
				</Popover>
			</div>
		</div>
	);
}

class MediaFilterControl extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			hoveredFilter: null,
		};
	}

	onChangeHoveredFilter = ( filter ) => {
		this.setState( {
			hoveredFilter: filter,
		} );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			filter,
		} = attributes;

		const {
			hoveredFilter,
		} = this.state;

		const POPOVER_PROPS = {
			className: 'components-coblocks-dropdown',
		};

		const filterControls = [
			{
				icon: <Icon icon={ FilterNoneIcon } />,
				isActive: filter === 'none',
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				slug: 'none',
				/* translators: image style */
				title: __( 'Original', 'coblocks' ),
			},
			{
				icon: <Icon icon={ FilterGrayscaleIcon } />,
				isActive: filter === 'grayscale',
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				slug: 'grayscale',
				/* translators: image style */
				title: __( 'Grayscale filter', 'coblocks' ),
			},
			{
				icon: <Icon icon={ FilterSepiaIcon } />,
				isActive: filter === 'sepia',
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				slug: 'sepia',
				/* translators: image style */
				title: __( 'Sepia filter', 'coblocks' ),
			},
			{
				icon: <Icon icon={ FilterSaturationIcon } />,
				isActive: filter === 'saturation',
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				slug: 'saturation',
				/* translators: image style */
				title: __( 'Saturation filter', 'coblocks' ),
			},
			{
				icon: <Icon icon={ FilterDarkIcon } />,
				isActive: filter === 'dim',
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				slug: 'dim',
				/* translators: image style */
				title: __( 'Dim filter', 'coblocks' ),
			},
			{
				icon: <Icon icon={ FilterVintageIcon } />,
				isActive: filter === 'vintage',
				onClick: () => {
					setAttributes( { filter: 'vintage' } );
				},
				slug: 'vintage',
				/* translators: image style */
				title: __( 'Vintage filter', 'coblocks' ),
			},
		];

		return (
			<ToolbarGroup>
				<DropdownMenu
					className={ classnames( 'components-coblocks-media-filter', ( 'none' !== filter ) ? 'has-filter' : '' ) }
					icon={ <Icon icon={ FilterMainIcon } /> }
					label={ __( 'Apply filter', 'coblocks' ) }
					noIcons
					popoverProps={ POPOVER_PROPS }
				>
					{ () => (
						<Fragment>
							<MenuGroup>
								<PreviewImageFilterPopover hoveredFilter={ hoveredFilter } />
								{
									filterControls.map( ( imageFilter ) => (
										<MenuItem
											icon={ imageFilter.icon }
											isSelected={ filter === imageFilter.slug }
											key={ `coblocks-image-filter-${ imageFilter.slug }` }
											label={ imageFilter.title }
											onClick={ imageFilter.onClick }
											onMouseEnter={ () => this.onChangeHoveredFilter( imageFilter.slug ) }
											onMouseLeave={ () => this.onChangeHoveredFilter( null ) }
											role="menuitemradio">
											{ imageFilter.title }
										</MenuItem>
									) )
								}
							</MenuGroup>
						</Fragment>
					) }
				</DropdownMenu>
			</ToolbarGroup>
		);
	}
}

export default MediaFilterControl;
