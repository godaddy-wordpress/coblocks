/**
 * External dependencies
 */
import classnames from 'classnames';
import escape from 'lodash/escape';

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
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { withNotices } = wp.components;
const { withState } = wp.compose;

/**
 * Block edit function
 */
class Edit extends Component {
	constructor( props ) {
		super( ...arguments );
		this.state = {
			urlText: '',
			url: this.props.attributes.url,
			file: this.props.attributes.file,
		};
		this.updateURL = this.updateURL.bind( this );
	}

	componentDidMount() {
		if ( this.props.attributes.url ) {
			this.props.setState( { preview: true } );
		}
	}

	updateURL( newURL ) {
		console.log( `the newUrl passed is : ${ newURL }` );
		this.props.setAttributes( { url: newURL } );
		if ( ! this.props.attributes.url ) {
			this.props.setState( { preview: true } );
		}

		// Check for #file in the entered URL. If it's there, let's use it properly.
		let file = newURL.split( '#file-' ).pop();

		if ( file ) {
			file = '#file-' + file;
		}

		if ( newURL.match( /#file-*/ ) !== null ) {
			const newURLWithNoFile = newURL.replace( file, '' ).replace( '#file-', '' );

			this.props.setAttributes( {
				url: newURLWithNoFile,
				file: file.replace( /-([^-]*)$/, '.' + '$1' ),
			} );
		}
		this.setState( {
			urlText: newURL,
			url: this.props.attributes.url,
			file: this.props.attributes.file,
		} );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			preview,
			setAttributes,
		} = this.props;

		const { meta, caption, file, url } = attributes;
		const { urlText } = this.state;
		console.log( this.props );
		const label = __( 'Gist URL' );

		return (
			<Fragment>
				{ url && url.length > 0 && isSelected && <Controls { ...this.props } /> }
				{ url && url.length > 0 && isSelected && <Inspector { ...this.props } /> }
				<div className={ classnames( className, meta ? null : 'no-meta' ) }>
					<Gist
						label={ label }
						icon={ icons.github }
						value={ urlText }
						updateURL={ this.updateURL }
						file={ this.props.attributes.file }
						url={ this.props.attributes.url }
						onChange={ event =>
							this.setState( { urlText: escape( event.target.value ) } )
						}
						editProps={ this.props }
						// fallback={ () => fallback( url, this.props.onReplace ) }
						// tryAgain={ tryAgain }
						// cannotEmbed={ cannotEmbed }
					/>
					{ preview ?
						url &&
						  ( ! RichText.isEmpty( caption ) || isSelected ) && (
						<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption…' ) }
								value={ caption }
								onChange={ value => setAttributes( { caption: value } ) }
								keepPlaceholderOnFocus
								inlineToolbar
							/>
						  ) :
						null }
				</div>
			</Fragment>
		);
	}
}

export default compose( [ withState( { preview: false } ), withNotices ] )( Edit );
