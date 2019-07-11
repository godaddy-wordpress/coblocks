/**
 * Internal dependencies
 */
import HeadingToolbar from '../../components/heading-toolbar';

/**
 * External dependencies.
 */
import { find } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor;
const { PanelBody, ToggleControl, RangeControl } = wp.components;
const { dispatch, select } = wp.data;
const TokenList = wp.tokenList;
const { ENTER, SPACE } = wp.keycodes;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/service' ];

const layoutOptions = [
	{
		name: 'sixteenbynine',
		label: __( '16:9' ),
		icon: '',
		isDefault: true,
	},
	{
		name: 'square',
		label: __( 'Square' ),
		icon: '',
	},
	{
		name: 'circle',
		label: __( 'Circle' ),
		icon: '',
	},
];

/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */
function getActiveStyle( styles, className ) {
	for ( const style of new TokenList( className ).values() ) {
		if ( style.indexOf( 'is-style-' ) === -1 ) {
			continue;
		}

		const potentialStyleName = style.substring( 9 );
		const activeStyle = find( styles, { name: potentialStyleName } );

		if ( activeStyle ) {
			return activeStyle;
		}
	}

	return find( styles, 'isDefault' );
}

/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */
function replaceActiveStyle( className, activeStyle, newStyle ) {
	const list = new TokenList( className );

	if ( activeStyle ) {
		list.remove( 'is-style-' + activeStyle.name );
	}

	list.add( 'is-style-' + newStyle.name );

	return list.value;
}

class Edit extends Component {
	componentDidUpdate( prevProps ) {
		const { attributes } = this.props;
		const activeStyle = getActiveStyle( layoutOptions, attributes.className );
		const lastActiveStyle = getActiveStyle(
			layoutOptions,
			prevProps.attributes.className
		);

		if ( activeStyle !== lastActiveStyle ) {
			if ( 'circle' === activeStyle.name ) {
				this.onChangeAlignment( 'center' );
			} else {
				this.onChangeAlignment( 'none' );
			}
		}
	}

	updateStyle = style => {
		const { className, attributes, setAttributes } = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	};

	updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerItems = select( 'core/editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	onChangeAlignment = alignment => {
		const { setAttributes } = this.props;

		setAttributes( { alignment } );
		this.updateInnerAttributes( 'coblocks/service', { alignment } );
	};

	onChangeHeadingLevel = headingLevel => {
		const { setAttributes } = this.props;

		setAttributes( { headingLevel } );
		this.updateInnerAttributes( 'coblocks/service', { headingLevel } );
	};

	toggleCtas = () => {
		const { attributes, setAttributes } = this.props;

		const showCtas = ! attributes.showCtas;
		setAttributes( { showCtas } );

		this.updateInnerAttributes( 'coblocks/service', { showCta: showCtas } );
	};

	render() {
		const { className, attributes, setAttributes } = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ this.onChangeAlignment }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
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
									onClick={ () => this.updateStyle( style ) }
									onKeyDown={ event => {
										if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
											event.preventDefault();
											this.updateStyle( style );
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
					<PanelBody title={ __( 'Group Settings' ) }>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ attributes.columns }
							min={ 1 }
							max={ 3 }
							onChange={ columns => setAttributes( { columns } ) }
						/>
						<p>{ __( 'Heading Level' ) }</p>
						<HeadingToolbar
							minLevel={ 1 }
							maxLevel={ 7 }
							selectedLevel={ attributes.headingLevel }
							onChange={ this.onChangeHeadingLevel }
						/>
						<ToggleControl
							label={ __( 'Action Buttons' ) }
							help={
								attributes.showCtas ?
									__( 'Showing the call to action buttons.' ) :
									__( 'Toggle to show call to action buttons.' )
							}
							checked={ attributes.showCtas }
							onChange={ this.toggleCtas }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className } data-columns={ attributes.columns }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ Array( attributes.columns ).fill( [
							'coblocks/service',
							{
								showCta: attributes.showCtas,
								headingLevel: attributes.headingLevel,
							},
						] ) }
						templateLock="all"
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</Fragment>
		);
	}
}

export default Edit;
