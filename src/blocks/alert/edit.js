/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { RichText } from '@wordpress/block-editor';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		attributes,
		backgroundColor,
		className,
		isSelected,
		setAttributes,
		textColor,
	} = props;

	const {
		textAlign,
		title,
		value,
	} = attributes;

	const prevClassName = usePrevious( className );

	useEffect( () => {
		// Convert is-{type}-alert to is-style-{type}.
		// See: https://github.com/godaddy-wordpress/coblocks/pull/781
		if ( /is-\w+-alert/.test( className ) ) {
			let newClassName = className;

			newClassName = newClassName.replace( 'is-default-alert', 'is-style-info' );
			newClassName = newClassName.replace( /is-(\w+)-alert/, 'is-style-$1' );
			setAttributes( { className: newClassName } );
		}
	}, [] );

	useEffect( () => {
		// Reset color selections when a new style has been selected.
		// If the legacy alert class is detected, we want to retain the custom color selections.
		if ( !! prevClassName && ! /is-\w+-alert/.test( prevClassName ) && prevClassName !== className ) {
			setAttributes( { backgroundColor: undefined, customBackgroundColor: undefined, textColor: undefined, customTextColor: undefined } );
		}
	}, [ prevClassName, className ] );

	return (
		<>
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<div
				className={ classnames(
					className, {
						'has-background': backgroundColor.color,
						'has-text-color': textColor.color,
						[ `has-text-align-${ textAlign }` ]: textAlign,
						[ backgroundColor.class ]: backgroundColor.class,
						[ textColor.class ]: textColor.class,
					}
				) }
				style={ {
					backgroundColor: backgroundColor.color,
					color: textColor.color,
				} }
			>
				{ ( ! RichText.isEmpty( title ) || isSelected ) && (
					<RichText
						/* translators: placeholder text for input box */
						placeholder={ __( 'Write title…', 'coblocks' ) }
						value={ title }
						className="wp-block-coblocks-alert__title"
						onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
					/>
				) }
				<RichText
					/* translators: placeholder text for input box */
					placeholder={ __( 'Write text…', 'coblocks' ) }
					value={ value }
					className="wp-block-coblocks-alert__text"
					onChange={ ( newValue ) => setAttributes( { value: newValue } ) }
				/>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
