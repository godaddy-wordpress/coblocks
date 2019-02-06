/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import Section from './../section';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { PanelBody,CheckboxControl, Button, Tooltip } = wp.components;
const { PluginMoreMenuItem } = wp.editPost;
const { getCategories, getBlockTypes, unregisterBlockType, registerBlockType } = wp.blocks;

/**
 * Get settings.
 */

let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
});

/**
 * Render plugin
 */
class DisableBlocks extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state   = {
			settings: props.optionSettings,
			isSaving: false,
			isLoaded: false,
		}

		this.saveSettings = this.saveSettings.bind( this );

		settings.fetch().then( response => {
			
		});
	}

	saveSettings( settingsState ) {
		this.setState( { isSaving: true } );
		const model = new wp.api.models.Settings( { coblocks_settings_api: JSON.stringify( settingsState ) } );
		model.save().then( response => {
			this.setState({ isSaving: false, settings: settingsState });
		} );

	}

	render() {

		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		const onChecked = ( key, category ) => {
			let settingsState = this.state.settings;
			if( settingsState[ key ] ){
				settingsState[ key ] = !settingsState[ key ];
			}else{
				settingsState[ key ] = true;
			}

			//disable selected block
			if( settingsState[ key ] ){
				unregisterBlockType( key );
			}else{
				{ map( this.props.allBlocks[ category ]['blocks'], ( block ) => {
					if( block.name == key ){
						registerBlockType( key, block );
						return;
					}
				} ) }
				
			}

			this.setState({ settings: settingsState });

			this.saveSettings( settingsState );
			console.log( settingsState );
		}

		let savedSettings = this.state.settings;
		// console.log( this.props.allBlocks );
		return (
			<Fragment>
				{ map( this.props.allBlocks, ( category ) => {
					if( !category.slug.includes( 'reusable' ) ){
						return(
							<Section title={ category.title }>
							{ map( category.blocks, ( block ) => {
								if( !block.parent && !block.title.includes('deprecated') && !block.title.includes('Unrecognized') ){
									return (
										<li className="coblocks-disable-block-item-list--item">
											<Tooltip text={ savedSettings[ block.name ] ? __( 'Enable ' + block.title ) : __( 'Disable ' + block.title ) }>
												<Button
													isLarge
													className={
														classnames( 'coblocks-disable-block-item--button', {
															'block-disabled': savedSettings[ block.name ],
														} )
													}
													onClick={ ( value ) => {
														onChecked( block.name, category.slug );
													} }
												>
													<span className="coblocks-disable-block-item--icon">
														{ block.icon.src }
													</span>
													<span className="coblocks-disable-blocks-item--label">
														{ block.title }
													</span>
												</Button>
											</Tooltip>
										</li>
										// <CheckboxControl
										// 	className="edit-post-options-modal__option"
										// 	label={ block.title }
										// 	checked={ ( !savedSettings[ block.name ] ) ? true : false }
										// 	value={ block.name }
										// 	onChange={ ( checked ) => {
										// 		onChecked( block.name, category.slug , checked );
										// 	} }
										// />		
									);
								}
							} ) }		
							</Section>	
						)
					}
				} ) }
			</Fragment>
		);
	}
};

export default DisableBlocks;