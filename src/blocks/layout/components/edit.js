/**
 * External dependencies
 */
import Masonry from 'react-masonry-component';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import './../styles/editor.scss';
import './api.js';
import icons from './../../../utils/icons';
import brandAssets from '../../../utils/brand-assets';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { SelectControl, Placeholder, Button, Dashicon, Spinner, Modal, withAPIData, TabPanel } = wp.components;
const { Fragment, Component } = wp.element;
const { createBlock } = wp.blocks;
const { registerStore, withSelect, } = wp.data;
const { addQueryArgs } = wp.url;

const masonryOptions = {
	transitionDuration: 0,
};

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.state = {
			isOpen: false,
			isRequesting: false,
			sectionCategory: '',
			sectionFiltered: false,
			sectionItems: '',
			templateFiltered: false,
			templateItems: '',
		}

		this.contentType  = 'sections';

		this.openModal = this.openModal.bind( this );
		this.closeModal = this.closeModal.bind( this );
		this.filterList = this.filterList.bind( this );
	}

	openModal( type ) {
		this.contentType = type;

		if ( ! this.state.isOpen ) {
			this.setState( { isOpen: true } );
		}
	}

	closeModal() {
		if ( this.state.isOpen ) {
			this.setState( { isOpen: false } );
		}
	}

	contentModal(){
		const sectionCategories = [
			{ value: '', label: __( 'Category' ) },
			{ value: 'about', label: __( 'About' ) },
			{ value: 'cta', label: __( 'Call to Action' ) },
			{ value: 'faq', label: __( 'FAQ' ) },
		];
		switch( this.contentType ) {
		    case 'templates':
		       	// do nothing for now
		    break;
		    case 'sections':
		       	if ( ! this.props.sections ) {
			        return;
			    }
			    if( typeof this.props.sections != "undefined" ){
			    	var sections = this.props.sections;
			    	var navtabs   = [{
						name: 'coblocks-sections',
						title: __( 'CoBlocks Library' ),
						className: 'edit-post-sidebar__panel-tab coblocks-sections',
					}];

					//check if theme templates available
					if( typeof this.props.theme_sections != "undefined" ){
						if( this.props.theme_sections !== null && Object.keys( this.props.theme_sections ).length > 0 ){
							if( this.props.theme_name ){
								navtabs.push({
									name: 'coblocks-theme',
									title: __( this.props.theme_name ),
									className: 'edit-post-sidebar__panel-tab coblocks-theme',
								});
							}
						}
					}

					if( typeof this.props.saved_sections != "undefined" && this.props.saved_sections.length > 0 ){
						navtabs.push({
							name: 'coblocks-saved',
							title: __( 'My Sections' ),
							className: 'edit-post-sidebar__panel-tab coblocks-saved',
						});
					}

					if( Object.keys( sections ).length > 0 ){
						return (
							<TabPanel
								className="coblocks-tab-panel"
								activeClass="is-active"
								tabs={ navtabs }>
								{
									( tab ) => {
										switch( tab.name ){
											case 'coblocks-sections':
												if( !this.state.sectionFiltered ){
													this.state.sectionItems = sections;
												}

												return[
													<div className="coblocks__modal-controls">
														<SelectControl
															value={ this.state.sectionCategory }
															options={ sectionCategories }
															onChange={ ( nextCategory ) => this.onCategoryChange( nextCategory, event ) }
															className="coblocks__modal-controls--category"
														/>
														<input type="text" class="coblocks__modal-controls--search" placeholder={ __( 'Search...' ) } onChange={ (evt) => this.filterList( evt, 'sections' ) } />
													</div>,
													<Masonry
														className={'coblocks-layouts__list'}
														elementType={'ul'}
														options={masonryOptions}
														disableImagesLoaded={false}
														updateOnEachImageLoad={false}
													>
														{ Object.entries( this.state.sectionItems ).map( post => this.renderListItem( post ) ) }
													</Masonry>,
												];
												break;

											case 'coblocks-theme':
												if( typeof this.props.theme_sections != "undefined" ){
													var theme_sections = this.props.theme_sections;
													if ( Object.keys( theme_sections ).length > 0 ) {
														return(
															<ul className='coblocks-layouts__list'>
																{ Object.entries( theme_sections ).map( template => this.renderListItem( template ) ) }
															</ul>
														);
													}
												}
												break;

											case 'coblocks-saved':
												if( typeof this.props.saved_sections != "undefined" ){
													var saved = this.props.saved_sections;
													if ( Object.keys( saved ).length > 0 ) {
														return(
															<ul className='coblocks-layouts__list'>
																{ Object.entries( saved ).map( template => this.renderTableItem( template ) ) }
															</ul>
														);
													}
												}
												break;
											default:
		    									break;
										}
									}
								}
							</TabPanel>
						);
					}
			    }
			break;
		    default:
		    	break;
		}
	}

	renderListItem( template ){
		var pro = false;

		if( typeof template[1].pro != "undefined" && template[1].pro ){
			pro = true;
		}

		return (
			<li key={ 'coblocks-' + template[0] } className={ pro ? 'coblocks-layouts__list-item--pro' : 'coblocks-layouts__list-item' }>
				<img className="coblocks-layouts__list-item-screenshot" src={ template[1].screenshot } />
				{ ( pro && typeof template[1].has_pro == "undefined" ) ?
					<Button
						isPrimary
						href="https://coblocks.com/"
						className="coblocks-gopro"
						target="_blank" >
						{ __( 'Go Pro' ) }
						<Dashicon icon={ 'external' } />
					</Button> :
					<Button
						type="button"
						className="coblocks-layouts__list-item-action-button"
						onClick={ () => this.insertItem( template[1].path, ( typeof template[1].fonts != "undefined" ) ? template[1].fonts : '' ) }>
						<Dashicon icon={ 'insert' } />
					</Button>
				}
				<div className={ 'coblocks-layouts__list-item-title coblocks__template-type--' + this.contentType }>
					{ template[1].name }
				</div>
				<span class="coblocks-layouts__list-item-tags">{ template[1].tags }</span>
			</li>
		);
	}

	// Custom layouts.
	renderTableItem( post ){
		var type = 'section';

		if ( post[1].meta_value == type ) {
			return (
				<li key={ 'coblocks-' + post[1].ID } className={ 'coblocks-layouts__list-item coblocks-custom-layout coblocks-' + type }>
					<div>
						{ post[1].thumbnail ? <img className="coblocks-layouts__list-item-screenshot" src={ post[1].thumbnail } /> : <div class="coblocks-placeholder">{ brandAssets.modalIcon }</div> }
						<Button
							type="button"
							className="coblocks-layouts__list-item-action-button"
							onClick={ () => this.insertItemType( post[1].ID ) }>
							<Dashicon icon={ 'insert' } />
						</Button>
					</div>
					<div className="coblocks-layouts__list-item-title">
						{ post[1].post_title }
					</div>
				</li>
			);
		}
	}

	insertItem( path, fonts = '' ){
		this.setState( { isRequesting: true } );
		this.closeModal();
		apiFetch({ path: '/wp-json/coblocks/v1/library/template/' + path.replace(/\//g, 'SLSH') })
		.then(
			( obj ) => {
				if( obj ){
		        	var newBlocks = wp.blocks.parse( obj );
					var toSelect  = [];
					var blockIndex = wp.data.select( 'core/editor' ).getBlockInsertionPoint();
					if( newBlocks.length > 0 ){
						for( var nb in newBlocks ){
							var created = wp.blocks.createBlock( newBlocks[nb].name, newBlocks[nb].attributes, newBlocks[nb].innerBlocks );
							wp.data.dispatch( 'core/editor' ).insertBlocks( created , parseInt( blockIndex.index ) + parseInt( nb ) );

							if( typeof created !== 'undefined' ){
								toSelect.push( created.clientId );
							}
						}
						wp.data.dispatch( 'core/editor' ).removeBlock( this.props.clientId );

						if( toSelect.length > 0 ){
							wp.data.dispatch( 'core/editor' ).multiSelect( toSelect[0], toSelect.reverse()[0] );
						}
						toSelect  = [];


						//add googlefonts to head
						if( typeof fonts !== 'undefined' && fonts != '' ){
							var pmeta 	  	= wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
							var ba 			= '';

							ba = ba + ',' + fonts;
							//save new meta data for fonts
							wp.data.dispatch( 'core/editor' ).editPost({
								meta: {
									_coblocks_attr: ba,
								}
							});


							var gfonts_attr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
							var link 		= document.createElement('link');
						    link.rel 		= 'stylesheet';

							fonts = fonts.split(',');
							for( var f in fonts ){
								if( fonts[f].length > 0 ){
									fonts[f] 		= fonts[f].trim();
									link.href 		= 'https://fonts.googleapis.com/css?family=' + fonts[f].replace(/ /g, '+') + gfonts_attr;
		    						document.head.appendChild( link );
								}

							}
						}

					}else{
						this.setState( { isRequesting: false } );
					}
		        }else{
					this.setState( { isRequesting: false } );
				}
			}
		);
	}

	insertItemType( id ){
		this.setState( { isRequesting: true } );
		this.closeModal();
		apiFetch({ path: '/wp-json/coblocks/v1/library/content/' + id })
		.then(
			( obj ) => {
				if( obj ){
					var gfonts_attr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
					var link 		= document.createElement('link');
				    link.rel 		= 'stylesheet';

					var pmeta 	  	= wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
					var ba 		  	= '';

		        	var newBlocks 	= wp.blocks.parse( obj.content );
					var toSelect  	= [];
					var blockIndex = wp.data.select( 'core/editor' ).getBlockInsertionPoint();

					if( newBlocks.length > 0 ){
						for( var nb in newBlocks ){
							var created = wp.blocks.createBlock( newBlocks[nb].name, newBlocks[nb].attributes, newBlocks[nb].innerBlocks );
							wp.data.dispatch( 'core/editor' ).insertBlocks( created, parseInt( blockIndex.index ) + parseInt( nb ) );
							if( typeof created !== 'undefined' ){
								toSelect.push( created.clientId );
							}
						}
						wp.data.dispatch( 'core/editor' ).removeBlock( this.props.clientId );
						wp.data.dispatch( 'core/editor' ).multiSelect( toSelect[0], toSelect.reverse()[0] );
						toSelect  = [];

						if( typeof pmeta !== 'undefined' && typeof pmeta._coblocks_attr !== 'undefined' ){
							ba =  pmeta._coblocks_attr;
						}
						ba = ba + ',' + obj.meta;
						//save new meta data for fonts
						wp.data.dispatch( 'core/editor' ).editPost({
							meta: {
								_coblocks_attr: ba,
							}
						});

						//add googlefonts to head
						if( ba.length > 0 ){
							var fonts = ba.split(',');
							for( var f in fonts ){
								if( fonts[f].length > 0 ){
									fonts[f] 		= fonts[f].trim();
									link.href 		= 'https://fonts.googleapis.com/css?family=' + fonts[f].replace(/ /g, '+') + gfonts_attr;
		    						document.head.appendChild( link );
								}

							}
						}

					} else {
						this.setState( { isRequesting: false } );
					}
		        } else {
					this.setState( { isRequesting: false } );
				}
			}
		);
	}

	onCategoryChange( category, event ){
		this.filterList( event, 'sections' );
		this.setState( { sectionCategory: category } );
	}

	filterList( event, type ){
		var items = {};
		var filtered = {};

		switch( type ){
			case 'sections':
				items = this.props.sections;
			break;

			case 'templates':
				items = this.props.templates;
			break;
		}

	    var updatedList = Object.entries( items ).filter(function(item){
	    	var text = item[1].name + ' ' + item[1].slug + ' ' + item[1].description;
	      return text.toLowerCase().search(
	        event.target.value.toLowerCase()) !== -1;
	    });

	    updatedList.forEach(([key, value]) => {
	    	filtered[ key ] = items[key];
		});

	    switch( type ){
			case 'sections':
				this.setState({ sectionItems: filtered, sectionFiltered: true });
			break;

			case 'templates':
				this.setState({ templateItems: filtered, templateFiltered: true });
			break;
		}

	}


	render() {

		const { className } = this.props;

		if ( this.state.isRequesting ) {
			return (
				<Fragment>
					<Placeholder
						icon={ brandAssets.blockIcon }
						label={  __( 'Add CoBlocks Layout' ) }
						instructions={  __( 'Add a layout from your theme or the CoBlocks Layout Libary.' ) }
					>
						<Spinner />
					</Placeholder>
				</Fragment>
			)
		}

		return (
			<Fragment>
				<Placeholder
						icon={ brandAssets.blockIcon }
						label={  __( 'Add Layout' ) }
						instructions={  __( 'Add a layout from your theme or the CoBlocks Layout Libary.' ) }
						className="block-coblocks-inserter"
					>
					<Button
						isLarge
						type="button"
						onClick={ () => this.openModal('sections') }>
						{ __( 'Add Section Layout' ) }
					</Button>
					{ this.state.isOpen ?
						<Modal
							className='coblocks-modal-component components-modal--coblocks-layouts'
							icon={ brandAssets.modalIcon }
							title={ __( 'Layouts' ) }
							closeLabel={ __( 'Close Layouts' ) }
							onRequestClose={ this.closeModal }>
							{ this.contentModal( this.contentType ) }
						</Modal>
					: null }
				</Placeholder>
			</Fragment>
		);
	}
}

export default withSelect( ( select ) => {
	return {
		sections: select( 'coblocks/sections' ).receiveSections(),
		theme_sections: select( 'coblocks/theme_sections' ).receiveThemeSections(),
		saved_sections: select( 'coblocks/saved_sections' ).receiveSaved(),
		theme_name: select( 'coblocks/theme_name' ).receiveThemeName(),
	};
} )( Edit );
