/**
 * Internal dependencies
 */
import GalleryPlaceholder from '../../../components/block-gallery/gallery-placeholder';
import GalleryDropZone from '../../../components/block-gallery/gallery-dropzone';
import GalleryUploader from '../../../components/block-gallery/gallery-uploader';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { registerBlockType, getBlockType } = wp.blocks;
const { Button, PanelBody, TextControl, ExternalLink } = wp.components;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { applyFilters } = wp.hooks;

class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		if ( ! this.props.attributes.align ) {
			this.props.setAttributes( {
				align: 'wide',
			} );
		}
	}

	render() {
		const {
			noticeOperations,
			attributes,
		} = this.props;

		const {
			images,
			align,
		} = attributes;

		const hasImages = !! images.length;

		if ( ! hasImages ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					label={ __( 'Logos' ) }
					icon={ icons.logos }
				/>
			);
		}

		return (
			<Fragment>
				<h3>Test</h3>
				<GalleryDropZone
					{ ...this.props }
				/>
				<GalleryUploader { ...this.props } />
			</Fragment>
		);
	}
}

export default Edit;
