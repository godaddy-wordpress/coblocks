/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Button, Placeholder } = wp.components;
const { Fragment } = wp.element;
const { BlockIcon } = wp.blockEditor;

/**
 * Internal dependencies
 */
import Gist from './gist';

const GistPlaceholder = props => {
	console.log( props );
	console.log( arguments );
	const {
		icon,
		label,
		value,
		onSubmit,
		onChange,
		cannotEmbed,
		fallback,
		tryAgain,
		url,
		file,
	} = props;
	return (
		<Fragment>
			{ url ? <Gist url={ url } file={ file } /> : null }
			<Placeholder
				icon={ <BlockIcon icon={ icon } showColors /> }
				label={ label }
				className="wp-block-embed"
			>
				<form onSubmit={ onSubmit }>
					<input
						type="url"
						value={ value || '' }
						className="components-placeholder__input"
						aria-label={ label }
						placeholder={ __( 'Enter URL to embed here…' ) }
						onChange={ onChange }
					/>
					<Button isLarge type="submit">
						{ _x( 'Embed', 'button label' ) }
					</Button>
					{ cannotEmbed && (
						<p className="components-placeholder__error">
							{ __( 'Sorry, this content could not be embedded.' ) }
							<br />
							<Button isLarge onClick={ tryAgain }>
								{ _x( 'Try again', 'button label' ) }
							</Button>{ ' ' }
							<Button isLarge onClick={ fallback }>
								{ _x( 'Convert to link', 'button label' ) }
							</Button>
						</p>
					) }
				</form>
			</Placeholder>
		</Fragment>
	);
};

export default GistPlaceholder;
