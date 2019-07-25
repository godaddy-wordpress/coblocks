/**
 * Internal dependencies
 */
import HeadingToolbar from '../../components/heading-toolbar';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { PanelBody, ToggleControl, RangeControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { ENTER, SPACE } = wp.keycodes;

const Inspector = props => {
	const {
		attributes,
		setAttributes,
		activeStyle,
		layoutOptions,
		onChangeHeadingLevel,
		onToggleCtas,
		onUpdateStyle,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
				<div className={ classnames(
					'editor-block-styles',
					'block-editor-block-styles',
					'coblocks-editor-block-styles',
				) } >
					{ layoutOptions.map( style => (
						<div
							key={ `style-${ style.name }` }
							className={ classnames(
								'editor-block-styles__item block-editor-block-styles__item',
								{ 'is-active': activeStyle === style },
								`align-${ ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ? style.defaultAlign : attributes.alignment }`
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
								{ style.icon }
							</div>
							<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>
			<PanelBody title={ __( 'Services Settings' ) }>
				<RangeControl
					label={ __( 'Columns' ) }
					value={ attributes.columns }
					min={ 1 }
					max={ 4 }
					onChange={ columns => setAttributes( { columns } ) }
				/>
				<p>{ __( 'Heading Level' ) }</p>
				<HeadingToolbar
					minLevel={ 1 }
					maxLevel={ 7 }
					selectedLevel={ attributes.headingLevel }
					onChange={ onChangeHeadingLevel }
				/>
				<ToggleControl
					label={ __( 'Action Buttons' ) }
					className="components-toggle-control--services-action-button"
					help={
						attributes.buttons ?
							__( 'Showing the call to action buttons.' ) :
							__( 'Toggle to show call to action buttons.' )
					}
					checked={ attributes.buttons }
					onChange={ onToggleCtas }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
