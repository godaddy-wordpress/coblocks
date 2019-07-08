/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GalleryPlaceholder from '../../../components/block-gallery/gallery-placeholder';
import GalleryDropZone from '../../../components/block-gallery/gallery-dropzone';
import GalleryUploader from '../../../components/block-gallery/gallery-uploader';
import GalleryImage from '../../../components/block-gallery/gallery-image';
import { GalleryClasses } from '../../../components/block-gallery/shared';
import { title, icon } from '../'

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { registerBlockType, getBlockType } = wp.blocks;
const { PanelBody, withNotices, ResizableBox } = wp.components;
const { InnerBlocks } = wp.blockEditor;
const { applyFilters } = wp.hooks;

class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {

		if ( ! this.props.attributes.align ) {
			this.props.setAttributes( {
				align: 'wide',
			} );
		}
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
			} );
		}
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onMove( oldIndex, newIndex ) {
		const images = [ ...this.props.attributes.images ];
		images.splice( newIndex, 1, this.props.attributes.images[ oldIndex ] );
		images.splice( oldIndex, 1, this.props.attributes.images[ newIndex ] );
		this.setState( { selectedImage: newIndex } );
		this.props.setAttributes( { images } );
	}

	onMoveForward( oldIndex ) {
		return () => {
			if ( oldIndex === this.props.attributes.images.length - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBackward( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			this.setState( { selectedImage: null } );
			this.props.setAttributes( {
				images,
			} );
		};
	}

	render() {
		const {
			className,
			noticeOperations,
			attributes,
			noticeUI,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			images,
			blackAndWhite,
			align,
			fullwidth,
			height,
			width,
		} = attributes;

		const hasImages = !! images.length;

		if ( ! hasImages ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					title={ title }
					icon={ icon }
				/>
			);
		}

		return (
			<Fragment>
				<Controls
					{...this.props}
				/>
				<GalleryDropZone
					{ ...this.props }
				/>
				{ noticeUI }
				<div className={ className }>
					{ images.map( ( img, index ) => {
						return (
							<ResizableBox
								key={ img.id || img.url }
								size={ { width, width } }
								className={ classnames(
									className, {
										'is-selected-column': isSelected,
										'is-resizing' : false,
									}
								) }
								maxWidth={ this.state.maxWidth }
								minHeight="20"
								enable={ {
									top: false,
									right: true,
									bottom: false,
									left: true,
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

									let parentBlockClientRect = document.getElementById( 'block-' + parentId ).getElementsByClassName( 'wp-block-coblocks-row__inner' )[0].getBoundingClientRect();
									let currentBlockWidth = this.state.selectedWidth + ( delta.width );
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
								<img src={ img.url } alt={ img.alt } />
							</ResizableBox>
						);
					} ) }
					<GalleryUploader { ...this.props } />
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withNotices,
] )( Edit );
