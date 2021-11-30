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
import { select } from '@wordpress/data';
import {
	DropdownMenu,
	Icon,
	MenuGroup,
	MenuItem,
	Popover,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

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
		className,
	} = attributes;

	const POPOVER_PROPS = {
		className: 'components-coblocks-dropdown',
	};

	useEffect( () => {
		// Handle situations where filter is set without the className being set.
		setClassName( filter );
	}, [ className, filter ] );

	const setClassName = ( newFilter ) => {
		const filterClass = classnames( { [ `has-filter-${ newFilter }` ]: newFilter !== 'none' } );
		const existingFilterClass = className?.match( 'has-filter-[a-z]*' )?.[ 0 ];

		const shouldAddClass = !! filterClass && ! className?.includes( filterClass );
		const shouldRemoveClass = !! existingFilterClass && filterClass !== existingFilterClass;

		const classnamesApplied = classnames(
			shouldRemoveClass
				// Remove existing class, remove double spaces and trim ends of string.
				? className.replace( existingFilterClass, '' ).replace( '  ', ' ' ).trim()
				: className,
			filterClass,
		);

		if ( !! shouldAddClass || !! shouldRemoveClass ) {
			setAttributes( { className: classnamesApplied, filter: newFilter } );
			return;
		}

		if ( filter === newFilter ) {
			return;
		}

		setAttributes( { filter: newFilter } );
	};

	const filterControls = [
		{
			icon: <Icon icon={ FilterNoneIcon } />,
			isActive: filter === 'none',
			onClick: () => setClassName( 'none' ),
			slug: 'none',
			/* translators: image style */
			title: __( 'Original', 'coblocks' ),
		},
		{
			icon: <Icon icon={ FilterGrayscaleIcon } />,
			isActive: filter === 'grayscale',
			onClick: () => setClassName( 'grayscale' ),
			slug: 'grayscale',
			/* translators: image style */
			title: __( 'Grayscale filter', 'coblocks' ),
		},
		{
			icon: <Icon icon={ FilterSepiaIcon } />,
			isActive: filter === 'sepia',
			onClick: () => setClassName( 'sepia' ),
			slug: 'sepia',
			/* translators: image style */
			title: __( 'Sepia filter', 'coblocks' ),
		},
		{
			icon: <Icon icon={ FilterSaturationIcon } />,
			isActive: filter === 'saturation',
			onClick: () => setClassName( 'saturation' ),
			slug: 'saturation',
			/* translators: image style */
			title: __( 'Saturation filter', 'coblocks' ),
		},
		{
			icon: <Icon icon={ FilterDarkIcon } />,
			isActive: filter === 'dim',
			onClick: () => setClassName( 'dim' ),
			slug: 'dim',
			/* translators: image style */
			title: __( 'Dim filter', 'coblocks' ),
		},
		{
			icon: <Icon icon={ FilterVintageIcon } />,
			isActive: filter === 'vintage',
			onClick: () => setClassName( 'vintage' ),
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
					<>
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
					</>
				) }
			</DropdownMenu>
		</ToolbarGroup>
	);
};

export default MediaFilterControl;
