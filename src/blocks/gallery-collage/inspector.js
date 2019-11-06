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
import { PanelBody, ToggleControl, SelectControl, ButtonGroup, Button, BaseControl } from '@wordpress/components';

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
		} = attributes;

		const gutterOptions = [
			{
				value: 0,
				label: /* translators: label for no gutter option.  */ __( 'None', 'coblocks' ),
				shortName: /* translators: abbreviation for "Short" size.  */ __( 'None', 'coblocks' ),
			},
			{
				value: 1,
				label: /* translators: label for small gutter option.  */ __( 'Small', 'coblocks' ),
				shortName: /* translators: abbreviation for "Small" size.  */ __( 'S', 'coblocks' ),
			},
			{
				value: 2,
				label: /* translators: label for medium gutter option.  */ __( 'Medium', 'coblocks' ),
				shortName: /* translators: abbreviation for "Medium" size.  */ __( 'M', 'coblocks' ),
			},
			{
				value: 3,
				label: /* translators: label for large gutter option.  */ __( 'Large', 'coblocks' ),
				shortName: /* translators: abbreviation for "Medium" size.  */ __( 'L', 'coblocks' ),
			},
			{
				value: 4,
				label: /* translators: label for extra large gutter option.  */ __( 'Extra Large', 'coblocks' ),
				shortName: /* translators: abbreviation for "Extra Large" size.  */ __( 'XL', 'coblocks' ),
			},
		];

		const shadowOptions = [
			{
				value: 'none',
				label: /* translators: label for no shadow option.  */ __( 'None', 'coblocks' ),
				shortName: /* translators: abbreviation for "Short" size.  */ __( 'None', 'coblocks' ),
			},
			{
				value: 'sm',
				label: /* translators: label for small shadow option.  */ __( 'Small', 'coblocks' ),
				shortName: /* translators: abbreviation for "Small" size.  */ __( 'S', 'coblocks' ),
			},
			{
				value: 'md',
				label: /* translators: label for medium shadow option.  */ __( 'Medium', 'coblocks' ),
				shortName: /* translators: abbreviation for "Medium" size.  */ __( 'M', 'coblocks' ),
			},
			{
				value: 'lg',
				label: /* translators: label for large shadow option.  */ __( 'Large', 'coblocks' ),
				shortName: /* translators: abbreviation for "Large" size.  */ __( 'L', 'coblocks' ),
			},
		];

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Collage Settings', 'coblocks' ) }>
					{ enableGutter &&
						<BaseControl label={ __( 'Gutter', 'coblocks' ) }>
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
						</BaseControl>
					}
					{ ! enableGutter &&
						<BaseControl label={ __( 'Shadow', 'coblocks' ) }>
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
				</PanelBody>
				<GalleryLinkSettings { ...this.props } />
			</InspectorControls>
		);
	}
}

export default Inspector;
