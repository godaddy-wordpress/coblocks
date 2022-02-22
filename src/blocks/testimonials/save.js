/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import GutterWrapper from './../../components/gutter-control/gutter-wrapper';

export default function save( { attributes } ) {
	const {
		columns,
		styleName,
	} = attributes;

	const saveBlockProps = useBlockProps.save();

	// Remove classes related to colors as we don't want to apply them on the main block.
	const sanitizedClasses = ( receivedClasses ) => {
		const classesArray = receivedClasses.split( ' ' );
		return classesArray.filter( ( classe ) => ! classe.match( new RegExp( 'has-', 'g' ) ) || classe.match( new RegExp( 'font-size', 'g' ) ) );
	};

	const classes = classnames( sanitizedClasses( saveBlockProps.className ), {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
		[ `is-style-${ styleName }` ]: styleName,
	} );

	return (
		<GutterWrapper { ...attributes }>
			<div { ...saveBlockProps } className={ classes } data-columns={ attributes.columns }>
				<InnerBlocks.Content />
			</div>
		</GutterWrapper>
	);
}
