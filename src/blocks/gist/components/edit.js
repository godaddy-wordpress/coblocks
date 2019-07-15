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

	updateURL( urlProps ) {
		console.log( 'the urlProps passed is :' );
		console.log( urlProps );
		this.props.setAttributes( { url: urlProps.url } );
		if ( ! this.props.attributes.url ) {
			this.props.setState( { preview: true } );
		}
		this.props.setAttributes( {
			url: urlProps.url,
			file: urlProps.file,
		} );

		this.setState( {
			urlText: urlProps.urlText,
			url: urlProps.url,
			file: urlProps.file,
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
						file={ file }
						url={ url }
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
