/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment, createRef } = wp.element;
const { compose, withState } = wp.compose;
const { BlockControls } = wp.editor;
const { RangeControl, PanelBody, withFallbackStyles, FontSizePicker, ToggleControl, Button, Popover, Dropdown, IconButton, SelectControl, TextControl } = wp.components;



/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Typography Component
 */
class IconControls extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = { forceClose: false, filteredIcons : icons , searchValue: '' };
	}

	render() {

		const {
			attributes,
			fallbackFontSize,
			fallbackTextColor,
			fontSize,
			setState,
			setAttributes,
			setFontSize,
			setTextColor,
			textColor,
			renderContent,
			renderToggle,
			position = 'bottom',
			contentClassName,
			expandOnMobile,
			onToggle,
			className,
			headerTitle,
			label = __( 'Typography Settings' ),
		} = this.props;

		const {
			icon,
		} = attributes;

		const filterList = ( event, onToggle ) => {
			var filtered = {};

			this.setState({ searchValue: event });

		    var updatedList = Object.entries( icons ).filter(function(item){
		    	var text = item[0];
		      	return text.toLowerCase().search(
		        event.toLowerCase()) !== -1;
		    });

		    updatedList.forEach(([key, value]) => {
		    	filtered[ key ] = icons[key];
			});

		    this.setState({ filteredIcons: filtered });
		};

		return (
			<Fragment>
				<Dropdown
					className={ classnames( 'components-dropdown-menu', 'components-coblocks-icons-dropdown' ) }
					contentClassName="components-dropdown-menu__popover components-coblocks-icons-dropdown"
					renderToggle={ ( { isOpen, onToggle, onClose } ) => {
						const openOnArrowDown = ( event ) => {
							if ( ! isOpen && event.keyCode === DOWN ) {
								event.preventDefault();
								event.stopPropagation();
								onToggle();
							}
						};

						return (
							<IconButton
								className="components-dropdown-menu__toggle"
								icon={ icon ? icons[ icon ] : icons.file }
								onClick={ onToggle }
								onKeyDown={ openOnArrowDown }
								aria-haspopup="true"
								aria-expanded={ isOpen }
								label={ label }
								tooltip={ label }
							>
								<span className="components-dropdown-menu__indicator" />
							</IconButton>
						);
					} }
					renderContent={ ( { onClose, isOpen, onToggle } ) => (
						<Fragment>
							<div className="components-coblocks-icons-dropdown__inner">
								<TextControl
									label={ __( 'Search' ) }
									value={ this.state.searchValue }
									onChange={ (evt) => { filterList( evt, onToggle ) } }
								/>
								<ul role="list" className="editor-block-types-list">
									{ Object.keys( this.state.filteredIcons ).map( ( keyName, i ) => {
										return[
											<li className="editor-block-types-list__list-item">
												<Button
													isLarge
													onClick={ () => {
														setAttributes({ icon: keyName });
														// onClose();
													} }
												>
													{ icons[ keyName ] }
												</Button>
											</li>
										];
									}) }
								</ul>
							</div>
						</Fragment>
					) }
				/>
			</Fragment>
		);
	}
}

export default compose( [
	applyFallbackStyles,
] )( IconControls );