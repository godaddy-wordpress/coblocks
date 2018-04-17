/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import Alert from './components/alert';
import AlertBlock from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
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