/**
 * Internal dependencies
 */
import linkOptions from './options/link-options';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { SelectControl, ToggleControl, PanelBody, TextControl } from '@wordpress/components';

class GalleryLinkSettings extends Component {
	constructor() {
		super( ...arguments );
		this.setNewTab = this.setNewTab.bind( this );
		this.setLinkRel = this.setLinkRel.bind( this );
		this.setLinkTo = this.setLinkTo.bind( this );
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setLinkRel( value ) {
		this.props.setAttributes( { rel: value } );
	}

	setNewTab( value ) {
		const { rel } = this.props.attributes;
		const target = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( target && ! rel ) {
			updatedRel = 'noreferrer noopener';
		} else if ( ! target && rel === 'noreferrer noopener' ) {
			updatedRel = undefined;
		}

		this.props.setAttributes( {
			target,
			rel: updatedRel,
		} );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			lightbox,
			linkTo,
			target,
			rel,
		} = attributes;

		return (
			<Fragment>
				{ ! lightbox &&
					<PanelBody
						title={ __( 'Link Settings', 'coblocks' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Link To', 'coblocks' ) }
							value={ linkTo }
							options={ linkOptions }
							onChange={ this.setLinkTo }
						/>
						{ linkTo !== 'none' &&
							<Fragment>
								<ToggleControl
									label={ __( 'Open in New Tab', 'coblocks' ) }
									onChange={ this.setNewTab }
									checked={ target === '_blank' }
								/>
								<TextControl
									/* translators: html attribute that specifies the relationship between two pages */
									label={ __( 'Link Rel', 'coblocks' ) }
									value={ rel }
									onChange={ ( value ) => setAttributes( { rel: value } ) }
								/>
							</Fragment>
						}
					</PanelBody>
				}
			</Fragment>
		);
	}
}

export default GalleryLinkSettings;
