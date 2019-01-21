/**
 * External dependencies
 */
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import './api.js';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Button, TextControl, SelectControl, ToggleControl, Spinner, withFilters } = wp.components;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { withSelect } = wp.data;
const { addQueryArgs } = wp.url;

/**
 * Render plugin
 */
class Sidebar extends Component {

	constructor( props ) {
		super( ...arguments );

		var title = wp.data.select( 'core/editor' ).getCurrentPost().title;

		this.props   = props;
		this.message = '';
		this.state   = {
			coblocks_name:  title ? title.replace ( /[^a-zA-Z0-9_ ]/g, '' ) : '',
			coblocks_type: 'template',
			isRequesting: false,
			isSaved: false,
			hasError: false,
			template_type: '',
		}

		if( wp.data.select( 'core/editor' ).getCurrentPost().type == 'coblocks' ){
			apiFetch({ path: '/wp-json/coblocks/v1/library/template_type/' + wp.data.select( 'core/editor' ).getCurrentPostId() })
			.then(
				( obj ) => {
					if( typeof obj.meta !== undefined ){
						this.setState( { template_type: obj.meta } );
					}
				}
			);
		}
	}

	onChangeValue( event, id ) {
		switch( id ) {
			case 'name':
				this.setState( { coblocks_name: event.replace ( /[^a-zA-Z0-9_ ]/g, '' ) } );
				break;
			case 'type':
				this.setState( { coblocks_type: event } );
				break;
			default:
				break;
		}
	}

	saveItem() {
		var post_id = wp.data.select( 'core/editor' ).getCurrentPostId();

		this.setState( { isRequesting: true } );

		if ( this.state.coblocks_name.length < 1 ) {
			this.message = <span class="coblocks--notice coblocks--notice--error">{ sprintf( __( 'Add a title for the new %1$s' ), this.state.coblocks_type ) }</span>;
			this.setState( { isRequesting: false } )
			this.setState( { hasError: true } )
		}

		if ( ! post_id ) {
			this.setState( { isRequesting: false } );
			return;
		}

		apiFetch( { path: '/wp-json/coblocks/v1/save/'+ post_id +'/' + this.state.coblocks_type + '/' + this.state.coblocks_name } )

		.then(
			( obj ) => {
				if ( obj == 'created' ) {

					// Remove duplicates so they don't appear in the message UI more than once.
					var name = this.state.coblocks_name.replace( __( 'Template' ), '' ).replace( __( 'template' ), '' ).replace( __( 'Section' ), '' ).replace( __( 'section' ), '' );

					// translators: %1$s: Template name, %2$s: Template type
					this.message = <span class="coblocks--notice coblocks--notice--success">{ sprintf( __( 'Your new %1$s %2$s is saved!' ), name, this.state.coblocks_type ) }</span>;
					this.setState( { isSaved: true } )
		        		this.setState( { isRequesting: false } );
		        		this.setState( { hasError: false } )
		      		}
			}
		);
	}

	Capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	sidebarContent(){

		var name = this.state.coblocks_type.replace( __( 'template' ), __( 'Page Template' ) );

		return (
			<div class="edit-post-block-sidebar__panel coblocks-sidebar">
				<div className="editor-block-inspector__card">
					<div className="editor-block-icon has-colors">
						{ icons.templateInserter }
					</div>
					<div className="editor-block-inspector__card-content">
						<div className="editor-block-inspector__card-title">{  __( 'Save as...' ) }</div>
						<div className="editor-block-inspector__card-description">{  __( 'Save this set of blocks as a new CoBlocks page template or section.' ) }</div>
					</div>
				</div>
				<div
					className={ classnames(
						'components-panel__body',
						'is-opened',
						)
					}
				>
					{ ! this.state.isSaved && (
						<Fragment>
							<TextControl
								label={ sprintf( __( '%1$s Name' ), this.Capitalize( this.state.coblocks_type ) ) }
								value={ this.state.coblocks_name }
								onChange={ ( event ) => this.onChangeValue( event, 'name' ) }
								className={ classnames(
									'components-coblocks__sidebar-plugin--template-name-input', {
										'has-error' : this.state.hasError
								} ) }

							/>
							<SelectControl
								label={ __( 'Template Type' ) }
								onChange={ ( event ) => this.onChangeValue( event, 'type' ) }
								options={ [
									{ value: 'template', label: __( 'Page' ) },
									{ value: 'section', label: __( 'Section' ) },
								] }
							/>
							<div className="coblocks-sidebar__save-button-wrapper">
								<Button isPrimary type="button" onClick={ () => this.saveItem() }>{ sprintf( __( 'Save %1$s' ), this.Capitalize( name ) ) }</Button>
							</div>

							{ this.state.isRequesting ?
								<Spinner /> : null
							}
						</Fragment>

					) }
					{ this.message }
				</div>
			</div>
		);
	}

	render() {
		return (
			<Fragment>
				<PluginSidebarMoreMenuItem target="coblocks-save">
					{  __( 'CoBlocks' ) }
				</PluginSidebarMoreMenuItem>
				<PluginSidebar name="coblocks-save" title={  __( 'CoBlocks' ) }>
					{ this.sidebarContent() }
				</PluginSidebar>
			</Fragment>
		);
	}
};

export default Sidebar;