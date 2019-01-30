/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import svg from '../icons/icons';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, RangeControl, TextControl, Button } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = { filteredIcons : svg , searchValue: '' };
	}

	getDisplayOpenHelp( checked ) {
		return checked ? __( 'Accordion item is open by default.' ) : __( 'Toggle to set this accordion item to be open by default.' );
	}

	setBorderColor() {

		this.props.setAttributes( {
			borderColor: this.props.backgroundColor.color,
		} )

		return this.props.setBackgroundColor;
	}

	render() {

		const {
			attributes,
			setAttributes,
			backgroundColor,
			textColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			setBackgroundColor,
			setTextColor,
			className,
		} = this.props;

		const {
			icon,
			style,
			borderRadius,
			padding,
		} = attributes;

		let iconStyle = 'filled';

		if( className.includes( 'is-style-outlined' ) ){
			iconStyle = 'outlined';
		}

		const filterList = ( event ) => {
			var filtered = {};

			this.setState({ searchValue: event });

		    var updatedList = Object.entries( svg[iconStyle] ).filter(function(item){
		    	var text = item[0] + ' ' + item[1].keywords;
		      	return text.toLowerCase().search(
		        event.toLowerCase()) !== -1;
		    });

		    filtered[ 'filled' ] = {};
		    filtered[ 'outlined' ] = {};
		    updatedList.forEach(([key, value]) => {
		    	filtered[ 'filled' ][ key ] = svg[ 'filled' ][key];
		    	filtered[ 'outlined' ][ key ] = svg[ 'outlined' ][key];
			});

		    this.setState({ filteredIcons: filtered });
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Settings' ) }>
						<TextControl
							type='text'
							autocomplete="off"
							label={ __( 'Select Icon' ) }
							value={ this.state.searchValue }
							placeholder={ __( 'Search for an icon' ) }
							onChange={ (evt) => {
									filterList( evt );
								}
							}
						/>
						<ul role="list" className="editor-block-types-list coblocks-icon-types-list">
							<li className="editor-block-types-list__list-item selected-svg">
								<Button
									isLarge
									className="editor-block-list-item-button"
									onClick={ () => {
										return false;
									} }
								>
									<span className="editor-block-types-list__item-icon">
										{ svg[ iconStyle ][ icon ].icon }
									</span>
								</Button>
							</li>
							{ Object.keys( this.state.filteredIcons[ iconStyle ] ).map( ( keyName, i ) => {
								return[
									<li className={ classnames(
										'editor-block-types-list__list-item',{
											[ 'selected-svg' ] : icon && ( icon == keyName )
										},
									) }>
										<Button
											isLarge
											className="editor-block-list-item-button"
											onClick={ () => {
												setAttributes({ icon: keyName });
											} }
										>
											<span className="editor-block-types-list__item-icon">
												{ svg[ iconStyle ][ keyName ].icon }
											</span>
										</Button>
									</li>
								];
							}) }
						</ul>
						{ ( backgroundColor.color ) ? 
							[ <RangeControl
								label={ __( 'Border Radius' ) }
								value={ borderRadius }
								onChange={ ( nextBorderRadius ) => setAttributes( {  borderRadius: nextBorderRadius } ) }
								min={ 0 }
								max={ 999 }
								step={ 1 }
							/>,
							<RangeControl
								label={ __( 'Padding' ) }
								value={ padding }
								onChange={ ( nextPadding ) => setAttributes( {  padding: nextPadding } ) }
								min={ 0 }
								max={ 999 }
								step={ 1 }
							/> ] : null }
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								isLargeText: true,
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Icon Color' ),
							},
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
							},

						] }
					>
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackTextColor,
							fallbackBackgroundColor,
						} }
					/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
};

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
