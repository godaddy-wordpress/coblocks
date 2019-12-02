/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import icon from './icon';
import Gist from './gist';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, withState } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { PlainText, RichText, BlockIcon } from '@wordpress/block-editor';
import { withNotices } from '@wordpress/components';

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.updateURL = this.updateURL.bind( this );
		this.handleErrors = this.handleErrors.bind( this );
		this.clearErrors = this.clearErrors.bind( this );
	}

	componentDidMount() {
		if ( this.props.attributes.url ) {
			this.props.setState( { preview: true } );
		}
	}

	updateURL( newURL ) {
		this.props.setAttributes( { url: newURL, file: '' } );

		if ( 'undefined' === typeof newURL || ! newURL.trim() ) {
			this.props.setState( { preview: false } );
			return;
		}

		if ( ! this.props.attributes.url ) {
			this.props.setState( { preview: true } );
		}

		// Check for #file in the entered URL. If it's there, let's use it properly.
		const file = newURL.split( '#file-' ).pop();

		if ( newURL.match( /#file-*/ ) !== null ) {
			const newURLWithNoFile = newURL.replace( file, '' ).replace( '#file-', '' );

			this.props.setAttributes( { url: newURLWithNoFile } );
			this.props.setAttributes( { file: file.replace( /-([^-]*)$/, '.' + '$1' ) } );
		}
		this.clearErrors();
	}

	handleErrors() {
		const { noticeOperations, setState } = this.props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( 'Sorry, this URL is not a GitHub Gist.' );
		setState( { preview: false } );
	}

	clearErrors() {
		const { noticeOperations } = this.props;
		noticeOperations.removeAllNotices();
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			preview,
			setAttributes,
			noticeUI,
		} = this.props;

		const { url, file, meta, caption } = attributes;

		const { handleErrors } = this;

		return (
			<Fragment>
				{ url && url.length > 0 && isSelected && <Controls { ...this.props } /> }
				{ url && url.length > 0 && isSelected && <Inspector { ...this.props } /> }
				{ preview ? (
					url && (
						<div className={ classnames( className, meta ? null : 'no-meta' ) }>
							<Gist url={ url } file={ file } onError={ () => {
								handleErrors();
							} } />
							{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
								<RichText
									tagName="figcaption"
									placeholder={ __( 'Write caption…', 'coblocks' ) }
									value={ caption }
									onChange={ value => setAttributes( { caption: value } ) }
									keepPlaceholderOnFocus
									inlineToolbar
								/>
							) }
						</div>
					)
				) : (
					<Fragment>
						{ noticeUI }
						<div
							className={ classnames(
								className,
								'wp-block-shortcode' // Use the same styling as the core shortcode block.
							) }
						>

							<label>
								<BlockIcon icon={ icon } />
								{ __( 'Gist URL', 'coblocks' ) }
							</label>
							<PlainText
								className="input-control"
								value={ url }
								placeholder={ __( 'Add GitHub Gist URL…', 'coblocks' ) }
								onChange={ this.updateURL }
							/>
						</div>
					</Fragment>
				) }

			</Fragment>
		);
	}
}

export default compose( [ withState( { preview: false } ), withNotices ] )( Edit );
