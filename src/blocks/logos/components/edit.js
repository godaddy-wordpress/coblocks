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
const { withNotices } = wp.components;

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

	componentDidUpdate( prevProps ) {
		var newImages = this.props.attributes.images;
		if ( prevProps.attributes.images !== newImages ) {
			this.props.setAttributes( { images: newImages } );
		}
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
								images={ imageChunks[ keyOuter ] }
								{ ...this.props }
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
