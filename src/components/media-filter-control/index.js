/**
 * External dependencies
 */
import _ from 'lodash';
import classnames from 'classnames';
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
import { Component, Fragment } from '@wordpress/element';
import { BlockPreview } from '@wordpress/block-editor';
import {
	MenuItem,
	MenuGroup,
	Popover,
	Toolbar,
	DropdownMenu,
	Icon,
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
					position="bottom right"
					focusOnMount={ false }
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
				/* translators: image style */
				title: __( 'Original', 'coblocks' ),
				slug: 'none',
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				isActive: filter === 'none',
			},
			{
				icon: <Icon icon={ FilterGrayscaleIcon } />,
				/* translators: image style */
				title: __( 'Grayscale filter', 'coblocks' ),
				slug: 'grayscale',
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				isActive: filter === 'grayscale',
			},
			{
				icon: <Icon icon={ FilterSepiaIcon } />,
				/* translators: image style */
				title: __( 'Sepia filter', 'coblocks' ),
				slug: 'sepia',
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				isActive: filter === 'sepia',
			},
			{
				icon: <Icon icon={ FilterSaturationIcon } />,
				/* translators: image style */
				title: __( 'Saturation filter', 'coblocks' ),
				slug: 'saturation',
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				isActive: filter === 'saturation',
			},
			{
				icon: <Icon icon={ FilterDarkIcon } />,
				/* translators: image style */
				title: __( 'Dim filter', 'coblocks' ),
				slug: 'dim',
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				isActive: filter === 'dim',
			},
			{
				icon: <Icon icon={ FilterVintageIcon } />,
				/* translators: image style */
				title: __( 'Vintage filter', 'coblocks' ),
				slug: 'vintage',
				onClick: () => {
					setAttributes( { filter: 'vintage' } );
				},
				isActive: filter === 'vintage',
			},
		];

		return (
			<Toolbar label={ __( 'Media Filter controls', 'coblocks' ) }>
				<DropdownMenu
					icon={ <Icon icon={ FilterMainIcon } /> }
					label={ __( 'Apply filter', 'coblocks' ) }
					popoverProps={ POPOVER_PROPS }
					className={ classnames( 'components-coblocks-media-filter', ( 'none' !== filter ) ? 'has-filter' : '' ) }
					noIcons
				>
					{ () => (
						<Fragment>
							<MenuGroup>
								<PreviewImageFilterPopover hoveredFilter={ hoveredFilter } />
								{
									filterControls.map( ( imageFilter ) => (
										<MenuItem
											role="menuitemradio"
											label={ imageFilter.title }
											onClick={ imageFilter.onClick }
											onMouseEnter={ () => this.onChangeHoveredFilter( imageFilter.slug ) }
											onMouseLeave={ () => this.onChangeHoveredFilter( null ) }
											isSelected={ filter === imageFilter.slug }
											icon={ imageFilter.icon }
											key={ `coblocks-image-filter-${ imageFilter.slug }` }>
											{ imageFilter.title }
										</MenuItem>
									) )
								}
							</MenuGroup>
						</Fragment>
					) }
				</DropdownMenu>
			</Toolbar>
		);
	}
}

export default MediaFilterControl;
