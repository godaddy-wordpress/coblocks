// Import CSS.
import './editor.scss';
import './style.scss';

// External Dependencies.
import classnames from 'classnames';
import ResizableBox from 're-resizable';

// Internal Dependencies.
const { __ } = wp.i18n;

const {
	PanelColor,
	RangeControl,
	SelectControl
} = wp.components;

const {
	registerBlockType,
	InspectorControls,
	ColorPalette
} = wp.blocks;

// Consts.
const styleOptions = [
	{ value: 'dots', label: __( 'Dots' ) },
	{ value: 'line', label: __( 'Line' ) },
	{ value: 'fullwidth', label: __( 'Fullwidth' ) },
];

// Set the default separator color based on the style selected.
export function defaultSeparatorColor( attributes ) {
	if ( attributes.color ) {
		return attributes.color;
	} else if ( 'line' === attributes.style || 'fullwidth' === attributes.style ) {
		return 'rgba(0, 0, 0, .15)';
	} else {
		return 'rgba(0, 0, 0, .8)';
	}
}

registerBlockType( 'coblocks/dynamic-separator', {
	title: __( 'Separator (Dynamic)' ),
	description: __( 'Add a separator with custom spacing between other blocks.' ),
	icon: 'minus',
	category: 'layout',
	keywords: [
		__( 'hr' ),
		__( 'spacer' ),
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
		style: {
			type: 'string',
			default: 'dots',
		},
		color: {
			type: 'string',
		},
	},

	edit( { className, attributes, setAttributes, isSelected, toggleSelection } ) {

		const { height, style, color } = attributes;

		const classes = classnames(
			className,
			'coblocks-spacer-control',
			style ? `hr-style--${ style }` : `hr-style----dots`,
		);

		const inspectorControls = isSelected && (
			<InspectorControls key="inspector">
				<RangeControl
					label={ __( 'Height' ) }
					value={ height || '' }
					onChange={ ( value ) => setAttributes( { height: value } ) }
					min={ 32 }
					max={ 800 }
				/>
				<SelectControl
					label={ __( 'Style' ) }
					value={ style }
					onChange={ ( value ) => setAttributes( { style: value } ) }
					options={ styleOptions }
				/>
				<PanelColor title={ __( 'Color' ) } colorValue={ color }>
					<ColorPalette
						value={ color }
						onChange={ ( value ) => setAttributes( { color: value } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);

		return [

			inspectorControls,
			<ResizableBox
				className={ classes }
				style={ { color: defaultSeparatorColor( attributes ) } }
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

		const { height, style, color } = attributes;

		const classes = classnames(
			className,
			style ? `hr-style--${ style }` : `hr-style----dots`,
		);

		return (
			<hr className={ classes } style={ { height: height ? height + 'px' : undefined, color: defaultSeparatorColor( attributes ) } }></hr>
		);
	},
} );
