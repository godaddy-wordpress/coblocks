
/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import svg from './svgs';
import { DEFAULT_ICON_SIZE } from '.././';
import { MIN_ICON_SIZE, MAX_ICON_SIZE } from './edit';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, RangeControl, TextControl, Button, BaseControl, NavigableMenu, Dropdown, ButtonGroup, Dashicon } = wp.components;

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

		this.state = { filteredIcons : svg , searchValue: '', isSearching: false };

		this.onChangeSize = this.onChangeSize.bind( this );
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

	onChangeSize( value, size ) {
		this.props.setAttributes( { iconSize: value } );
		if( size ){
			if( size < 0 ){
				size = '';
			}
			this.props.setAttributes( { height: size, width: size } );
		}
	}

	render() {

		const {
			clientId,
			attributes,
			setAttributes,
			backgroundColor,
			textColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			setBackgroundColor,
			setTextColor,
			className,
			label = __( 'Size' ),
			help,
		} = this.props;

		const {
			icon,
			style,
			borderRadius,
			padding,
			iconSize,
			width,
			height,
		} = attributes;

		let iconStyle = 'filled';

		if( className.includes( 'is-style-outlined' ) ){
			iconStyle = 'outlined';
		}

		const filterList = ( event ) => {
			var filtered = {};

			this.setState({ searchValue: event, isSearching: true });

			if( event == '' ){
				this.setState({ isSearching: false });
			}

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

		const utilitySizes = [
			{
				name: __( 'Small' ),
				size: 40,
				slug: 'small',
			},
			{
				name: __( 'Medium' ),
				size: DEFAULT_ICON_SIZE,
				slug: 'medium',
			},
			{
				name: __( 'Large' ),
				size: 120,
				slug: 'large',
			},{
				name: __( 'Huge' ),
				size: 200,
				slug: 'huge',
			},
		];

		const currentSize = utilitySizes.find( ( utility ) => utility.slug === iconSize );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Settings' ) }>
						{ iconSize === 'advanced' ?
							<Fragment>
								<div className='components-coblocks-icon-block--advanced-size'>
									<Button
										className="components-color-palette__clear"
										type="button"
										onClick={ () => {
											document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[0].style.height = 'auto';
											this.onChangeSize( 'medium', DEFAULT_ICON_SIZE );
										} }
										isSmall
										isDefault
										aria-label={ sprintf( __( 'Turn off advanced %s settings' ), label.toLowerCase() ) }
									>
										{ __( 'Reset' ) }
									</Button>
									<RangeControl
										label={ __( 'Custom Size' ) }
										value={ width }
										onChange={ ( nextWidth ) => {
											document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[0].style.height = 'auto';
											setAttributes( {  width: nextWidth, height: nextWidth } )
										} }
										min={ MIN_ICON_SIZE }
										max={ MAX_ICON_SIZE }
										step={ 1 }
									/>
								</div>
							</Fragment> :
							<BaseControl id="textarea-1" label={ label } help={ help }>
								<div className="components-font-size-picker__buttons">
									<Dropdown
										className="components-font-size-picker__dropdown"
										contentClassName="components-font-size-picker__dropdown-content components-coblocks-dimensions-control__dropdown-content"
										position="bottom"
										renderToggle={ ( { isOpen, onToggle } ) => (
											<Button
												className="components-font-size-picker__selector"
												isLarge
												onClick={ onToggle }
												aria-expanded={ isOpen }
												aria-label={ sprintf( __( 'Custom %s size' ), label.toLowerCase() ) }
											>
												{ ( currentSize && currentSize.name ) || ( ! iconSize && _x( 'Normal', 'size name' ) ) || _x( 'Custom', 'size name' ) }
											</Button>
										) }
										renderContent={ () => (
											<NavigableMenu>
												{ map( utilitySizes, ( { name, size, slug } ) => (
													<Button
														key={ slug }
														onClick={ () => this.onChangeSize( slug, size ) }
														className={ `is-${ slug }-padding` }
														role="menuitem"
													>
														{ ( iconSize === slug || ( ! iconSize && slug === 'normal' ) ) && <Dashicon icon="saved" /> }
														<span className="components-font-size-picker__dropdown-text-size">
															{ name }
														</span>
													</Button>
												) ) }
											</NavigableMenu>
										) }
									/>
									<Button
										className="components-color-palette__clear"
										type="button"
										onClick={ () => this.onChangeSize( 'advanced', '' ) }
										isDefault
										aria-label={ sprintf( __( 'Advanced %s settings' ), label.toLowerCase() ) }
										isPrimary={ iconSize === 'advanced' }
									>
										{ __( 'Advanced' ) }
									</Button>
								</div>
							</BaseControl>
						}
						{ ( backgroundColor.color ) ?
							[ <RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ borderRadius }
								onChange={ ( nextBorderRadius ) => setAttributes( {  borderRadius: nextBorderRadius } ) }
								min={ 0 }
								max={ 200 }
								step={ 1 }
							/>,
							<RangeControl
								label={ __( 'Padding' ) }
								value={ padding }
								onChange={ ( nextPadding ) => setAttributes( {  padding: nextPadding } ) }
								min={ 0 }
								max={ 100 }
								step={ 1 }
							/>
							]
						: null }
						<TextControl
							type='text'
							autocomplete="off"
							label={ __( 'Icon Search' ) }
							value={ this.state.searchValue }
							className="coblocks-icon-types-list__search"
							onChange={ (evt) => {
									filterList( evt );
								}
							}
						/>
						<div className="coblocks-icon-types-list-wrapper">
							<ul role="list" className="editor-block-types-list coblocks-icon-types-list">
								{ ! this.state.isSearching ?
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
									: null
								}
								{ Object.keys( this.state.filteredIcons[ iconStyle ] ).length > 0 ? Object.keys( this.state.filteredIcons[ iconStyle ] ).map( ( keyName, i ) => {
									return[
										<li className={ classnames(
											'editor-block-types-list__list-item',{
												[ 'is-selected' ] : icon && ( icon == keyName )
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
								}) : <p> { __( 'Nothing found' ) } </p> }
							</ul>
						</div>
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
