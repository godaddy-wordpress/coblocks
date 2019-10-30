/**
 * Internal dependencies
 */
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
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
				label: _x( 'None', 'label for no gutter option', 'coblocks' ),
				shortName: _x( 'None', 'abbreviation for "Short" size', 'coblocks' ),
			},
			{
				value: 1,
				label: _x( 'Small', 'label for small gutter option', 'coblocks' ),
				shortName: _x( 'S', 'abbreviation for "Small" size', 'coblocks' ),
			},
			{
				value: 2,
				label: _x( 'Medium', 'label for medium gutter option', 'coblocks' ),
				shortName: _x( 'M', 'abbreviation for "Medium" size', 'coblocks' ),
			},
			{
				value: 3,
				label: _x( 'Large', 'label for large gutter option', 'coblocks' ),
				shortName: _x( 'L', 'abbreviation for "Large" size', 'coblocks' ),
			},
			{
				value: 4,
				label: _x( 'Extra Large', 'label for extra large gutter option', 'coblocks' ),
				shortName: _x( 'XL', 'abbreviation for "Extra Large" size', 'coblocks' ),
			},
		];

		const shadowOptions = [
			{
				value: 'none',
				label: _x( 'None', 'label for no shadow option', 'coblocks' ),
				shortName: _x( 'None', 'abbreviation for "Short" size', 'coblocks' ),
			},
			{
				value: 'sm',
				label: _x( 'Small', 'label for small shadow option', 'coblocks' ),
				shortName: _x( 'S', 'abbreviation for "Small" size', 'coblocks' ),
			},
			{
				value: 'md',
				label: _x( 'Medium', 'label for medium shadow option', 'coblocks' ),
				shortName: _x( 'M', 'abbreviation for "Medium" size', 'coblocks' ),
			},
			{
				value: 'lg',
				label: _x( 'Large', 'label for large shadow option', 'coblocks' ),
				shortName: _x( 'L', 'abbreviation for "Large" size', 'coblocks' ),
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
