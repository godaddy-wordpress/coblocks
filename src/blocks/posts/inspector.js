/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';
import {
	PanelBody,
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

	const isStackedStyle = ( 'stacked' === activeStyle.name );
	const isHorizontalStyle = ( 'horizontal' === activeStyle.name );

	const sizeOptions = [
		{
			value: 'w-1/7 h-1/7',
			label: _x( 'Small', 'label for small size option', 'coblocks' ),
			shortName: _x( 'S', 'abbreviation for "Small" size', 'coblocks' ),
		},
		{
			value: 'w-1/7 sm:w-1/5 h-1/7 sm:h-1/5',
			label: _x( 'Medium', 'label for medium size option', 'coblocks' ),
			shortName: _x( 'M', 'abbreviation for "Medium" size', 'coblocks' ),
		},
		{
			value: 'w-1/7 sm:w-1/3 h-1/7 sm:h-1/3',
			label: _x( 'Large', 'label for large size option', 'coblocks' ),
			shortName: _x( 'L', 'abbreviation for "Large" size', 'coblocks' ),
		},
		{
			value: 'w-1/7 sm:w-1/3 md:w-1/2 h-1/7 sm:h-1/3 md:h-1/2',
			label: _x( 'Extra Large', 'label for large size option', 'coblocks' ),
			shortName: _x( 'XL', 'abbreviation for "Large" size', 'coblocks' ),
		},
	];

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
						setAttributes( { columns: value } );
					} }
					min={ isStackedStyle ? 2 : 1 }
					max={ isHorizontalStyle ? 2 : Math.min( 4, postCount ) }
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
						onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
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
