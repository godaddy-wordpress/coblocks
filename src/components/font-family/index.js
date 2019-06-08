/**
 * Internal dependencies
 */
import googleFonts from './fonts';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { withInstanceId } = wp.compose;
const { BaseControl } = wp.components;

function FontFamilyPicker( { label, value, help, instanceId, onChange, className, ...props } ) {
	const id = `inspector-coblocks-font-family-${ instanceId }`;
	const fonts = [
		{ value: '', label: __( 'Default' ) },
		{ value: 'Arial', label: 'Arial' },
		{ value: 'Helvetica', label: 'Helvetica' },
		{ value: 'Times New Roman', label: 'Times New Roman' },
		{ value: 'Georgia', label: 'Georgia' },
	];

	//Add Google Fonts
	Object.keys( googleFonts ).map( ( k ) => {
		fonts.push(
			{ value: k, label: k }
		);
	} );

	const onChangeValue = ( event ) => {
		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		let ba = '';
		const googleFontsAttr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
		const link = document.createElement( 'link' );
		link.rel = 'stylesheet';

		if ( typeof meta !== 'undefined' && typeof meta._coblocks_attr !== 'undefined' ) {
			ba = meta._coblocks_attr;
		}

		if ( ba.length > 0 ) {
			//Load fonts on the header
			if ( ! ba.includes( event.target.value ) ) {
				link.href = 'https://fonts.googleapis.com/css?family=' + event.target.value.replace( / /g, '+' ) + googleFontsAttr;
				document.head.appendChild( link );
			}

			ba = ba.replace( ',' + event.target.value, '' );
			ba = ba + ',' + event.target.value;
		} else {
			link.href = 'https://fonts.googleapis.com/css?family=' + event.target.value.replace( / /g, '+' ) + googleFontsAttr;
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
		<BaseControl label={ label } id={ id } help={ help } className={ className }>
			<select
				id={ id }
				className="components-select-control__input components-select-control__input--coblocks-fontfamily"
				onChange={ onChangeValue }
				aria-describedby={ !! help ? `${ id }__help` : undefined }
				{ ...props }
			>
				{ fonts.map( ( option, index ) =>
					<option
						key={ `${ option.label }-${ option.value }-${ index }` }
						value={ option.value }
						selected={ value === option.value ? 'selected' : '' }
					>
						{ option.label }
					</option>
				) }
			</select>
		</BaseControl>
	);
}

export default withInstanceId( FontFamilyPicker );
