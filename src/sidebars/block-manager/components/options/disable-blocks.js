/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import MapInnerBlocks from './../map-innerblocks';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Button, ToggleControl } = wp.components;
const { unregisterBlockType, registerBlockType } = wp.blocks;
const { BlockIcon } = wp.blockEditor;

/**
 * Get settings.
 */

let settings;
wp.api.loadPromise.then( () => {
	settings = new wp.api.models.Settings();
} );

/**
 * Render plugin
 */
class DisableBlocks extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			settings: props.optionSettings,
			isSaving: false,
			isLoaded: false,
			hasError: false,
			targetX: null,
			targetY: null,
		};

		this.saveSettings = this.saveSettings.bind( this );
		this.disableBlock = this.disableBlock.bind( this );

		settings.fetch();
	}

	saveSettings( settingsState ) {
		this.setState( { isSaving: true } );
		const model = new wp.api.models.Settings( { coblocks_settings_api: JSON.stringify( settingsState ) } );
		model.save().then( () => {
			this.setState( { isSaving: false, settings: settingsState } );
		} );
	}

	disableBlock( key, category, clicked, all = false, toggle = false ) {
		const settingsState = this.state.settings;

		//get current blocks
		const currentBlocks = wp.data.select( 'core/editor' ).getBlocks();
		const blockNames = MapInnerBlocks( currentBlocks );

		//check block for editor match first
		//avoid error while editing
		let hasError = false;
		this.setState( { hasError: false } );

		if ( key === 'core/paragraph' ) {
			hasError = true;
			this.setState( { hasError: true } );
		}

		{ map( blockNames, ( blockName ) => {
			if ( blockName === key ) {
				hasError = true;
				this.setState( { hasError: true } );
			}
		} ); }

		//abort if block exists on current page
		if ( hasError ) {
			if ( clicked ) {
				const target = clicked.target.getBoundingClientRect();
				this.setState( { targetX: target.left, targetY: target.top } );
			}

			return;
		}

		if ( settingsState[ key ] ) {
			settingsState[ key ] = ! settingsState[ key ];
		} else {
			settingsState[ key ] = true;
		}

		//disable selected block
		if ( settingsState[ key ] ) {
			//return if toggled and already enabled
			if ( all && ! toggle ) {
				settingsState[ key ] = false;
			} else {
				unregisterBlockType( key );
			}
		} else {
			//return if toggled and already disabled
			if ( all && toggle ) {
				settingsState[ key ] = true;
			} else {
				{ map( this.props.allBlocks[ category ].blocks, ( block ) => {
					if ( block.name === key ) {
						registerBlockType( key, block );

						//change toggle off when block enabled
						if ( settingsState[ 'mainCategory-' + category ] ) {
							settingsState[ 'mainCategory-' + category ] = false;
						}
					}
				} ); }
			}
		}

		this.setState( { settings: settingsState } );
		this.saveSettings( settingsState );
	}

	render() {
		const onChecked = ( key, category, clicked ) => {
			//disable blocks
			this.disableBlock( key, category, clicked );
		};

		const onToggle = ( category, slug ) => {
			const settingsState = this.state.settings;
			const allBlocks = this.props.allBlocks;

			if ( settingsState[ category ] ) {
				settingsState[ category ] = ! settingsState[ category ];
			} else {
				settingsState[ category ] = true;
			}

			//disable blocks one by one
			if ( allBlocks[ slug ] && allBlocks[ slug ].blocks ) {
				{ map( allBlocks[ slug ].blocks, ( block ) => {
					if ( block.name ) {
						this.disableBlock( block.name, slug, false, true, settingsState[ category ] );
					}
				} ); }
			}

			this.setState( { settings: settingsState } );
			this.saveSettings( settingsState );
		};

		const savedSettings = this.state.settings;
		let allBlocks = this.props.allBlocks;

		if ( this.props.keyword && this.props.searchResults && this.props.keyword.length > 0 ) {
			allBlocks = this.props.searchResults;
		}

		return (
			<Fragment>
				{ this.state.hasError ?
					<div className="coblocks-block-manager__error">
						{ __( 'This block is added to the page and cannot currently be disabled' ) }
					</div> :
					null }
				{ Object.keys( allBlocks ).length > 0 ?
					map( allBlocks, ( category ) => {
						if ( category.slug && ! category.slug.includes( 'reusable' ) && category.blocks && Object.keys( category.blocks ).length > 0 ) {
							return (
								<section className="coblocks-block-manager__section">
									<div className="coblocks-block-manager__section-header">
										{ category.title ?
											<h2 className="coblocks-block-manager__section-title">{ category.title.replace( ' Blocks', '' ) }</h2> :
											null }

										{ ( ! this.props.keyword && category.title ) ?
											<ToggleControl
												label={ __( 'Disable all' ) }
												checked={ savedSettings[ 'mainCategory-' + category.slug ] ? true : false }
												onChange={ () => {
													onToggle( 'mainCategory-' + category.slug, category.slug );
												} }
											/> :
											null
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
															<span className="coblocks-block-manager__button-icon" style={
																{
																	color: block.icon.foreground ? block.icon.foreground : undefined,
																}
															}>
																<BlockIcon icon={ block.icon.src } showColors />
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
							);
						}
					} ) :
					<section className="coblocks-block-manager__section coblocks-block-manager__section--noresults ">
						<p className="editor-inserter__no-results">{
							/* translators: %s: search text  */
							sprintf( __( 'No "%s" blocks found.' ), this.props.keyword )
						}</p>
					</section>
				}
			</Fragment>
		);
	}
}

export default DisableBlocks;
