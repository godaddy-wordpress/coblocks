/**
 * External dependencies
 */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
import { select } from '@wordpress/data';
import { useState } from '@wordpress/element';
import {
	DropdownMenu,
	Icon,
	MenuGroup,
	MenuItem,
	Popover,
	ToolbarGroup,
} from '@wordpress/components';

const PreviewImageFilterPopover = ( { hoveredFilter } ) => {
	if ( ! hoveredFilter ) {
		return null;
	}

	const block = _.cloneDeep( select( 'core/block-editor' ).getSelectedBlock() );

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
							{ __( 'Preview filter', 'coblocks' ) }
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
};

const MediaFilterControl = ( props ) => {
	const [ hoveredFilter, setHoveredFilter ] = useState( null );

	const onChangeHoveredFilter = ( filter ) => {
		setHoveredFilter( filter );
	};

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		filter,
	} = attributes;

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
									onMouseEnter={ () => onChangeHoveredFilter( imageFilter.slug ) }
									onMouseLeave={ () => onChangeHoveredFilter( null ) }
									role="menuitemradio">
									{ imageFilter.title }
								</MenuItem>
							) )
						}
					</MenuGroup>
				) }
			</DropdownMenu>
		</ToolbarGroup>
	);
};

export default MediaFilterControl;

MediaFilterControl.propTypes = {
	attributes: PropTypes.object,
	setAttributes: PropTypes.func,
};
