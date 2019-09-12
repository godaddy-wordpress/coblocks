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
	BackgroundStyles,
	BackgroundClasses,
	BackgroundVideo,
	BackgroundDropZone,
} from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InnerBlocks, Inserter } = wp.blockEditor;
const { ResizableBox, Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedWidth: 0,
			nextWidth: 0,
			selectedBlockWidth: 0,
			nextBlockWidth: 0,
			maxWidth: 999999999,
			resizing: false,
		};
	}

	render() {
		const {
			clientId,
			attributes,
			className,
			isSelected,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

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
			showInserter,
		} = attributes;

		const parentId = wp.data
			.select( 'core/block-editor' )
			.getBlockRootClientId( clientId );
		const columnBlocks = wp.data.select( 'core/block-editor' ).getBlock( clientId );
		const nextBlockClientId = wp.data
			.select( 'core/block-editor' )
			.getNextBlockClientId( clientId );
		const nextBlockClient = wp.data
			.select( 'core/block-editor' )
			.getBlock( nextBlockClientId );
		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add backround to column' ) }
			/>
		);

		let classes = classnames( 'wp-block-coblocks-column', {
			'wp-block-coblocks-column-placeholder':
				columnBlocks &&
				columnBlocks.innerBlocks &&
				Object.keys( columnBlocks.innerBlocks ).length < 1,
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
					paddingSize && paddingSize !== 'advanced',
				[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			paddingTop:
				paddingSize === 'advanced' && paddingTop ?
					paddingTop + paddingUnit :
					undefined,
			paddingRight:
				paddingSize === 'advanced' && paddingRight ?
					paddingRight + paddingUnit :
					undefined,
			paddingBottom:
				paddingSize === 'advanced' && paddingBottom ?
					paddingBottom + paddingUnit :
					undefined,
			paddingLeft:
				paddingSize === 'advanced' && paddingLeft ?
					paddingLeft + paddingUnit :
					undefined,
			marginTop:
				marginSize === 'advanced' && marginTop ?
					marginTop + marginUnit :
					undefined,
			marginRight:
				marginSize === 'advanced' && marginRight ?
					marginRight + marginUnit :
					undefined,
			marginBottom:
				marginSize === 'advanced' && marginBottom ?
					marginBottom + marginUnit :
					undefined,
			marginLeft:
				marginSize === 'advanced' && marginLeft ?
					marginLeft + marginUnit :
					undefined,
		};

		if ( parseInt( width ) === 100 ) {
			return (
				<Fragment>
					{ dropZone }
					{ isSelected && <Controls { ...this.props } /> }
					{ isSelected && <Inspector { ...this.props } /> }
					<div
						className={ classes }
						style={ {
							backgroundColor: backgroundColor.color,
							backgroundImage: backgroundImg ?
								`url(${ backgroundImg })` :
								undefined,
							color: textColor.color,
							textAlign: contentAlign,
						} }
					>
						<div className="wp-block-coblocks-column">
							<div className={ innerClasses } style={ innerStyles }>
								{ BackgroundVideo( attributes ) }
								<InnerBlocks templateLock={ false } />
								{ showInserter ? (
									<Inserter rootClientId={ clientId } isAppender />
								) : null }
							</div>
						</div>
					</div>
				</Fragment>
			);
		}

		return (
			<Fragment>
				{ dropZone }
				{ isSelected && <Controls { ...this.props } /> }
				{ isSelected && <Inspector { ...this.props } /> }
				<span
					className={ classnames( 'coblocks-resizeable-width', {
						'is-resizing': this.state.resizing,
					} ) }
				>
					{ isSelected && this.state.selectedBlockWidth > 0 ?
						parseFloat( this.state.selectedBlockWidth ).toFixed( 1 ) :
						parseFloat( width ).toFixed( 1 ) }
					%
				</span>
				<ResizableBox
					className={ classnames( className, {
						'is-selected-column': isSelected,
						'is-resizing': this.state.resizing,
					} ) }
					maxWidth={ this.state.maxWidth }
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
							'block-' + this.props.clientId
						);

						//Remove resizing class
						currentBlock.classList.remove( 'is-resizing' );
						document
							.getElementById( 'block-' + parentId )
							.classList.remove( 'is-resizing' );
						this.setState( { resizing: false } );
					} }
					onResize={ ( _event, _direction, _elt, delta ) => {
						const parentBlockClientRect = document
							.getElementById( 'block-' + parentId )
							.getElementsByClassName( 'wp-block-coblocks-row__inner' )[ 0 ]
							.getBoundingClientRect();
						const currentBlockWidth = this.state.selectedWidth + delta.width;
						const currentBlockWidthPercent =
							( currentBlockWidth / parentBlockClientRect.width ) * 100;
						const diff = parseFloat( width ) - currentBlockWidthPercent;
						const nextBlockWidth =
							parseFloat( nextBlockClient.attributes.width ) + diff;

						document
							.getElementById( 'block-' + parentId )
							.classList.add( 'is-resizing' );
						document
							.getElementById( 'block-' + this.props.clientId )
							.getElementsByClassName(
								'wp-block-coblocks-column'
							)[ 0 ].style.width = 'auto';

						if ( nextBlockWidth > 10 && currentBlockWidthPercent > 10 ) {
							wp.data
								.dispatch( 'core/block-editor' )
								.updateBlockAttributes( nextBlockClientId, {
									width: parseFloat( nextBlockWidth ).toFixed( 2 ),
								} );
							setAttributes( {
								width: parseFloat( currentBlockWidthPercent ).toFixed( 2 ),
							} );
						}
					} }
					onResizeStart={ () => {
						const currentBlock = document.getElementById(
							'block-' + this.props.clientId
						);
						const currentBlockClientRect = currentBlock.getBoundingClientRect();

						//Add resizing class
						currentBlock.classList.add( 'is-resizing' );
						document
							.getElementById( 'block-' + parentId )
							.classList.add( 'is-resizing' );

						this.setState( { selectedWidth: currentBlockClientRect.width } );
						this.setState( { resizing: true } );
					} }
				>
					<div
						className={ classes }
						style={ { color: textColor.color, textAlign: contentAlign } }
					>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<div className={ innerClasses } style={ innerStyles }>
							<InnerBlocks templateLock={ false } renderAppender={ () => null } />
							{ showInserter ? (
								<Inserter rootClientId={ clientId } isAppender />
							) : null }
						</div>
					</div>
				</ResizableBox>
			</Fragment>
		);
	}
}

export default compose( [ applyWithColors ] )( Edit );
