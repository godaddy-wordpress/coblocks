/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import icons from './../../../utils/icons';
import Gist from './gist';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PlainText } = wp.editor;
const { withState } = wp.compose;

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
		this.updateURL = this.updateURL.bind( this );
	}

	componentDidMount() {
		if ( this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}
	}

	updateURL( newURL ) {

		this.props.setAttributes( { url: newURL } );

		if ( ! this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}

		// Check for #file in the entered URL. If it's there, let's use it properly.
		const file = (newURL).split('#file-').pop()

		if ( newURL.match(/#file-*/) != null ) {
			const newURLWithNoFile = newURL.replace( file , '' ).replace( '#file-' , '' );
			console.log( newURLWithNoFile );
			this.props.setAttributes( { url: newURLWithNoFile } );
			this.props.setAttributes( { file: file.replace( /-([^-]*)$/, '.'+'$1' ) } );
		}
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			preview,
			setAttributes,
			setState,
			toggleSelection,
		} = this.props;

		const {
			url,
			file,
			meta,
		} = attributes;

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				{ ( url && url.length > 0 && isSelected ) && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ preview ? (
					url && (
						<div
							className={ classnames(
								className,
								meta ? null : `${ className }--no-meta`,
							) }
						>
							<Gist
								url={ url }
								file={ file }
							/>
						</div>
					)
				) : (
					<div
						className={ classnames(
							className,
							'wp-block-shortcode',
						) }
					>
						<label>
							{ icons.github }
							{ __( 'Gist URL' ) }
						</label>
						<PlainText
							className="input-control"
							value={ url }
							placeholder={ __( 'Add GitHub Gist URL...' ) }
							onChange={ this.updateURL }
						/>
					</div>
				) }
			</Fragment>
		];
	}
};

export default compose( [
	withState( { preview: false } ),
] )( Edit );
