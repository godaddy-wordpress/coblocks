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
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import TokenList from '@wordpress/token-list';
import { createBlock } from '@wordpress/blocks';
import { Component, Fragment, useState, useEffect } from '@wordpress/element';
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

const Edit = ( props ) => {
	const {	className, attributes, setAttributes, innerBlocks } = props;

	const updateStyle = ( style ) => {
		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	};

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		const { updateBlockAttributes, getBlocksByClientId } = props;
		const innerItems = getBlocksByClientId(	props.clientId	)[ 0 ].innerBlocks;
		innerItems.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	const onChangeAlignment = ( alignment ) => {
		setAttributes( { alignment } );
		updateInnerAttributes( 'coblocks/service', { alignment } );
	};

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/service', { headingLevel } );
	};

	const toggleCtas = () => {
		const buttons = ! attributes.buttons;
		setAttributes( { buttons } );

		updateInnerAttributes( 'coblocks/service', { showCta: buttons } );
	};

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	/* istanbul ignore next */
	useEffect( () => {
		const activeStyle = getActiveStyle( layoutOptions, attributes.className );
		return () => {
			const lastActiveStyle = getActiveStyle(
				layoutOptions,
				attributes.className
			);

			if ( activeStyle !== lastActiveStyle ) {
				if ( 'circle' === activeStyle.name && ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ) {
					onChangeAlignment( 'center' );
				}
			}
		};
	}, [ attributes.className ] );

	/* istanbul ignore next */
	useEffect( () => {
		if ( innerBlocks.length > 0 ) {
			const serviceBlocksCount = innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/service' ), 0 );

			// Add a new block if the count is less than the columns set.
			if ( serviceBlocksCount < attributes.columns ) {
				const { buttons, headingLevel, alignment, insertBlock, clientId } = props;

				insertBlock(
					createBlock( 'coblocks/service', {
						showCta: buttons,
						headingLevel,
						alignment,
					} ),
					innerBlocks.length + 1,
					clientId,
					false,
				);
			}
		}
	}, [ innerBlocks ] );

	const {
		alignment,
		columns,
	} = attributes;

	const classes = classnames(
		'has-columns', {
			[ `has-${ columns }-columns` ]: columns,
			'has-responsive-columns': columns > 1,
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
					onChange={ onChangeHeadingLevel }
				/>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				activeStyle={ activeStyle }
				layoutOptions={ layoutOptions }
				onToggleCtas={ toggleCtas }
				onUpdateStyle={ updateStyle }
				onSetColumns={ setColumns }
			/>
			<div className={ className }>
				<GutterWrapper { ...attributes } >
					<div className={ classes }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							orientation={ attributes.columns > 1 ? 'horizontal' : 'vertical' }
							templateInsertUpdatesSelection={ false }
							__experimentalCaptureToolbars={ true }
						/>
					</div>
				</GutterWrapper>
			</div>
		</Fragment>
	);
};

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

] )( Edit );
