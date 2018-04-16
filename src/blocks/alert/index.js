import Inspector from './components/inspector';
import Controls from './components/controls';
import Alert from './components/alert';
import icons from './components/icons';

import './styles/style.scss';
import './styles/editor.scss';

const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	registerBlockType,
	RichText,
} = wp.blocks;

class AlertBlock extends Component {

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			align,
			backgroundColor,
			borderColor,
			textAlign,
			textColor,
			title,
			titleColor,
			value,
		} = attributes;

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
						isSelected={ isSelected }
						className={ `${ className }__title` }
						style={ {
							color: titleColor,
						} }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						keepPlaceholderOnFocus
					/>
				) }
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Write alert...' ) }
					value={ value }
					isSelected={ isSelected }
					className={ `${ className }__text` }
					style={ {
						backgroundColor: backgroundColor,
						borderColor: borderColor,
					} }
					onChange={ ( value ) => setAttributes( { value: value } ) }
					keepPlaceholderOnFocus
				/>
			</Alert>
		];
	}
}

registerBlockType( 'coblocks/alert', {

	title: __( 'Alert' ),

	description: __( 'Provide contextual feedback messages.' ),

	icon: icons.alert,

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

		const {
			align,
			backgroundColor,
			borderColor,
			textAlign,
			textColor,
			title,
			titleColor,
			value,
		} = props.attributes;

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