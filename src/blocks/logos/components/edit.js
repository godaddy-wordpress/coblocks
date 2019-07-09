/**
 * External dependencies
 */
import classnames from 'classnames';
import { chunk } from 'lodash';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GalleryPlaceholder from '../../../components/block-gallery/gallery-placeholder';
import GalleryDropZone from '../../../components/block-gallery/gallery-dropzone';
import GalleryUploader from '../../../components/block-gallery/gallery-uploader';
import GalleryImage from '../../../components/block-gallery/gallery-image';
import Logos from './logos';
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

		var imageChunks = chunk( images, 4 );

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
					{ Object.keys( imageChunks ).map( keyOuter => {
						return (
							<Logos
								{ ...this.props }
								images={ imageChunks[ keyOuter ] }
							/>
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
