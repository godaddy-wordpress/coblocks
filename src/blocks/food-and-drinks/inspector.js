/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { PanelBody, ToggleControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { ENTER, SPACE } = wp.keycodes;

const Inspector = props => {
	const {
		attributes,
		activeStyle,
		layoutOptions,
		onToggleImages,
		onTogglePrices,
		onUpdateStyle,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles' ) } initialOpen={ true }>
				<div className="editor-block-styles block-editor-block-styles coblocks-editor-block-styles">
					{ layoutOptions.map( style => (
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
								{ attributes.showImages ? style.iconWithImages : style.icon }
							</div>
							<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>

			<PanelBody title={ __( 'Food & Drinks Settings' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Images' ) }
					help={
						attributes.showImages ?
							__( 'Showing images for each item' ) :
							__( 'Toggle to show images for each item.' )
					}
					checked={ attributes.showImages }
					onChange={ onToggleImages }
				/>
				<ToggleControl
					label={ __( 'Prices' ) }
					help={
						attributes.showPrices ?
							__( 'Showing the price of each item' ) :
							__( 'Toggle to show the price of each item.' )
					}
					checked={ attributes.showPrices }
					onChange={ onTogglePrices }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
