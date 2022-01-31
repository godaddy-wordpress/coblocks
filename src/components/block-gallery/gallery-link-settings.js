/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import linkOptions from './options/link-options';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

class GalleryLinkSettings extends Component {
	constructor() {
		super( ...arguments );
		this.setNewTab = this.setNewTab.bind( this );
		this.setLinkRel = this.setLinkRel.bind( this );
		this.setLinkTo = this.setLinkTo.bind( this );
	}

	componentDidUpdate( prevProps ) {
		const { attributes, setAttributes } = this.props;
		const { lightbox } = attributes;

		if ( prevProps.attributes.linkTo !== 'none' && !! lightbox ) {
			setAttributes( { linkTo: 'none' } );
		}
	}

	setLinkTo( value ) {
		const { setAttributes } = this.props;
		setAttributes( { linkTo: value } );
	}

	setLinkRel( value ) {
		const { setAttributes } = this.props;
		setAttributes( { rel: value } );
	}

	setNewTab( value ) {
		const { attributes, setAttributes } = this.props;
		const { rel } = attributes;

		const target = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( target && ! rel ) {
			updatedRel = 'noreferrer noopener';
		} else if ( ! target && rel === 'noreferrer noopener' ) {
			updatedRel = undefined;
		}

		setAttributes( {
			rel: updatedRel,
			target,
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
						initialOpen={ false }
						title={ __( 'Link settings', 'coblocks' ) }
					>
						<SelectControl
							label={ __( 'Link to', 'coblocks' ) }
							onChange={ this.setLinkTo }
							options={ linkOptions }
							value={ linkTo }
						/>
						{ linkTo !== 'none' &&
							<Fragment>
								<ToggleControl
									checked={ target === '_blank' }
									label={ __( 'Open in new tab', 'coblocks' ) }
									onChange={ this.setNewTab }
								/>
								<TextControl
									/* translators: html attribute that specifies the relationship between two pages */
									label={ __( 'Link rel', 'coblocks' ) }
									onChange={ ( value ) => setAttributes( { rel: value } ) }
									value={ rel }
								/>
							</Fragment>
						}
					</PanelBody>
				}
			</Fragment>
		);
	}
}

GalleryLinkSettings.propTypes = {
	attributes: PropTypes.object,
	setAttributes: PropTypes.func,
};

export default GalleryLinkSettings;
