/**
 * Internal dependencies
 */
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, SelectControl, ButtonGroup, Button, BaseControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
		this.setShadowTo = this.setShadowTo.bind( this );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.', 'coblocks' ) : __( 'Toggle to show media captions.', 'coblocks' );
	}

	setShadowTo( value ) {
		this.props.setAttributes( { shadow: value } );
	}

	getLightboxHelp( checked ) {
		return checked ? __( 'Image lightbox is enabled.', 'coblocks' ) : __( 'Toggle to enable the image lightbox.', 'coblocks' );
	}

	render() {
		const {
			attributes,
			setAttributes,
			enableGutter,
			enableCaptions,
		} = this.props;

		const {
			gutter,
			shadow,
			captions,
			captionStyle,
			lightbox,
		} = attributes;

		const gutterOptions = [
			{
				value: 0,
				label: __( 'None', 'coblocks' ),
				shortName: __( 'None', 'coblocks' ),
			},
			{
				value: 1,
				label: __( 'Small', 'coblocks' ),
				/* translators: abbreviation for small size */
				shortName: __( 'S', 'coblocks' ),
			},
			{
				value: 2,
				label: __( 'Medium', 'coblocks' ),
				/* translators: abbreviation for medium size */
				shortName: __( 'M', 'coblocks' ),
			},
			{
				value: 3,
				label: __( 'Large', 'coblocks' ),
				/* translators: abbreviation for large size */
				shortName: __( 'L', 'coblocks' ),
			},
			{
				value: 4,
				label: __( 'Extra Large', 'coblocks' ),
				/* translators: abbreviation for extra large size */
				shortName: __( 'XL', 'coblocks' ),
			},
		];

		const shadowOptions = [
			{
				value: 'none',
				label: __( 'None', 'coblocks' ),
				shortName: __( 'None', 'coblocks' ),
			},
			{
				value: 'sm',
				label: __( 'Small', 'coblocks' ),
				/* translators: abbreviation for small size */
				shortName: __( 'S', 'coblocks' ),
			},
			{
				value: 'md',
				label: __( 'Medium', 'coblocks' ),
				/* translators: abbreviation for medium size */
				shortName: __( 'M', 'coblocks' ),
			},
			{
				value: 'lg',
				label: __( 'Large', 'coblocks' ),
				/* translators: abbreviation for large size */
				shortName: __( 'L', 'coblocks' ),
			},
		];

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Collage Settings', 'coblocks' ) }>
					{ enableGutter &&
						<BaseControl label={ __( 'Gutter', 'coblocks' ) }>
							<PanelRow>
								<ButtonGroup aria-label={ __( 'Gutter', 'coblocks' ) }>
									{ gutterOptions.map( ( option ) => {
										const isCurrent = gutter === option.value;
										return (
											<Button
												key={ `option-${ option.value }` }
												isLarge
												isPrimary={ isCurrent }
												aria-pressed={ isCurrent }
												onClick={ () => setAttributes( { gutter: option.value } ) }
											>
												{ option.shortName }
											</Button>
										);
									} ) }
								</ButtonGroup>
							</PanelRow>
						</BaseControl>
					}
					{ ! enableGutter &&
						<BaseControl label={ __( 'Shadow', 'coblocks' ) }>
							<PanelRow>
								<ButtonGroup aria-label={ __( 'Shadow', 'coblocks' ) }>
									{ shadowOptions.map( ( option ) => {
										const isCurrent = shadow === option.value;
										return (
											<Button
												key={ `option-${ option.value }` }
												isLarge
												isPrimary={ isCurrent }
												aria-pressed={ isCurrent }
												onClick={ () => setAttributes( { shadow: option.value } ) }
											>
												{ option.shortName }
											</Button>
										);
									} ) }
								</ButtonGroup>
							</PanelRow>
						</BaseControl>
					}
					{ enableCaptions && <ToggleControl
						label={ __( 'Captions', 'coblocks' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( { captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/> }
					{ captions && <SelectControl
						label={ __( 'Caption Style', 'coblocks' ) }
						value={ captionStyle }
						onChange={ this.setCaptionStyleTo }
						options={ captionOptions }
					/> }
					<ToggleControl
						label={ __( 'Lightbox', 'coblocks' ) }
						checked={ !! lightbox }
						onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
						help={ this.getLightboxHelp }
					/>
				</PanelBody>
				<GalleryLinkSettings { ...this.props } />
			</InspectorControls>
		);
	}
}

export default Inspector;
