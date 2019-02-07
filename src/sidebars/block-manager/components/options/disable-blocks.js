/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
// import Section from './../section';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { PanelBody,CheckboxControl, Button, Popover, ToggleControl } = wp.components;
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
			hasError: false,
			targetX : null,
			targetY : null,
		}

		this.saveSettings = this.saveSettings.bind( this );
		this.disableBlock = this.disableBlock.bind( this );

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

	disableBlock( key, category, clicked ){
		let settingsState = this.state.settings;

		//get current blocks
		let currentBlocks = wp.data.select( 'core/editor' ).getBlocks();

		//check block for editor match first
		//avoid error while editing
		let hasError = false;
		this.setState({ hasError: false });

		if( key == 'core/paragraph' ){
			hasError = true;
			this.setState({ hasError: true });
		}

		{ map( currentBlocks, ( editorBlock ) => {
			if( editorBlock.name == key ){
				hasError = true;
				this.setState({ hasError: true });
				return;
			}
		} ) }

		//abort if block exists on current page
		if( hasError ){

			let target = clicked.target.getBoundingClientRect();
			this.setState({ targetX: target.left, targetY: target.top });

			return;
		}

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
	}

	render() {

		const closeModal = () => (
			this.setState( { isOpen: false } )
		);

		const onChecked = ( key, category, clicked ) => {
			//disable blocks
			this.disableBlock( key, category, clicked );
		}

		const onToggle = ( category ) => {
			let settingsState = this.state.settings;

			if( settingsState[ category ] ){
				settingsState[ category ] = !settingsState[ category ];
			}else{
				settingsState[ category ] = true;
			}

			this.setState({ settings: settingsState });
			this.saveSettings( settingsState );
		}

		let savedSettings = this.state.settings;
		let allBlocks = this.props.allBlocks;

		if( this.props.keyword && this.props.searchResults && Object.keys(this.props.searchResults).length > 0 ){
			allBlocks = this.props.searchResults;
		}
		console.log( savedSettings );
		return (
			<Fragment>
				{ this.state.hasError ?
					<Popover style={ {
						top: this.state.targetY + 'px',
						left: ( this.state.targetX + 40 ) + 'px',
					} }
						className="coblocks-disable-block-warning"
					>
						{ __( 'Disabling failed! Block exists on the current page you are editing, please remove the block first then try again. ' ) }
					</Popover>
				: null }
				{ map( allBlocks, ( category ) => {
					if ( category.slug && ! category.slug.includes( 'reusable' ) ) {
						return(
							<section className="coblocks-block-manager__section">
								<div className="coblocks-block-manager__section-header">
									<h2 className="coblocks-block-manager__section-title">{ category.title }</h2>
									{ ( !this.props.keyword ) ?
										<ToggleControl
											label={ savedSettings[ 'mainCategory-' + category.slug ] ? sprintf( __( 'All %s blocks disabled' ), category.title ) : __( 'Disable all' ) }
											checked={ savedSettings[ 'mainCategory-' + category.slug ] ? true : false }
											onChange={ ( value ) => {
												onToggle( 'mainCategory-' + category.slug );
											} }
										/>
										: null
									}
								</div>
								<ul className="coblocks-block-manager__list">
									{ map( category.blocks, ( block ) => {
										if ( ! block.parent && block.title && ! block.title.includes( 'deprecated' ) && ! block.title.includes( 'Unrecognized' ) ) {
											return (
												<li className="coblocks-block-manager__list-item">
													<Button
														isLarge
														className={
															classnames( 'coblocks-block-manager__button', {
																'block-disabled': savedSettings[ block.name ],
															} )
														}
														onClick={ ( value ) => {
															onChecked( block.name, category.slug, value );
														} }
													>
														<span className="coblocks-block-manager__button-icon">
															<span className="editor-block-icon has-colors">
																{ block.icon.src }
															</span>
														</span>
														<span className="coblocks-block-manager__button-label">
															{ block.title }
														</span>
													</Button>
												</li>
											);
										}
									} ) }
								</ul>
							</section>
						)
					}
				} ) }
			</Fragment>
		);
	}
};

export default DisableBlocks;