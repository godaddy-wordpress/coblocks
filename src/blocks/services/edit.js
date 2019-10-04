/**
 * External dependencies.
 */
import { find } from 'lodash';

/**
 * Internal dependencies.
 */
import InspectorControls from './inspector';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
} = wp.blockEditor;
const { dispatch, select } = wp.data;
const TokenList = wp.tokenList;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/service' ];

const layoutOptions = [
	{
		name: 'threebyfour',
		label: '4:3',
		icon: icons.service43,
		isDefault: true,
	},
	{
		name: 'sixbynine',
		label: '16:9',
		icon: icons.service169,
	},
	{
		name: 'square',
		label: __( 'Square' ),
		icon: icons.serviceSquare,
	},
	{
		name: 'circle',
		label: __( 'Circle' ),
		icon: icons.serviceCircle,
		defaultAlign: 'center',
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
			if ( 'circle' === activeStyle.name && ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ) {
				this.onChangeAlignment( 'center' );
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
		const innerItems = select( 'core/block-editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
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

		const buttons = ! attributes.buttons;
		setAttributes( { buttons } );

		this.updateInnerAttributes( 'coblocks/service', { showCta: buttons } );
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
				<InspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					activeStyle={ activeStyle }
					layoutOptions={ layoutOptions }
					onChangeHeadingLevel={ this.onChangeHeadingLevel }
					onToggleCtas={ this.toggleCtas }
					onUpdateStyle={ this.updateStyle }
					onSetColumns={ this.setColumns }
				/>
				<div className={ className } data-columns={ attributes.columns }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ Array( attributes.columns ).fill( [
							'coblocks/service',
							{
								showCta: attributes.buttons,
								headingLevel: attributes.headingLevel,
								alignment: attributes.alignment,
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
