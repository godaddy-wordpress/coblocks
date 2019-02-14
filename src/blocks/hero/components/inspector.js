/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, } = wp.editor;
const { dispatch, select } = wp.data;
const { PanelBody, RangeControl, ToggleControl, SelectControl  } = wp.components;


/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			clientId,
			attributes,
			setAttributes,
		} = this.props;

		const {
			layout
		} = attributes;

		const layoutOptions = [
			// { value: 'top-left', label: __( 'Top Left' ) },
			// { value: 'top-center', label: __( 'Top Center' ) },
			// { value: 'top-right', label: __( 'Top Right' ) },
			{ value: 'center-left', label: __( 'Center Left' ) },
			{ value: 'center-center', label: __( 'Center Center' ) },
			{ value: 'center-right', label: __( 'Center Right' ) },
			// { value: 'bottom-left', label: __( 'Bottom Left' ) },
			// { value: 'bottom-center', label: __( 'Bottom Center' ) },
			// { value: 'bottom-right', label: __( 'Bottom Right' ) },
		];

		let layoutPadding = {};

		layoutPadding[ 'center-left' ] = {
			row: {
				paddingTop: 8, 
				paddingRight: 40, 
				paddingBottom: 8, 
				paddingLeft: 8,
			},
			column:{
				contentAlign: 'left',
				align: 'left',
			}
		};

		layoutPadding[ 'center-center' ] = {
			row: {
				paddingTop: 8, 
				paddingRight: 20, 
				paddingBottom: 8, 
				paddingLeft: 20,
			},
			column:{
				contentAlign: 'center',
				align: 'center',
			}
		};

		layoutPadding[ 'center-right' ] = {
			row: {
				paddingTop: 8, 
				paddingRight: 8, 
				paddingBottom: 8, 
				paddingLeft: 40,
			},
			column:{
				contentAlign: 'right',
				align: 'right',
			}
		};

		let getBlockContents = select( 'core/editor' ).getBlock( clientId );
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Hero Settings' ) } className='components-coblocks-block-sidebar--buttons'>
						<SelectControl
							label={ __( 'Layout' ) }
							value={ layout }
							options={ layoutOptions }
							help={ __( 'Hero section layout.' ) }
							onChange={ ( value ) => {
								setAttributes( { layout: value } );

								dispatch( 'core/editor' ).updateBlockAttributes( getBlockContents.innerBlocks[0].clientId, layoutPadding[ value ].row );

								//content alignment changes
								if( getBlockContents.innerBlocks[0].innerBlocks[0].innerBlocks ){
									map( getBlockContents.innerBlocks[0].innerBlocks[0].innerBlocks, ( innerBlock ) => {
										if( innerBlock.clientId ){
											dispatch( 'core/editor' ).updateBlockAttributes( innerBlock.clientId, layoutPadding[ value ].column );
										}
									} );
								}
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
