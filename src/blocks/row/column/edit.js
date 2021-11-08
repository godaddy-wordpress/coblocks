/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';
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
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { useState } from '@wordpress/element';
import { ResizableBox, Spinner } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';

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
			'has-margin': marginSize && marginSize !== 'no',
			'has-padding': paddingSize && paddingSize !== 'no',
			'has-text-color': textColor.color,
			[ `has-${ paddingSize }-padding` ]:
				paddingSize && ! [ 'no', 'advanced' ].includes( paddingSize ),
			[ `has-${ marginSize }-margin` ]: marginSize && ! [ 'no', 'advanced' ].includes( marginSize ),
		}
	);

	const innerStyles = {
		...BackgroundStyles( attributes ),
		backgroundColor: backgroundColor.color,
		color: textColor.color,
		marginBottom:
			marginSize === 'advanced' && marginBottom
				? marginBottom + marginUnit
				: undefined,
		marginLeft:
			marginSize === 'advanced' && marginLeft
				? marginLeft + marginUnit
				: undefined,
		marginRight:
			marginSize === 'advanced' && marginRight
				? marginRight + marginUnit
				: undefined,
		marginTop:
			marginSize === 'advanced' && marginTop
				? marginTop + marginUnit
				: undefined,
		paddingBottom:
			paddingSize === 'advanced' && paddingBottom
				? paddingBottom + paddingUnit
				: undefined,
		paddingLeft:
			paddingSize === 'advanced' && paddingLeft
				? paddingLeft + paddingUnit
				: undefined,
		paddingRight:
			paddingSize === 'advanced' && paddingRight
				? paddingRight + paddingUnit
				: undefined,
		paddingTop:
			paddingSize === 'advanced' && paddingTop
				? paddingTop + paddingUnit
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
							<InnerBlocks renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender } templateLock={ false } />
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
					'is-resizing': resizing,
					'is-selected-column': isSelected,
				} ) }
				enable={ {
					bottom: false,
					bottomLeft: false,
					bottomRight: false,
					left: false,
					right: true,
					top: false,
					topLeft: false,
					topRight: false,
				} }
				maxWidth={ maxWidth }
				minHeight="20"
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
				showHandle={ isSelected }
			>
				<div
					className={ classes }
					style={ { color: textColor.color } }
				>
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					{ BackgroundVideo( attributes ) }
					<div className={ innerClasses } style={ innerStyles }>
						<InnerBlocks renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender } templateLock={ false } />
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
		getBlockRootClientId,
		hasInnerBlocks: !! ( columnBlocks && columnBlocks.innerBlocks.length ),
		lastId,
		nextBlockClient,
		nextBlockClientId,
		parentBlocks,
		parentId,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { updateBlockAttributes } = dispatch( 'core/block-editor' );

	return {
		updateBlockAttributes,
	};
} );

export default compose( [ applyWithColors, applyWithSelect, applyWithDispatch ] )( Edit );
