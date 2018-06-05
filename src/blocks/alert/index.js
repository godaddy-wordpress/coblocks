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
const { registerBlockType, createBlock } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/alert', {

	title: __( 'Alert' ),

	description: __( 'Provide contextual feedback messages.' ),

	icon: {
		src: icons.alert,
	},

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

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'coblocks/alert', { value: content } );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { value } ) => {
					// transforming an empty alert element
					if ( ! value || ! value.length ) {
						return createBlock( 'core/paragraph' );
					}
					// transforming an alert element with content
					return ( value || [] ).map( item => createBlock( 'core/paragraph', {
						content: value,
					} ) );
				},
			},
		],
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
					<div className={ 'wp-block-coblocks-alert__title' }>
						<p style={ { color: titleColor } }>{ title }</p>
					</div>
				) }
				{ value && (
					<p className={ 'wp-block-coblocks-alert__text' } style={ { color: textColor } }>{ value }</p>
				) }
			</Alert>
		);
	},
} );