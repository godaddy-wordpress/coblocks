# Typography Controls Hooks

## Add Additional Google Fonts

The following `PHP` filter can be used to add Google fonts to the list of available fonts with Typography Controls.  


```php
/**
 * Make additional custom Google fonts available
 *
 * @param {Array} fonts Available Google fonts.
 *
 * @return {Array} Filtered Google fonts array.
 */
function filterCoBlocksGoogleFonts( fonts ) {

	let customFonts = [
		'Trade Winds',
		'Odibee Sans',
		'Yeon Sung',
		'Anton',
	];

	for ( let i = 0; i < customFonts.length; i++ ) {
		fonts.push(
			{ value: customFonts[ i ], label: customFonts[ i ] }
		);
	}

	return fonts;

}
wp.hooks.addFilter( 'coblocks.google_fonts', 'coblocks/coblocks.google_fonts', filterCoBlocksGoogleFonts );
```

## Disable Typography Controls
**Post Limits (Only shows on post ID 1)**
```php
add_filter( 'coblocks_disable_typography_controls', function( $bool, $post_id ) {

  return ( 1 === $post_id );

}, 10, 2 );
```

**User Role (Only shows to administrators)**
```php
add_filter( 'coblocks_disable_typography_controls', function( $bool, $post_id ) {

  $current_user = wp_get_current_user();

  return in_array( 'administrator', $current_user->roles, true );

}, 10, 2 );
```