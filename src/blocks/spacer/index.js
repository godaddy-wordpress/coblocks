import './styles/editor.scss';
import './styles/style.scss';

import classnames from 'classnames';
import ResizableBox from 're-resizable';

const { __ } = wp.i18n;

const { RangeControl } = wp.components;

const {
	registerBlockType,
	InspectorControls
} = wp.blocks;

const icon = [
	<svg aria-hidden role="img" focusable="false" className="dashicon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
		<path d="M0,3 L20,3 L20,17 L0,17 L0,3 Z M2,5.03271484 L2,15.0327148 L18.001709,15.0327148 L18.001709,5.03271484 L2,5.03271484 Z"></path>
	</svg>
]

registerBlockType( 'coblocks/spacer', {

	title: __( 'Spacer' ),

	description: __( 'Add space between other blocks.' ),

	icon: icon,

	category: 'layout',

	keywords: [
		__( 'hr' ),
		__( 'separator' ),
		__( 'coblocks' ),
	],

	supports: {
		html: false,
	},

	attributes: {
		height: {
			type: 'number',
			default: 50,
		},
	},

	edit( { className, attributes, setAttributes, isSelected, toggleSelection } ) {

		const { height } = attributes;

		const inspectorControls = isSelected && (
			<InspectorControls key="inspector">
				<RangeControl
					label={ __( 'Height' ) }
					value={ height || '' }
					onChange={ ( value ) => setAttributes( { height: value } ) }
					min={ 30 }
					max={ 800 }
				/>
			</InspectorControls>
		);

		return [
			inspectorControls,
			<ResizableBox
				className={ classnames( className, 'coblocks-spacer-control' ) }
				size={ {
					width: '100%',
					height: height,
				} }
				minWidth= { '100%' }
				maxWidth= { '100%' }
				minHeight= { '100%' }
				handleClasses={ {
					bottomLeft: 'coblocks-block-spacer-control__resize-handle',
				} }
				enable={ { top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false } }
				onResizeStart={ () => {
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes( {
						height: parseInt( height + delta.height, 10 ),
					} );
					toggleSelection( true );
				} }
			>
			</ResizableBox>
		];
	},

	save( { attributes, className } ) {

		const { height } = attributes;

		return (
			<hr className={ className } style={ { height: height ? height + 'px' : undefined } }></hr>
		);
	},
} );
