/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import GutterControl from '../../components/gutter-control/gutter-control';
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
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
		useUpdatedQueryControls,
	} = props;

	const {
		columns,
		displayPostContent,
		displayPostDate,
		excerptLength,
		imageSize,
		imageStyle,
		listPosition,
		order,
		orderBy,
		postFeedType,
		postsToShow,
		categories,
		categoryRelation,
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
		setAttributes( { columns:
			( selectedColumns > postsToShow ) ? postsToShow : selectedColumns,
		} );
	};

	const postsCountOnChange = ( selectedPosts ) => {
		const changedAttributes = { postsToShow: selectedPosts };
		if ( columns > selectedPosts || ( selectedPosts === 1 && columns !== 1 ) ) {
			Object.assign( changedAttributes, { columns: selectedPosts } );
		}
		setAttributes( changedAttributes );
	};

	if ( isHorizontalStyle && columns > 2 ) {
		columnsCountOnChange( 2 );
	}

	const settings = (
		<PanelBody title={ __( 'Posts settings', 'coblocks' ) }>
			<>
				<ToggleControl
					label={ __( 'Post date', 'coblocks' ) }
					checked={ displayPostDate }
					help={
						displayPostDate
							? __( 'Showing the publish date.', 'coblocks' )
							: __( 'Toggle to show the publish date.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostDate: ! displayPostDate } ) }
				/>
				<ToggleControl
					label={ __( 'Post content', 'coblocks' ) }
					checked={ displayPostContent }
					help={
						displayPostContent
							? __( 'Showing the post content.', 'coblocks' )
							: __( 'Toggle to show the post content.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostContent: ! displayPostContent } ) }
				/>
				{ displayPostContent &&
					<RangeControl
						label={ __( 'Max words in content', 'coblocks' ) }
						value={ excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 5 }
						max={ 75 }
					/>
				}
				<RangeControl
					label={ __( 'Columns', 'coblocks' ) }
					value={ columns }
					onChange={ ( value ) => {
						onUserModifiedColumn();
						columnsCountOnChange( value );
					} }
					min={ 1 }
					max={ isHorizontalStyle ? Math.min( 2, postCount ) : Math.min( 4, postCount ) }
					required
				/>
				{ attributes.columns >= 2 && <GutterControl { ...props } /> }
				{ hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail style', 'coblocks' ) }
						options={ isHorizontalStyle ? imageStyleHorizontalOptions : imageStyleStackedOptions }
						currentOption={ imageStyle }
						onChange={ ( newImageStyle ) => setAttributes( { imageStyle: newImageStyle } ) }
					/>
				}
				{ isHorizontalStyle && hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail size', 'coblocks' ) }
						options={ sizeOptions }
						currentOption={ imageSize }
						onChange={ ( newImageSize ) => setAttributes( { imageSize: newImageSize } ) }
					/>
				}

			</>
		</PanelBody>
	);

	const deprecatedQueryControls = (
		<QueryControls
			order={ order }
			orderBy={ orderBy }
			categoriesList={ categoriesList }
			selectedCategoryId={ attributes.categories }
			categorySuggestions={ categoriesList }
			selectedCategories={ attributes.categories }
			onOrderChange={ ( value ) => setAttributes( { order: value } ) }
			onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
			onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
		/>
	);

	const updatedQueryControls = () => {
		const categorySuggestions = categoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);

		const suggestions = categoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);

		return ( <QueryControls
			order={ order }
			orderBy={ orderBy }
			categorySuggestions={ categorySuggestions }
			selectedCategories={ attributes.categories }
			onOrderChange={ ( value ) => setAttributes( { order: value } ) }
			onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
			onCategoryChange={ ( tokens ) => {
				// Categories that are already will be objects, while new additions will be strings (the name).
				// allCategories nomalizes the array so that they are all objects.
				const allCategories = tokens.reduce( ( acc, curr ) => {
					if ( typeof curr === 'string' ) {
						const suggestedToken = suggestions[ curr ];

						if ( suggestedToken ) {
							acc.push( suggestedToken );
						}
					} else {
						acc.push( curr );
					}

					return acc;
				}, [] );
				setAttributes( { categories: allCategories } );
				if ( tokens.length < 2 ) {
					setAttributes( { categoryRelation: 'or' } );
				}
			} }
		/> );
	};

	const feedSettings = (
		<PanelBody title={ __( 'Feed settings', 'coblocks' ) } initialOpen={ ! hasPosts ? true : false }>
			<RadioControl
				selected={ postFeedType }
				options={ [
					{ label: __( 'My blog', 'coblocks' ), value: 'internal' },
					{ label: __( 'External feed', 'coblocks' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>
			{ hasPosts || ( !! categories && categories?.length > 0 )
				? <>
					{ postFeedType === 'internal' &&
						useUpdatedQueryControls ? updatedQueryControls() : deprecatedQueryControls
					}
					{ categories && categories.length > 1 &&
						<RadioControl
							label={ __( 'Category relation', 'coblocks' ) }
							help={ __( 'The logical relationship between each category when there is more than one.', 'coblocks' ) }
							selected={ categoryRelation }
							options={ [
								{ label: __( 'Or', 'coblocks' ), value: 'or' },
								{ label: __( 'And', 'coblocks' ), value: 'and' },
							] }
							onChange={ ( value ) => setAttributes( { categoryRelation: value } ) }
						/>
					}
					<RangeControl
						label={ __( 'Number of posts', 'coblocks' ) }
						value={ postsToShow }
						onChange={ ( value ) => postsCountOnChange( value ) }
						min={ 1 }
						max={ 20 }
					/>
				</> : null }
		</PanelBody>
	);

	return (
		<>
			{ hasPosts
				? <PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
					<div className="block-editor-block-styles coblocks-editor-block-styles">
						{ styleOptions.map( ( style ) => (
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
								onKeyDown={ ( event ) => {
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
									{ listPosition === 'left' && style.iconAlt ? style.iconAlt : style.icon }
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
		</>
	);
};

export default Inspector;
