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
const { PanelBody, withFallbackStyles, ToggleControl, TextControl, Button } = wp.components;

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
		} = attributes;

		let iconStyle = 'filled';

		if( className.includes( 'is-style-outlined' ) ){
			iconStyle = 'outlined';
		}else if( className.includes( 'is-style-rounded' ) ){
			iconStyle = 'rounded';
		}

		const filterList = ( event ) => {
			var filtered = {};

			this.setState({ searchValue: event });

		    var updatedList = Object.entries( svg[iconStyle] ).filter(function(item){
		    	var text = item[0];
		      	return text.toLowerCase().search(
		        event.toLowerCase()) !== -1;
		    });

		    filtered[ iconStyle ] = {};
		    updatedList.forEach(([key, value]) => {
		    	filtered[iconStyle][ key ] = svg[iconStyle][key];
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
										{ svg[ iconStyle ][ icon ] }
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
												{ svg[ iconStyle ][ keyName ] }
											</span>
										</Button>
									</li>
								];
							}) }
						</ul>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: this.setBorderColor(),
								label: __( 'Background Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Title Text Color' ),
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
