/**
 * Internal dependencies
 */
import SizeControl from '../../components/size-control';
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl, ButtonGroup, Button, BaseControl } = wp.components;

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
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
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
				label: _x( 'None', 'label for no gutter option' ),
				shortName: _x( 'None', 'abbreviation for "Short" size' ),
			},
			{
				value: 1,
				label: _x( 'Small', 'label for small gutter option' ),
				shortName: _x( 'S', 'abbreviation for "Small" size' ),
			},
			{
				value: 2,
				label: _x( 'Medium', 'label for medium gutter option' ),
				shortName: _x( 'M', 'abbreviation for "Medium" size' ),
			},
			{
				value: 3,
				label: _x( 'Large', 'label for large gutter option' ),
				shortName: _x( 'L', 'abbreviation for "Large" size' ),
			},
			{
				value: 4,
				label: _x( 'Extra Large', 'label for extra large gutter option' ),
				shortName: _x( 'XL', 'abbreviation for "Extra Large" size' ),
			},
		];

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Collage Settings' ) }>
					{ enableGutter &&
						<BaseControl label={ __( 'Gutter' ) }>
							<ButtonGroup aria-label={ __( 'Gutter' ) }>
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
					{ ! enableGutter && <SizeControl { ...this.props }
						onChange={ this.setShadowTo }
						value={ shadow }
						label={ __( 'Shadow' ) }
						reset={ false }
						className={ 'components-coblocks-size-control--shadow' }
					/>
					}
					{ enableCaptions && <ToggleControl
						label={ __( 'Captions' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( { captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/> }
					{ captions && <SelectControl
						label={ __( 'Caption Style' ) }
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
