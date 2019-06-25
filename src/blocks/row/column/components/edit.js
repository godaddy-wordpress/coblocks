/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import applyWithColors from './colors';
import { title, icon } from '../'
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, InnerBlocks, withFontSizes, Inserter } = wp.blockEditor;
const { ResizableBox, Spinner, IconButton } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			selectedWidth: 0,
			nextWidth: 0,
			selectedBlockWidth: 0,
			nextBlockWidth: 0,
			maxWidth: 999999999,
			resizing: false,
		}
	}

	render() {

		const {
			clientId,
			attributes,
			className,
			isSelected,
			toggleSelection,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props

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
			focalPoint,
			hasParallax,
			showInserter,
			backgroundType,
		} = attributes;

		const parentId = wp.data.select( 'core/editor' ).getBlockRootClientId( clientId );
		const columnBlocks = wp.data.select( 'core/editor' ).getBlock( clientId );
		const parentBlocks = wp.data.select( 'core/editor' ).getBlocksByClientId( parentId );
		const nextBlockClientId = wp.data.select( 'core/editor' ).getNextBlockClientId( clientId );
		const nextBlockClient = wp.data.select( 'core/editor' ).getBlock( nextBlockClientId );
		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ sprintf( __( 'Add backround to %s' ), title.toLowerCase() ) } // translators: %s: Lowercase block title
			/>
		);

		const classes = classnames(
			'wp-block-coblocks-column', {
				[ `coblocks-column-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
				'wp-block-coblocks-column-placeholder' : columnBlocks && columnBlocks.innerBlocks && Object.keys( columnBlocks.innerBlocks ).length < 1,
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-column__inner',
			...BackgroundClasses( attributes ),{
				'has-text-color': textColor.color,
				'has-padding': paddingSize && paddingSize != 'no',
				'has-margin': marginSize && marginSize != 'no',
				[ `has-${ paddingSize }-padding` ] : paddingSize && paddingSize != 'advanced',
				[ `has-${ marginSize }-margin` ] : marginSize && marginSize != 'advanced',
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
			marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
			marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
			marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
			marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
		};

		if ( parseInt( width ) == 100 ) {
			return [
				<Fragment>
					{ dropZone }
					{ isSelected && (
						<Controls
							{ ...this.props }
						/>
					) }
					{ isSelected && (
						<Inspector
							{ ...this.props }
						/>
					) }
					<div
						className={ classes }
						style={ {
							backgroundColor: backgroundColor.color,
							backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
							color: textColor.color,
							textAlign: contentAlign,
						} }
						>
						<div className="wp-block-coblocks-column">
							<div className={ innerClasses } style={ innerStyles }>
								{ BackgroundVideo( attributes ) }
								<InnerBlocks
									templateLock={ false }
								/>
								{ showInserter ? <Inserter rootClientId={ clientId } isAppender /> : null }
							</div>
						</div>
					</div>
				</Fragment>
			];
		}

		return [
			<Fragment>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<span className={ classnames( 'coblocks-resizeable-width', { 'is-resizing' : this.state.resizing } ) }>
					{ ( isSelected && this.state.selectedBlockWidth > 0 ) ? parseFloat( this.state.selectedBlockWidth ).toFixed(1) : parseFloat( width ).toFixed(1) }%
				</span>
				<ResizableBox
					className={ classnames(
						className, {
							'is-selected-column': isSelected,
							'is-resizing' : this.state.resizing,
						}
					) }
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
					onResizeStop={ ( event, direction, elt, delta ) => {
						let currentBlock = document.getElementById( 'block-' + this.props.clientId );

						//Remove resizing class
						currentBlock.classList.remove( 'is-resizing' );
						document.getElementById( 'block-' + parentId ).classList.remove( 'is-resizing' );

						toggleSelection( true );
						this.setState( { resizing: false } );
					} }
					onResize={ ( event, direction, elt, delta ) => {

						let parentBlockClientRect 	= document.getElementById( 'block-' + parentId ).getElementsByClassName( 'wp-block-coblocks-row__inner' )[0].getBoundingClientRect();
						let currentBlockWidth 		= this.state.selectedWidth + ( delta.width );
						let currentBlockWidthPercent = ( currentBlockWidth /parentBlockClientRect.width ) * 100;
						let diff =  parseFloat( width ) - currentBlockWidthPercent;
						let nextBlockWidth = parseFloat( nextBlockClient.attributes.width ) + diff;

						document.getElementById( 'block-' + parentId ).classList.add( 'is-resizing' );
						document.getElementById( 'block-' + this.props.clientId ).getElementsByClassName( 'wp-block-coblocks-column' )[0].style.width = 'auto';

						if( nextBlockWidth > 10 && currentBlockWidthPercent > 10 ){
							wp.data.dispatch( 'core/editor' ).updateBlockAttributes( nextBlockClientId, { width : parseFloat( nextBlockWidth ).toFixed(2) } );
							setAttributes( {  width: parseFloat( currentBlockWidthPercent ).toFixed(2) } );
						}

					} }
					onResizeStart={ ( event, direction, elt, delta ) => {
						let currentBlock 	= document.getElementById( 'block-' + this.props.clientId );
						let currentBlockClientRect 	= currentBlock.getBoundingClientRect();

						//Add resizing class
						currentBlock.classList.add( 'is-resizing' );
						document.getElementById( 'block-' + parentId ).classList.add( 'is-resizing' );

						this.setState({ 'selectedWidth' : currentBlockClientRect.width });
						this.setState( { resizing: true } );
						toggleSelection( false );
					} }
				>
					<div
						className={ classes }
						style={ { color: textColor.color, textAlign: contentAlign } }
						>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<div className={ innerClasses } style={ innerStyles }>
							<InnerBlocks templateLock={ false } renderAppender={ () => ( null ) }/>
							{ showInserter ? <Inserter rootClientId={ clientId } isAppender /> : null }
						</div>
					</div>
				</ResizableBox>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );
