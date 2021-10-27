/**
 * Internal dependencies
 */
import DimensionsControl from './../../components/dimensions-control/';
import GutterControl from './../../components/gutter-control/gutter-control';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		clientId,
		setAttributes,
		selectBlock,
	} = props;

	const {
		columns,
		gutter,
		marginBottom,
		marginBottomMobile,
		marginBottomTablet,
		marginLeft,
		marginLeftMobile,
		marginLeftTablet,
		marginRight,
		marginRightMobile,
		marginRightTablet,
		marginSize,
		marginSyncUnits,
		marginSyncUnitsMobile,
		marginSyncUnitsTablet,
		marginTop,
		marginTopMobile,
		marginTopTablet,
		marginUnit,
		paddingBottom,
		paddingBottomMobile,
		paddingBottomTablet,
		paddingLeft,
		paddingLeftMobile,
		paddingLeftTablet,
		paddingRight,
		paddingRightMobile,
		paddingRightTablet,
		paddingSize,
		paddingSyncUnits,
		paddingSyncUnitsMobile,
		paddingSyncUnitsTablet,
		paddingTop,
		paddingTopMobile,
		paddingTopTablet,
		paddingUnit,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Features settings', 'coblocks' ) }>
				<RangeControl
					label={ __( 'Columns', 'coblocks' ) }
					value={ columns }
					onChange={ ( nextCount ) => {
						setAttributes( {
							columns: Math.min( parseInt( nextCount ) || 1, 4 ),
						} );

						if ( parseInt( nextCount ) < 2 ) {
							setAttributes( {
								gutter: 'no',
							} );
						} else if ( gutter === 'no' ) {
							setAttributes( {
								gutter: 'large',
							} );
						}

						selectBlock( clientId );
					} }
					min={ 1 }
					max={ 3 }
				/>
				{ columns >= 2 && <GutterControl { ...props } /> }
				<DimensionsControl { ...props }
					type={ 'padding' }
					label={ __( 'Padding', 'coblocks' ) }
					valueTop={ paddingTop }
					valueRight={ paddingRight }
					valueBottom={ paddingBottom }
					valueLeft={ paddingLeft }
					valueTopTablet={ paddingTopTablet }
					valueRightTablet={ paddingRightTablet }
					valueBottomTablet={ paddingBottomTablet }
					valueLeftTablet={ paddingLeftTablet }
					valueTopMobile={ paddingTopMobile }
					valueRightMobile={ paddingRightMobile }
					valueBottomMobile={ paddingBottomMobile }
					valueLeftMobile={ paddingLeftMobile }
					unit={ paddingUnit }
					syncUnits={ paddingSyncUnits }
					syncUnitsTablet={ paddingSyncUnitsTablet }
					syncUnitsMobile={ paddingSyncUnitsMobile }
					dimensionSize={ paddingSize }
				/>
				<DimensionsControl { ...props }
					type={ 'margin' }
					label={ __( 'Margin', 'coblocks' ) }
					valueTop={ marginTop }
					valueRight={ marginRight }
					valueBottom={ marginBottom }
					valueLeft={ marginLeft }
					valueTopTablet={ marginTopTablet }
					valueRightTablet={ marginRightTablet }
					valueBottomTablet={ marginBottomTablet }
					valueLeftTablet={ marginLeftTablet }
					valueTopMobile={ marginTopMobile }
					valueRightMobile={ marginRightMobile }
					valueBottomMobile={ marginBottomMobile }
					valueLeftMobile={ marginLeftMobile }
					unit={ marginUnit }
					syncUnits={ marginSyncUnits }
					syncUnitsTablet={ marginSyncUnitsTablet }
					syncUnitsMobile={ marginSyncUnitsMobile }
					dimensionSize={ marginSize }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
