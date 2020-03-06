/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';

const Inspector = ( props ) => {
	const {
		attributes,
		activeStyle,
		layoutOptions,
		onToggleImages,
		onTogglePrices,
		onUpdateStyle,
		onSetColumns,
	} = props;

	const {
		showImages,
		showPrices,
		columns,
	} = attributes;

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
				<ToggleControl
					label={ __( 'Images', 'coblocks' ) }
					help={
						showImages ?
							__( 'Showing images for each item', 'coblocks' ) :
							__( 'Toggle to show images for each item.', 'coblocks' )
					}
					checked={ showImages }
					onChange={ onToggleImages }
				/>
				<ToggleControl
					label={ __( 'Prices', 'coblocks' ) }
					help={
						showPrices ?
							__( 'Showing the price of each item', 'coblocks' ) :
							__( 'Toggle to show the price of each item.', 'coblocks' )
					}
					checked={ showPrices }
					onChange={ onTogglePrices }
				/>
				<RangeControl
					label={ __( 'Columns', 'coblocks' ) }
					value={ columns }
					onChange={ onSetColumns }
					min={ 2 }
					max={ 4 }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
