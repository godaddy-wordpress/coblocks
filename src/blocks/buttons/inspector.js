/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			clientId,
			attributes,
			setAttributes,
		} = this.props;

		const {
			items,
			isStackedOnMobile,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ _x( 'Buttons Settings', 'block settings', 'coblocks' ) }>
						<RangeControl
							label={ __( 'Buttons', 'coblocks' ) }
							value={ items }
							onChange={ ( nextCount ) => {
								setAttributes( {
									items: parseInt( nextCount ),
								} );

								wp.data.dispatch( 'core/block-editor' ).selectBlock( clientId );
							} }
							min={ 1 }
							max={ 4 }
						/>
						<ToggleControl
							label={ _x( 'Stack on mobile', 'visually stack buttons one on top of another', 'coblocks' ) }
							checked={ isStackedOnMobile }
							onChange={ () => setAttributes( {
								isStackedOnMobile: ! isStackedOnMobile,
							} ) }
							help={ !! isStackedOnMobile ? __( 'Stacking buttons on mobile.', 'coblocks' ) : __( 'Toggle to stack buttons on mobile.', 'coblocks' ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
