/**
 * External dependencies
 */
import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { default as currentBlock } from './block.json';

const deprecated = [
	{
		attributes: {
			...currentBlock.attributes,
		},

		save( { attributes } ) {
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
					alt={ alt }
					height={ height }
					src={ url }
					width={ width }
				/>
			);

			const figure = (
				<>
					{ image }
					{ ! RichText.isEmpty( caption ) && <RichText.Content tagName="figcaption" value={ caption } /> }
				</>
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
		},
	},
];

export default deprecated;
