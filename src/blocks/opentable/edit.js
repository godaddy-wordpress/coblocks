/**
 * External dependencies
 */
import { OpentableIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Controls from './controls';
import OpenTable from './opentable';
import InspectorControls from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
	Placeholder,
	Button,
	withNotices,
	Icon,
	TextControl,
} from '@wordpress/components';

const Edit = ( props ) => {
	// const onSelectImages = ( images ) => {
	// 	props.setAttributes( { images: images.map( ( image ) => pickRelevantMediaFiles( image ) ) } );
	// };

	// const onDropImages = ( images ) => {
	// 	const imagesNormalized = images.map( ( image ) => pickRelevantMediaFiles( image ) );
	// 	const currentImages = props.attributes.images || [];
	// 	props.setAttributes( { images: currentImages.concat( imagesNormalized )	} );
	// };

	// const { className, noticeOperations, attributes, noticeUI, isSelected } = props;

	// const [ restaurantID, setRestaurantID ] = useState();
	const [ ridField, setRidField ] = useState();

	const { className, isSelected, attributes } = props;

	useEffect( () => {
		setRidField( attributes.restaurantID );
	}, [] );

	const renderOpenTable = ( event ) => {
		if ( event ) {
			event.preventDefault();
		}

		// setAttributes( { restaurantID: restaurantID } );
	};

	// const hasRestaurantID = !! attributes.restaurantID.length;

	return (
		<>
			<Controls { ...props } />
			<InspectorControls
				attributes={ attributes }
				setAttributes={ props.setAttributes }
			/>
			<div className={ className }>

				{ ( ! attributes.restaurantID ) ? (
					<Placeholder
						icon={ <Icon icon={ icon } /> }
						label={ __( 'OpenTable', 'coblocks' ) }
						instructions={ __(
							'Enter your OpenTable Restaurant ID to show the reservations widget.',
							'coblocks'
						) }
					>

						<form onSubmit={ renderOpenTable }>
							<TextControl
								value={ ridField }
								className="components-placeholder__input"
								placeholder={ __(
									'Restaurant ID',
									'coblocks'
								) }
								onChange={ ( newRestaurantID ) => {
									setRidField( newRestaurantID );
								} }
							/>
							<Button
								isPrimary={ !! ridField }
								isSecondary={ ! ridField }
								type="submit"
								disabled={ ! ridField }
								onClick={ () => {
									props.setAttributes( { restaurantID: ridField } );
								} }
							>
								{ __( 'Embed', 'coblocks' ) }
							</Button>
						</form>
						<a target="_blank" rel="noopener noreferrer" href="https://guestcenter.opentable.com/login">{ __( 'Get your Restaurant ID here.', 'coblocks' ) }</a>
					</Placeholder>
				)
					: <>
						<div
							style={ { width: '100%', height: '100%', position: 'absolute' } }
						/>
						<OpenTable { ...props } />
					</>
				}
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
