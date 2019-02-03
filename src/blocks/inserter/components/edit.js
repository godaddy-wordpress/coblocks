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
										title: __( 'Section Library' ),
										className: 'coblocks-sections',
									}];

					//check if theme templates available
					if( typeof this.props.theme_sections != "undefined" ){
						if( this.props.theme_sections !== null && Object.keys( this.props.theme_sections ).length > 0 ){
							navtabs.push({
								name: 'coblocks-theme',
								title: __( 'Theme Sections' ),
								className: 'coblocks-theme',
							});
						}
					}

					navtabs.push({
						name: 'coblocks-saved',
						title: __( 'My Sections' ),
						className: 'coblocks-saved',
					});

					if( Object.keys( sections ).length > 0 ){
						return (
							<TabPanel className="blockcoblocks-tab-panel"
								activeClass="active-tab"
								tabs={ navtabs }>
								{
									( tab ) => {
										switch( tab.name ){
											case 'coblocks-sections':
												if( !this.state.sectionFiltered ){
													this.state.sectionItems = sections;
												}

												return[
													<div className="blockcoblocks__modal-controls">
														<SelectControl
															value={ this.state.sectionCategory }
															options={ sectionCategories }
															onChange={ ( nextCategory ) => this.onCategoryChange( nextCategory, event ) }
															className="blockcoblocks__modal-controls--category"
														/>
														<input type="text" class="blockcoblocks__modal-controls--search" placeholder={ __( 'Search...' ) } onChange={ (evt) => this.filterList( evt, 'sections' ) } />
													</div>,
														<Masonry
												                className={'blockcoblocks-lists'}
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
													var theme_sections 	 = this.props.theme_sections;
													if( Object.keys( theme_sections ).length > 0 ){
														return(
															<ul className='blockcoblocks-lists'>
																{ Object.entries( theme_sections ).map( template => this.renderListItem( template ) ) }
															</ul>
														);
													}
												}
												break;

											case 'coblocks-saved':
												if( typeof this.props.saved_sections != "undefined" ){
													var saved 	 = this.props.saved_sections;
													if( Object.keys( saved ).length > 0 ){
														return(
															<ul className='blockcoblocks-lists'>
																{ Object.entries( saved ).map( template => this.renderTableItem( template ) ) }
															</ul>
														);
													}else{
														return(
															<div class="blockcoblocks-nolists">
															{ [
																<h3>{ __( 'Create Your First Section' ) }</h3>,
																<p>{ __( 'Add sections and reuse them across your website.' ) }</p>,
																<Button
																	isPrimary
																	href={ addQueryArgs( 'edit.php',{ post_type: 'block-coblocks' } ) }
																	target="_blank" >
																	{ __( 'Add New Section' ) }
																</Button>,
															] }
															</div>
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
			<li key={ 'coblocks-' + template[0] } className={ pro ? 'coblocks-pro' : 'coblocks-default' }>
				<div className="coblocks-default__inner">
					<img src={ template[1].screenshot } />
					<span>
						{ ( pro && typeof template[1].has_pro == "undefined" ) ?
							<Button
								isPrimary
								href="https://wpblockcoblocks.com/"
								className="coblocks-gopro"
								target="_blank" >
								{ __( 'Go Pro' ) }
								<Dashicon icon={ 'external' } />
							</Button> :
							<Button
								isPrimary
								type="button"
								 onClick={ () => this.insertItem( template[1].path, ( typeof template[1].fonts != "undefined" ) ? template[1].fonts : '' ) }>
								{ __( 'Insert' ) }
							</Button>
						}

					</span>
					<div className={ 'coblocks__template-type--' + this.contentType }>
						<h3>{ template[1].name }</h3>
					</div>
					<span class="hidden">{ template[1].tags }</span>
				</div>
			</li>
		);
	}

	renderTableItem( post ){
		var type = 'section';

		if ( post[1].meta_value == type ) {
			return (
				<li key={ 'coblocks-' + post[1].ID } className={ 'coblocks-' + type }>
					{ post[1].thumbnail ? <img src={ post[1].thumbnail } /> : <div class="coblocks-placeholder"></div> }

					<span>
						<Button
							isPrimary
							type="button"
							 onClick={ () => this.insertItemType( post[1].ID ) }>
							{ __( 'Insert' ) }
						</Button>
					</span>
					<div>
						<h3>{ post[1].post_title }</h3>
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
									_blockcoblocks_attr: ba,
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
						icon={ icons.templateInserter }
						label={  __( 'CoBlocks Inserter' ) }
						instructions={  __( 'Insert a CoBlocks template or section.' ) }
						className="block-coblocks-inserter"
					>
						<Spinner />
					</Placeholder>
				</Fragment>
			)
		}

		return (
			<Fragment>
				<Placeholder
						icon={ icons.templateInserter }
						label={  __( 'CoBlocks Inserter' ) }
						instructions={  __( 'Insert a CoBlocks page template or section.' ) }
						className="block-coblocks-inserter"
					>
					<Button
						isLarge
						type="button"
						onClick={ () => this.openModal('sections') }>
						{ __( 'Add Section' ) }
					</Button>
					{ this.state.isOpen ?
						<Modal
							className= "blockcoblocks-modal-component"
							title={ __( 'CoBlocks' ) }
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
	};
} )( Edit );
