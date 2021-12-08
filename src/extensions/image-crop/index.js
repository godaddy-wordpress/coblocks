/* global coblocksBlockData */

/**
 * External dependencies
 */
import _, { assign } from 'lodash';

/**
 * Internal dependencies
 */
import CropControl from '../../components/crop-settings/crop-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

const supportedBlocks = [
	'core/cover',
];

const applyAttributes = ( settings ) => {
	if ( ! supportedBlocks.includes( settings.name ) ) {
		return settings;
	}

	settings.attributes = assign( settings.attributes, {
		cropHeight: {
			default: 100,
			type: 'number',
		},
		cropRotation: {
			default: 0,
			type: 'number',
		},
		cropWidth: {
			default: 100,
			type: 'number',
		},
		cropX: {
			default: 0,
			type: 'number',
		},
		cropY: {
			default: 0,
			type: 'number',
		},
	} );

	return settings;
};

const positioningControlData = {
	editing: false,
	loadingCount: 0,
	updateDebounce: _.debounce( function( callback ) {
		callback();
	}, 250 ),
};

const usePositioningControl = ( props ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! supportedBlocks.includes( props.name ) ) {
		return;
	}

	const {
		attributes,
		setAttributes,
	} = props;

	const { cropX, cropY, cropWidth, cropHeight, cropRotation } = attributes;
	let extendedAttributes = { ...attributes };

	// Only Gallery images supported at this time
	if ( ! extendedAttributes.id ) {
		return;
	}

	if ( extendedAttributes.backgroundType === 'video' ) {
		return;
	}

	const removeCropClass = ( classes ) => {
		if ( ! classes ) {
			classes = '';
		}

		classes = classes.replace( / ?is-cropping/g, '' );

		return classes;
	};

	const updateImage = () => {
		positioningControlData.editing = false;
		++positioningControlData.loadingCount;

		fetch( global.ajaxurl,
			{
				body: [
					`action=${ 'coblocks_crop_settings' }`,
					`nonce=${ coblocksBlockData.cropSettingsNonce }`,
					`id=${ extendedAttributes.id }`,
					`cropX=${ extendedAttributes.cropX }`,
					`cropY=${ extendedAttributes.cropY }`,
					`cropWidth=${ extendedAttributes.cropWidth }`,
					`cropHeight=${ extendedAttributes.cropHeight }`,
					`cropRotation=${ extendedAttributes.cropRotation }`,
				].join( '&' ),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				method: 'POST',
			} )
			.then( ( response ) => {
				return response.json();
			} )
			.then( ( response ) => {
				--positioningControlData.loadingCount;
				const data = response.data;

				if ( ! data ) {
					return;
				}

				if ( positioningControlData.loadingCount > 0 || positioningControlData.editing ) {
					return;
				}

				const removedCrop = removeCropClass( extendedAttributes.className );

				setAttributes( {
					className: removedCrop !== '' ? removedCrop : null,
					id: data.id,
					url: data.url,
				} );
			} );
	};

	const applyCropAttributes = function( changeAttributes ) {
		const attributeDifference = _.reduce( changeAttributes, function( result, value, key ) {
			return result || ! _.isEqual( value, extendedAttributes[ key ] );
		}, false );

		positioningControlData.editing = true;

		if ( attributeDifference ) {
			changeAttributes.className = removeCropClass( extendedAttributes.className ) + ' is-cropping';
		}

		setAttributes( changeAttributes );
		extendedAttributes = { ...extendedAttributes, ...changeAttributes };
		positioningControlData.updateDebounce( updateImage );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody initialOpen={ false } title={ __( 'Crop settings', 'coblocks' ) }>
					<CropControl
						attachmentId={ extendedAttributes.id }
						cropHeight={ cropHeight }
						cropWidth={ cropWidth }
						offsetX={ cropX }
						offsetY={ cropY }
						onChange={ ( val ) => applyCropAttributes( {
							cropHeight: val.h,
							cropRotation: val.r,
							cropWidth: val.w,
							cropX: val.x,
							cropY: val.y,
						} ) }
						rotation={ cropRotation }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export { usePositioningControl, applyAttributes };

