/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;

const save = ( { attributes } ) => {
	const {
		url,
		alt,
		align,
		width,
		height,
		caption,
	} = attributes;

	const classes = classnames( {
		[ `align${ align }` ]: align,
		'is-resized': width || height,
	} );

	const image = (
		<img
			src={ url }
			alt={ alt }
			width={ width }
			height={ height }
		/>
	);

	const figure = (
		<Fragment>
			{ image }
			{ ! RichText.isEmpty( caption ) && <RichText.Content tagName="figcaption" value={ caption } /> }
		</Fragment>
	);

	if ( 'left' === align || 'right' === align || 'center' === align ) {
		return (
			<div className={ 'wp-block-image' }>
				<figure className={ classes }>
					{ figure }
				</figure>
			</div>
		);
	}

	return (
		<figure className={ classes }>
			{ figure }
		</figure>
	);
};

export default save;
