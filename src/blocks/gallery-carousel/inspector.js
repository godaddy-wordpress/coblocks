/**
 * Internal dependencies
 */
import { title } from './'
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';
import SliderPanel from '../../components/slider-panel';
import { BackgroundPanel } from '../../components/block-gallery/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.setSizeControl = this.setSizeControl.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setHeightTo = this.setHeightTo.bind( this );
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { gridSize: value } );
	}

	setHeightTo( value ) {
		this.props.setAttributes( { height: value } );
	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			align,
			gridSize,
			gutter,
			height,
			images,
			radius,
		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody
							title={
								// translators: %s: Block title
								sprintf( __( '%s Settings' ), title )
							}
						>
							<SizeControl { ...this.props }
								type={ 'grid' }
								label={ __( 'Size' ) }
								onChange={ this.setSizeControl }
								value={ gridSize }
								resetValue={ 'xlrg' }
							/>
							{ gridSize != null && ( align == 'wide' || align == 'full' ) &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
									max={ 20 }
								/>
							}
							{ gridSize != 'xlrg' && ! align &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
									max={ 20 }
								/>
							}
							<RangeControl
								label={ __( 'Height in pixels' ) }
								value={ height }
								onChange={ this.setHeightTo }
								min={ 200 }
								max={ 1000 }
								step={ 1 }
							/>
							{ gutter > 0 && <RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ radius }
								onChange={ this.setRadiusTo }
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/> }
						</PanelBody>
						<SliderPanel { ...this.props } />
						<BackgroundPanel { ...this.props }
							hasCaption={ true }
						/>
					</InspectorControls>
				</Fragment>
			)
		)
	}
};

export default Inspector;
