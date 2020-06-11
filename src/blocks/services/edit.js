/**
 * External dependencies.
 */
import { find } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import InspectorControls from './inspector';
import icons from './icons';
import HeadingToolbar from '../../components/heading-toolbar';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import TokenList from '@wordpress/token-list';
import { createBlock } from '@wordpress/blocks';
import { Component, Fragment } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { AlignmentToolbar, BlockControls, InnerBlocks } from '@wordpress/block-editor';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/service' ];
const TEMPLATE = [ [ 'coblocks/service' ] ];

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
		label: __( 'Square', 'coblocks' ),
		icon: icons.serviceSquare,
	},
	{
		name: 'circle',
		label: __( 'Circle', 'coblocks' ),
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
	constructor() {
		super( ...arguments );

		this.updateStyle = this.updateStyle.bind( this );
		this.updateInnerAttributes = this.updateInnerAttributes.bind( this );
		this.onChangeAlignment = this.onChangeAlignment.bind( this );
		this.onChangeHeadingLevel = this.onChangeHeadingLevel.bind( this );
		this.toggleCtas = this.toggleCtas.bind( this );
	}

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

	updateStyle( style ) {
		const { className, attributes, setAttributes } = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	}

	updateInnerAttributes( blockName, newAttributes ) {
		const { updateBlockAttributes, getBlocksByClientId } = this.props;
		const innerItems = getBlocksByClientId(	this.props.clientId	)[ 0 ].innerBlocks;
		innerItems.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	}

	onChangeAlignment( alignment ) {
		const { setAttributes } = this.props;

		setAttributes( { alignment } );
		this.updateInnerAttributes( 'coblocks/service', { alignment } );
	}

	onChangeHeadingLevel( headingLevel ) {
		const { setAttributes } = this.props;

		setAttributes( { headingLevel } );
		this.updateInnerAttributes( 'coblocks/service', { headingLevel } );
	}

	toggleCtas() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const buttons = ! attributes.buttons;
		setAttributes( { buttons } );

		this.updateInnerAttributes( 'coblocks/service', { showCta: buttons } );
	}

	render() {
		const {
			className,
			attributes,
			setAttributes,
		} = this.props;

		const {
			alignment,
			columns,
			gutter,
		} = attributes;

		const classes = classnames(
			'has-columns', {
				[ `has-${ columns }-columns` ]: columns,
				'has-responsive-columns': columns > 1,
				[ `has-${ gutter }-gutter` ]: gutter,
			}
		);

		const activeStyle = getActiveStyle( layoutOptions, className );

		return (
			<Fragment>
				<BlockControls>
					<HeadingToolbar
						minLevel={ 2 }
						maxLevel={ 6 }
						selectedLevel={ attributes.headingLevel }
						onChange={ this.onChangeHeadingLevel }
					/>
					<AlignmentToolbar
						value={ alignment }
						onChange={ this.onChangeAlignment }
					/>
				</BlockControls>
				<InspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					activeStyle={ activeStyle }
					layoutOptions={ layoutOptions }
					onToggleCtas={ this.toggleCtas }
					onUpdateStyle={ this.updateStyle }
					onSetColumns={ this.setColumns }
				/>
				<div className={ className }>
					<div className={ classes }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getBlocksByClientId,
			getBlocks,
		} = select( 'core/block-editor' );

		return {
			getBlocksByClientId,
			innerBlocks: getBlocks( props.clientId ),
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			updateBlockAttributes,
			insertBlock,
		} = dispatch( 'core/block-editor' );
		return {
			updateBlockAttributes,
			insertBlock,
		};
	} ),

	// Ensure there is a minimum of one coblocks/services innerBlock per column set.
	( WrappedComponent ) => ( ownProps ) => {
		// This is a newly added block if we have zero innerBlocks. We want the TEMPLATE definition to be used in this case.
		if ( ownProps.innerBlocks.length > 0 ) {
			const serviceBlocksCount = ownProps.innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/service' ), 0 );

			// Add a new block if the count is less than the columns set.
			// We don't need a loop here because this will trigger a component update as soon as we insert a block (triggering this HOC again).

			if ( serviceBlocksCount < ownProps.attributes.columns ) {
				const { buttons, headingLevel, alignment } = ownProps;
				ownProps.insertBlock(
					createBlock( 'coblocks/service', {
						showCta: buttons,
						headingLevel,
						alignment,
					} ),
					ownProps.innerBlocks.length + 1,
					ownProps.clientId,
					false
				);
			}
		}

		return <WrappedComponent { ...ownProps } />;
	},

] )( Edit );
