/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import captionOptions from '../../components/block-gallery/options/caption-options';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );

		this.getColors = this.getColors.bind( this );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
	}

	getColors() {
		const {
			attributes,
			captionColor,
			setCaptionColor,
		} = this.props;

		const {
			captions,
		} = attributes;

		return captions ? [ {
			label: __( 'Caption Color' ),
			value: captionColor.color,
			onChange: setCaptionColor,
		} ] : [];
	}

	render() {
		const {
			attributes,
			setAttributes,
			enableGutter,
		} = this.props;

		const {
			captions,
			captionStyle,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Collage Settings' ) }>
					{ enableGutter && <ResponsiveTabsControl label={ __( 'Gutter' ) } { ...this.props } /> }
					<ToggleControl
						label={ __( 'Captions' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( { captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/>
					{ captions && <SelectControl
						label={ __( 'Caption Style' ) }
						value={ captionStyle }
						onChange={ this.setCaptionStyleTo }
						options={ captionOptions }
					/> }
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					colorSettings={ this.getColors() }
					initialOpen
				/>
			</InspectorControls>
		);
	}
}

export default Inspector;
