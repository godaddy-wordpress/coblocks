/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	QueryControls,
	RadioControl,
	BaseControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';

const Inspector = props => {
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
	} = attributes;

	const isHorizontalStyle = ( 'horizontal' === activeStyle.name );

	const sizeOptions = [
		{
			value: 'w-1/7 h-1/7',
			label: /* translators: label for small size option */ __( 'Small', 'coblocks' ),
			shortName: /* translators: abbreviation for small size */ __( 'S', 'coblocks' ),
		},
		{
			value: 'w-1/7 sm:w-1/5 h-1/7 sm:h-1/5',
			label: /* translators: label for medium size option */ __( 'Medium', 'coblocks' ),
			shortName: /* translators: abbreviation for medium size */ __( 'M', 'coblocks' ),
		},
		{
			value: 'w-1/7 sm:w-1/3 h-1/7 sm:h-1/3',
			label: /* translators: label for large size option */ __( 'Large', 'coblocks' ),
			shortName: /* translators: abbreviation for large size */ __( 'L', 'coblocks' ),
		},
		{
			value: 'w-1/7 sm:w-1/3 md:w-1/2 h-1/7 sm:h-1/3 md:h-1/2',
			label: /* translators: label for extra large size option */ __( 'Extra Large', 'coblocks' ),
			shortName: /* translators: abbreviation for extra large size */ __( 'XL', 'coblocks' ),
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

	if ( isHorizontalStyle && columns > 2 ) {
		columnsCountOnChange( 2 );
	}

	const settings = (
		<PanelBody title={ __( 'Posts Settings', 'coblocks' ) }>
			<Fragment>
				<ToggleControl
					label={ __( 'Post Date', 'coblocks' ) }
					checked={ displayPostDate }
					help={
						displayPostDate ?
							__( 'Showing the publish date.', 'coblocks' ) :
							__( 'Toggle to show the publish date.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostDate: ! displayPostDate } ) }
				/>
				<ToggleControl
					label={ __( 'Post Content', 'coblocks' ) }
					checked={ displayPostContent }
					help={
						displayPostContent ?
							__( 'Showing the post content.', 'coblocks' ) :
							__( 'Toggle to show the post content.', 'coblocks' )
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
				{ isHorizontalStyle && hasFeaturedImage &&
					<BaseControl label={ __( 'Thumbnail Size', 'coblocks' ) }
						className={ classnames(
							'components-coblocks-posts-thumbnail-size',
							{
								'has-content': displayPostContent,
							}
						) }
					>
						<PanelRow>
							<ButtonGroup aria-label={ __( 'Thumbnail Size', 'coblocks' ) }>
								{ sizeOptions.map( ( option ) => {
									const isCurrent = imageSize === option.value;
									return (
										<Button
											key={ `option-${ option.value }` }
											isLarge
											isPrimary={ isCurrent }
											aria-pressed={ isCurrent }
											onClick={ () => setAttributes( { imageSize: option.value } ) }
										>
											{ option.shortName }
										</Button>
									);
								} ) }
							</ButtonGroup>
						</PanelRow>
					</BaseControl>
				}
			</Fragment>
		</PanelBody>
	);

	const feedSettings = (
		<PanelBody title={ __( 'Feed Settings', 'coblocks' ) } initialOpen={ ! hasPosts ? true : false }>
			<RadioControl
				selected={ postFeedType }
				options={ [
					{ label: __( 'My Blog', 'coblocks' ), value: 'internal' },
					{ label: __( 'External Feed', 'coblocks' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>
			{ hasPosts ?
				<Fragment>
					{ postFeedType === 'internal' &&
						<QueryControls
							{ ...{ order, orderBy } }
							categoriesList={ categoriesList }
							selectedCategoryId={ categoriesList.categories }
							onOrderChange={ ( value ) => setAttributes( { order: value } ) }
							onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
							onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						/>
					}
					<RangeControl
						label={ __( 'Number of posts', 'coblocks' ) }
						value={ postsToShow }
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
					<div className="editor-block-styles block-editor-block-styles coblocks-editor-block-styles">
						{ styleOptions.map( style => (
							<div
								key={ `style-${ style.name }` }
								className={ classnames(
									'editor-block-styles__item block-editor-block-styles__item',
									{
										'is-active': activeStyle === style,
									}
								) }
								onClick={ () => onUpdateStyle( style ) }
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
								<div className="editor-block-styles__item-preview block-editor-block-styles__item-preview">
									{ listPosition === 'left' && style.iconAlt ? style.iconAlt : style.icon }
								</div>
								<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
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
