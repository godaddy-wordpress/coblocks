/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';

const Inspector = ( props ) => {
	const {
		activeStyle,
		attributes,
		layoutOptions,
		onSetColumns,
		onSetGutter,
		onToggleImages,
		onTogglePrices,
		onUpdateStyle,
	} = props;

	const {
		showImages,
		showPrices,
	} = attributes;

	const gutterOptions = [
		{
			value: 'small',
			/* translators: abbreviation for small size */
			label: __( 'S', 'coblocks' ),
			tooltip: __( 'Small', 'coblocks' ),
		},
		{
			value: 'medium',
			/* translators: abbreviation for medium size */
			label: __( 'M', 'coblocks' ),
			tooltip: __( 'Medium', 'coblocks' ),
		},
		{
			value: 'large',
			/* translators: abbreviation for large size */
			label: __( 'L', 'coblocks' ),
			tooltip: __( 'Large', 'coblocks' ),
		},
		{
			value: 'huge',
			/* translators: abbreviation for largest size */
			label: __( 'XL', 'coblocks' ),
			tooltip: __( 'Huge', 'coblocks' ),
		},
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
				<div className="block-editor-block-styles block-editor-block-styles coblocks-editor-block-styles">
					{ layoutOptions.map( ( style ) => (
						<div
							key={ `style-${ style.name }` }
							className={ classnames(
								'block-editor-block-styles__item block-editor-block-styles__item',
								{
									'is-active': activeStyle === style,
								}
							) }
							onClick={ () => onUpdateStyle( style ) }
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
							<div className="block-editor-block-styles__item-preview block-editor-block-styles__item-preview">
								{ showImages ? style.iconWithImages : style.icon }
							</div>
							<div className="block-editor-block-styles__item-label block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>

			<PanelBody title={ __( 'Food & Drinks Settings', 'coblocks' ) } initialOpen={ true }>
				{ activeStyle.name === 'grid' &&
					<>
						<RangeControl
							label={ __( 'Columns', 'coblocks' ) }
							value={ attributes.columns }
							min={ 2 }
							max={ 4 }
							onChange={ ( newColumns ) => onSetColumns( newColumns ) }
						/>
						<OptionSelectorControl
							label={ __( 'Gutter', 'coblocks' ) }
							currentOption={ attributes.gutter }
							options={ gutterOptions }
							onChange={ ( newGutter ) => onSetGutter( newGutter ) }
						/>
					</>
				}
				<ToggleControl
					label={ __( 'Images', 'coblocks' ) }
					help={
						showImages
							? __( 'Showing images for each item', 'coblocks' )
							: __( 'Toggle to show images for each item.', 'coblocks' )
					}
					checked={ showImages }
					onChange={ onToggleImages }
				/>
				<ToggleControl
					label={ __( 'Prices', 'coblocks' ) }
					help={
						showPrices
							? __( 'Showing the price of each item', 'coblocks' )
							: __( 'Toggle to show the price of each item.', 'coblocks' )
					}
					checked={ showPrices }
					onChange={ onTogglePrices }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
