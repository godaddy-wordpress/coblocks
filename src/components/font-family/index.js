/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import googleFonts from './fonts';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';

function FontFamilyPicker( { label, value, help, instanceId, onChange, className, ...props } ) {
	const id = `inspector-coblocks-font-family-${ instanceId }`;
	const systemFonts = [
		{ label: __( 'Default', 'coblocks' ), value: '' },
		{ label: 'Arial', value: 'Arial' },
		{ label: 'Helvetica', value: 'Helvetica' },
		{ label: 'Times New Roman', value: 'Times New Roman' },
		{ label: 'Georgia', value: 'Georgia' },
	];
	let fonts = [];

	// Add Google Fonts
	Object.keys( googleFonts ).forEach( ( k ) => {
		fonts.push(
			{ label: k, value: k }
		);
	} );

	systemFonts.reverse().forEach( ( font ) => {
		fonts.unshift( font );
	} );

	/**
	 * Filter the available list of Google fonts
	 *
	 * @type {Array}
	 */
	fonts = wp.hooks.applyFilters( 'coblocks.google_fonts', fonts );

	const onChangeValue = ( event ) => {
		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		let ba = '';
		const googleFontsAttr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
		const link = document.createElement( 'link' );
		const isSystemFont = systemFonts.filter( function( font ) {
			return font.label === event.target.value;
		} ).length > 0;

		link.rel = 'stylesheet';

		if ( typeof meta !== 'undefined' && typeof meta._coblocks_attr !== 'undefined' ) {
			ba = meta._coblocks_attr;
		}

		if ( ba.length > 0 ) {
			//Load fonts on the header
			if ( ! ba.includes( event.target.value ) && ! isSystemFont ) {
				link.href = 'https://fonts.googleapis.com/css?family=' + window.encodeURIComponent( event.target.value.replace( / /g, '+' ) ) + googleFontsAttr;
				document.head.appendChild( link );
			}

			ba = ba.replace( ',' + event.target.value, '' );
			ba = ba + ',' + event.target.value;
		} else {
			link.href = 'https://fonts.googleapis.com/css?family=' + window.encodeURIComponent( event.target.value.replace( / /g, '+' ) ) + googleFontsAttr;
			document.head.appendChild( link );

			ba = event.target.value;
		}

		//Save values to metadata
		wp.data.dispatch( 'core/editor' ).editPost( {
			meta: {
				_coblocks_attr: ba,
			},
		} );

		onChange( event.target.value );
	};

	return (
		<BaseControl className={ className } help={ help } id={ id } label={ label }>
			{ /* Disable reason: onChange needed to pass user selection onto logic.
				Tested with Keyboard events and working as expected */ }
			{ /* eslint-disable-next-line jsx-a11y/no-onchange */ }
			<select
				aria-describedby={ !! help ? `${ id }__help` : undefined }
				className="components-select-control__input components-select-control__input--coblocks-fontfamily"
				id={ id }
				onChange={ onChangeValue }
				value={ value }
				{ ...props }
			>
				{ fonts.map( ( option, index ) =>
					<option
						key={ `${ option.label }-${ option.value }-${ index }` }
						value={ option.value }
					>
						{ option.label }
					</option>
				) }
			</select>
		</BaseControl>
	);
}

export default withInstanceId( FontFamilyPicker );

FontFamilyPicker.propTypes = {
	className: PropTypes.string,
	help: PropTypes.any,
	id: PropTypes.number,
	instanceId: PropTypes.number,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};
