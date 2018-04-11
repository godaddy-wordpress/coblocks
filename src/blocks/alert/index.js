import Inspector from './components/inspector';
import Controls from './components/controls';
import Alert from './components/alert';

import './styles/style.scss';
import './styles/editor.scss';

const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
} = wp.blocks;

const {
	Button,
	SelectControl,
	withFallbackStyles,
} = wp.components;

class AlertBlock extends Component {

	render() {

		const { attributes: { title, value, textAlign, backgroundColor, borderColor, textColor, titleColor, align }, isSelected, className, setAttributes } = this.props;

		return [
			isSelected && (
				<Controls
					{ ...this.props }
				/>
			),
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			<Alert { ...this.props }>
				{ ( ( title && title.length > 0 ) || isSelected ) && (
					<RichText
						tagName="p"
						placeholder={ __( 'Add optional title...' ) }
						value={ title }
						className={ `${ className }__title` }
						style={ {
							color: titleColor,
						} }
						onChange={ ( value ) => this.props.setAttributes( { title: value } ) }
					/>
				) }
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Write alert...' ) }
					value={ value }
					isSelected={ isSelected }
					keepPlaceholderOnFocus
					className={ `${ className }__text` }
					style={ { backgroundColor: backgroundColor, borderColor: borderColor  } }
					onChange={ ( value ) => this.props.setAttributes( { value: value } ) }
				/>
			</Alert>
		];
	}
}

registerBlockType( 'coblocks/alert', {

	title: __( 'Alert' ),

	description: __( 'Provide contextual feedback messages.' ),

	icon: 'admin-post',

	category: 'common',

	keywords: [
		__( 'notice' ),
		__( 'message' ),
		__( 'coblocks' ),
	],

	attributes: {
		title: {
			type: 'string',
			selector: '.wp-block-coblocks-alert__title',
		},
		value: {
			type: 'array',
			selector: '.wp-block-coblocks-alert__text',
			source: 'children',
		},
		backgroundColor: {
			type: 'string',
			default: '#e2e3e5'
		},
		borderColor: {
			type: 'string',
			default: '#d6d8db'
		},
		textColor: {
			type: 'string',
			default: '#383d41'
		},
		titleColor: {
			type: 'string',
			default: '#383d41'
		},
		align: {
			type: 'string',
			default: 'center',
		},
		textAlign: {
			type: 'string',
		},
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align ) {
			return { 'data-align': align };
		}
	},

	edit: AlertBlock,

	save: function( props ) {

		const { title, value, textAlign, backgroundColor, borderColor, textColor, titleColor, align } = props.attributes;

		return (
			<Alert { ...props }>
				{ title && title.length > 0 && (
					<div
						className={ 'wp-block-coblocks-alert__title' }
						style={ { color: titleColor } }
					>
						<p>{ title }</p>
					</div>
				) }
				{ value && (
					<div
						className={ 'wp-block-coblocks-alert__text' }
						style={ { backgroundColor: backgroundColor, borderColor: borderColor } }
					>
						{ value }
					</div>
				) }
			</Alert>
		);
	},
} );