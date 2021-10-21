/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import applyWithColors from './colors';
import {
	BackgroundClasses,
	BackgroundDropZone,
	BackgroundStyles,
	BackgroundVideo,
} from '../../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { ResizableBox, Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const [ selectedWidth, setSelectedWidth ] = useState( 0 );
	const [ selectedBlockWidth ] = useState( 0 );
	const [ maxWidth ] = useState( 999999999 );
	const [ resizing, setResizing ] = useState( false );

	const {
		columnBlocks,
		attributes,
		className,
		isSelected,
		setAttributes,
		backgroundColor,
		textColor,
		hasInnerBlocks,
		parentId,
		nextBlockClient,
		nextBlockClientId,
		updateBlockAttributes,
		clientId,
	} = props;

	const {
		coblocks,
		backgroundImg,
		width,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		paddingUnit,
		marginUnit,
		marginSize,
		paddingSize,
		contentAlign,
		verticalAlignment,
	} = attributes;

	const dropZone = (
		<BackgroundDropZone
			{ ...props }
			label={ __( 'Add background to column', 'coblocks' ) }
		/>
	);

	let classes = classnames( 'wp-block-coblocks-column', {
		'wp-block-coblocks-column-placeholder':
			columnBlocks &&
			columnBlocks.innerBlocks &&
			Object.keys( columnBlocks.innerBlocks ).length < 1,
	}, {
		[ `has-text-align-${ contentAlign }` ]: contentAlign,
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-column-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-column__inner',
		...BackgroundClasses( attributes ),
		{
			'has-text-color': textColor.color,
			'has-padding': paddingSize && paddingSize !== 'no',
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ paddingSize }-padding` ]:
				paddingSize && ! [ 'no', 'advanced' ].includes( paddingSize ),
			[ `has-${ marginSize }-margin` ]: marginSize && ! [ 'no', 'advanced' ].includes( marginSize ),
		}
	);

	const innerStyles = {
		...BackgroundStyles( attributes ),
		backgroundColor: backgroundColor.color,
		color: textColor.color,
		paddingTop:
			paddingSize === 'advanced' && paddingTop
				? paddingTop + paddingUnit
				: undefined,
		paddingRight:
			paddingSize === 'advanced' && paddingRight
				? paddingRight + paddingUnit
				: undefined,
		paddingBottom:
			paddingSize === 'advanced' && paddingBottom
				? paddingBottom + paddingUnit
				: undefined,
		paddingLeft:
			paddingSize === 'advanced' && paddingLeft
				? paddingLeft + paddingUnit
				: undefined,
		marginTop:
			marginSize === 'advanced' && marginTop
				? marginTop + marginUnit
				: undefined,
		marginRight:
			marginSize === 'advanced' && marginRight
				? marginRight + marginUnit
				: undefined,
		marginBottom:
			marginSize === 'advanced' && marginBottom
				? marginBottom + marginUnit
				: undefined,
		marginLeft:
			marginSize === 'advanced' && marginLeft
				? marginLeft + marginUnit
				: undefined,
	};

	if ( parseInt( width ) === 100 ) {
		return (
			<>
				{ dropZone }
				{ isSelected && <Controls { ...props } /> }
				{ isSelected && <Inspector { ...props } /> }
				<div
					className={ classes }
					style={ {
						backgroundColor: backgroundColor.color,
						backgroundImage: backgroundImg
							? `url(${ backgroundImg })`
							: undefined,
						color: textColor.color,
					} }
				>
					<div className="wp-block-coblocks-column">
						<div className={ innerClasses } style={ innerStyles }>
							{ BackgroundVideo( attributes ) }
							<InnerBlocks templateLock={ false } renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender } />
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			{ dropZone }
			{ isSelected && <Controls { ...props } /> }
			{ isSelected && <Inspector { ...props } /> }
			<span
				className={ classnames( 'coblocks-resizeable-width', {
					'is-resizing': resizing,
				} ) }
			>
				{ isSelected && selectedBlockWidth > 0
					? parseFloat( selectedBlockWidth ).toFixed( 1 )
					: parseFloat( width ).toFixed( 1 ) }
				%
			</span>
			<ResizableBox
				className={ classnames( className, {
					'is-selected-column': isSelected,
					'is-resizing': resizing,
				} ) }
				maxWidth={ maxWidth }
				minHeight="20"
				enable={ {
					top: false,
					right: true,
					bottom: false,
					left: false,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false,
				} }
				onResizeStop={ () => {
					const currentBlock = document.getElementById(
						'block-' + clientId
					);

					//Remove resizing class
					currentBlock.classList.remove( 'is-resizing' );
					document
						.getElementById( 'block-' + parentId )
						.classList.remove( 'is-resizing' );
					setResizing( false );
				} }
				onResize={ ( _event, _direction, _elt, delta ) => {
					const parentBlockClientRect = document
						.getElementById( 'block-' + parentId )
						.getElementsByClassName( 'wp-block-coblocks-row__inner' )[ 0 ]
						.getBoundingClientRect();
					const currentBlockWidth = selectedWidth + delta.width;
					const currentBlockWidthPercent =
						( currentBlockWidth / parentBlockClientRect.width ) * 100;
					const diff = parseFloat( width ) - currentBlockWidthPercent;
					const nextBlockWidth =
						parseFloat( nextBlockClient.attributes.width ) + diff;

					document
						.getElementById( 'block-' + parentId )
						.classList.add( 'is-resizing' );
					document
						.getElementById( 'block-' + clientId )
						.getElementsByClassName(
							'wp-block-coblocks-column'
						)[ 0 ].style.width = 'auto';

					if ( nextBlockWidth > 10 && currentBlockWidthPercent > 10 ) {
						updateBlockAttributes( nextBlockClientId, {
							width: parseFloat( nextBlockWidth ).toFixed( 2 ),
						} );
						setAttributes( {
							width: parseFloat( currentBlockWidthPercent ).toFixed( 2 ),
						} );
					}
				} }
				onResizeStart={ () => {
					const currentBlock = document.getElementById(
						'block-' + clientId
					);
					const currentBlockClientRect = currentBlock.getBoundingClientRect();

					//Add resizing class
					currentBlock.classList.add( 'is-resizing' );
					document
						.getElementById( 'block-' + parentId )
						.classList.add( 'is-resizing' );

					setSelectedWidth( currentBlockClientRect.width );
					setResizing( true );
				} }
				showHandle={ isSelected }
			>
				<div
					className={ classes }
					style={ { color: textColor.color } }
				>
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					{ BackgroundVideo( attributes ) }
					<div className={ innerClasses } style={ innerStyles }>
						<InnerBlocks templateLock={ false } renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender } />
					</div>
				</div>
			</ResizableBox>
		</>
	);
};

const applyWithSelect = withSelect( ( select, { clientId } ) => {
	const { getBlock, getBlockRootClientId, getNextBlockClientId, getPreviousBlockClientId, getBlocksByClientId } = select( 'core/block-editor' );
	const parentId = getBlockRootClientId( clientId );
	const columnBlocks = getBlock( clientId );

	const nextBlockClientId = getNextBlockClientId( clientId ) || getPreviousBlockClientId( clientId );
	const nextBlockClient = getBlock( nextBlockClientId );

	const parentBlocks = getBlocksByClientId( parentId );
	const lastId = ( parentBlocks[ 0 ].innerBlocks !== 'undefined' ) ? parentBlocks[ 0 ].innerBlocks[ parentBlocks[ 0 ].innerBlocks.length - 1 ].clientId : clientId;

	return {
		hasInnerBlocks: !! ( columnBlocks && columnBlocks.innerBlocks.length ),
		parentId,
		nextBlockClient,
		nextBlockClientId,

		// Used in controls
		getBlockRootClientId,

		// Used in inspector
		lastId,
		parentBlocks,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { updateBlockAttributes } = dispatch( 'core/block-editor' );

	return {
		updateBlockAttributes,
	};
} );

export default compose( [ applyWithColors, applyWithSelect, applyWithDispatch ] )( Edit );
