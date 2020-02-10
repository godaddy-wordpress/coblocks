/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	ENTER,
	SPACE,
} from '@wordpress/keycodes';
import {
	PanelBody,
	QueryControls,
	RadioControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		activeStyle,
		styleOptions,
		onUpdateStyle,
		setAttributes,
		onUserModifiedColumn,
		categoriesList,
		postCount,
		hasPosts,
		hasFeaturedImage,
	} = props;

	const {
		order,
		orderBy,
		postFeedType,
		postsToShow,
		excerptLength,
		displayPostDate,
		displayPostContent,
		columns,
		listPosition,
		imageSize,
		imageStyle,
	} = attributes;
  
	const isHorizontalStyle = ( 'horizontal' === activeStyle.name );

	const sizeOptions = [
		{
			value: 'small',
			label: /* translators: abbreviation for small size */ __( 'S', 'coblocks' ),
			tooltip: /* translators: label for small size option */ __( 'Small', 'coblocks' ),
		},
		{
			value: 'medium',
			label: /* translators: abbreviation for medium size */ __( 'M', 'coblocks' ),
			tooltip: /* translators: label for medium size option */ __( 'Medium', 'coblocks' ),
		},
		{
			value: 'large',
			label: /* translators: abbreviation for large size */ __( 'L', 'coblocks' ),
			tooltip: /* translators: label for large size option */ __( 'Large', 'coblocks' ),
		},
		{
			value: 'huge',
			label: /* translators: abbreviation for extra large size */ __( 'XL', 'coblocks' ),
			tooltip: /* translators: label for extra large size option */ __( 'Huge', 'coblocks' ),
		},
	];

	const imageStyleHorizontalOptions = [
		{
			value: 'square',
			label: __( 'Square', 'coblocks' ),
			tooltip: __( 'Square', 'coblocks' ),
		},
		{
			value: 'circle',
			label: __( 'Circle', 'coblocks' ),
			tooltip: __( 'Circle', 'coblocks' ),
		},
	];

	const imageStyleStackedOptions = [
		{
			value: 'square',
			label: __( 'Square', 'coblocks' ),
			tooltip: __( 'Square', 'coblocks' ),
		},
		{
			value: 'four-to-three',
			label: __( '4:3', 'coblocks' ),
			tooltip: __( '4:3 Aspect ratio', 'coblocks' ),
		},
		{
			value: 'sixteen-to-nine',
			label: __( '16:9', 'coblocks' ),
			tooltip: __( '16:9 Aspect ratio', 'coblocks' ),
		},
		{
			value: 'circle',
			label: __( 'Circle', 'coblocks' ),
			tooltip: __( 'Circle', 'coblocks' ),
		},
	];

	const columnsCountOnChange = ( selectedColumns ) => {
		const { postsToShow } = attributes;
		setAttributes( { columns:
			( selectedColumns > postsToShow ) ? postsToShow : selectedColumns,
		} );
	};

	const postsCountOnChange = ( selectedPosts ) => {
		const { columns } = attributes;
		const changedAttributes = { postsToShow: selectedPosts };
		if ( columns > selectedPosts || ( selectedPosts === 1 && columns !== 1 ) ) {
			Object.assign( changedAttributes, { columns: selectedPosts } );
		}
		setAttributes( changedAttributes );
	};

	if ( isHorizontalStyle && attributes.columns > 2 ) {
		columnsCountOnChange( 2 );
	}

	const settings = (
		<PanelBody title={ __( 'Posts Settings', 'coblocks' ) }>
			<Fragment>
				<ToggleControl
					label={ __( 'Post Date', 'coblocks' ) }
					checked={ attributes.displayPostDate }
					help={
						attributes.displayPostDate ?
							__( 'Showing the publish date.', 'coblocks' ) :
							__( 'Toggle to show the publish date.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostDate: ! attributes.displayPostDate } ) }
				/>
				<ToggleControl
					label={ __( 'Post Content', 'coblocks' ) }
					checked={ attributes.displayPostContent }
					help={
						attributes.displayPostContent ?
							__( 'Showing the post content.', 'coblocks' ) :
							__( 'Toggle to show the post content.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostContent: ! attributes.displayPostContent } ) }
				/>
				{ attributes.displayPostContent &&
					<RangeControl
						label={ __( 'Max words in content', 'coblocks' ) }
						value={ attributes.excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 5 }
						max={ 75 }
					/>
				}
				<RangeControl
					label={ __( 'Columns', 'coblocks' ) }
					value={ attributes.columns }
					onChange={ ( value ) => {
						onUserModifiedColumn();
						columnsCountOnChange( value );
					} }
					min={ 1 }
					max={ isHorizontalStyle ? Math.min( 2, postCount ) : Math.min( 4, postCount ) }
					required
				/>

				{ hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail Style', 'coblocks' ) }
						options={ isHorizontalStyle ? imageStyleHorizontalOptions : imageStyleStackedOptions }
						currentOption={ imageStyle }
						onChange={ imageStyle => setAttributes( { imageStyle } ) }
					/>
				}

				{ isHorizontalStyle && hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail Size', 'coblocks' ) }
						options={ sizeOptions }
						currentOption={ attributes.imageSize }
						onChange={ ( imageSize ) => setAttributes( { imageSize } ) }
					/>
				}

			</Fragment>
		</PanelBody>
	);

	const feedSettings = (
		<PanelBody title={ __( 'Feed Settings', 'coblocks' ) } initialOpen={ ! hasPosts ? true : false }>
			<RadioControl
				selected={ attributes.postFeedType }
				options={ [
					{ label: __( 'My Blog', 'coblocks' ), value: 'internal' },
					{ label: __( 'External Feed', 'coblocks' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>
			{ hasPosts ?
				<Fragment>
					{ attributes.postFeedType === 'internal' &&
						<QueryControls
							order={ attributes.order }
							orderBy={ attributes.orderBy }
							categoriesList={ categoriesList }
							selectedCategoryId={ categoriesList.categories }
							onOrderChange={ ( value ) => setAttributes( { order: value } ) }
							onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
							onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						/>
					}
					<RangeControl
						label={ __( 'Number of posts', 'coblocks' ) }
						value={ attributes.postsToShow }
						onChange={ ( value ) => postsCountOnChange( value ) }
						min={ 1 }
						max={ 20 }
					/>
				</Fragment> : null }
		</PanelBody>
	);

	return (
		<InspectorControls>
			{ hasPosts ?
				<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
					<div className="block-editor-block-styles coblocks-editor-block-styles">
						{ styleOptions.map( style => (
							<div
								key={ `style-${ style.name }` }
								className={ classnames(
									'block-editor-block-styles__item',
									{
										'is-active': activeStyle === style,
									}
								) }
								onClick={ () => {
									if ( 'horizontal' === style.name && [ 'four-to-three', 'sixteen-to-nine' ].includes( imageStyle ) ) {
										setAttributes( { imageStyle: 'square' } );
									}
									onUpdateStyle( style );
								} }
								onKeyDown={ event => {
									if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
										event.preventDefault();
										onUpdateStyle( style );
									}
								} }
								role="button"
								tabIndex="0"
								aria-label={ style.label || style.name }
							>
								<div className="block-editor-block-styles__item-preview">
									{ attributes.listPosition === 'left' && style.iconAlt ? style.iconAlt : style.icon }
								</div>
								<div className="block-editor-block-styles__item-label">
									{ style.label || style.name }
								</div>
							</div>
						) ) }
					</div>
				</PanelBody> : null }
			{ hasPosts ? settings : null }
			{ feedSettings }
		</InspectorControls>
	);
};

export default Inspector;
