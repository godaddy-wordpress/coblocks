/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';
import applyWithColors from './colors';
import icons from './icons';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Toolbar, Placeholder, Button, TextControl, ServerSideRender } = wp.components;
const { compose } = wp.compose;
const { withSelect, dispatch, select } = wp.data;
const { InnerBlocks, BlockControls } = wp.blockEditor;

const ALLOWED_BLOCKS = [ 'coblocks/event-item' ];

const TEMPLATE = [
	[ 'coblocks/event-item' ],
];

class EventItem extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			editing: ! this.props.attributes.externalCalendarUrl && this.props.attributes.linkACalendar,
		};

		this.onSubmitURL = this.onSubmitURL.bind( this );
	}

	updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerItems = select( 'core/editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	updateTextColor = ( value ) => {
		const { attributes, setAttributes, setTextColor, textColor } = this.props;

		setTextColor( value );
		setAttributes( { textColor: value } );

		this.updateInnerAttributes( 'coblocks/event-item', { textColor: value } );
	};

	toggleCalendarLink = ( ) => {
		const { attributes, setAttributes } = this.props;

		const linkACalendar = ! attributes.linkACalendar;
		setAttributes( { linkACalendar } );

		const edit = linkACalendar && attributes.externalCalendarUrl === '';
		this.setState( { editing: edit } );
	};

	onSubmitURL( event ) {
		event.preventDefault();

		const { externalCalendarUrl } = this.props.attributes;
		if ( externalCalendarUrl ) {
			this.setState( { editing: false } );
		}
	}

	insertNewItem = () => {
		const { clientId, attributes, textColor } = this.props;

		const blockOrder = select( 'core/editor' ).getBlockOrder();
		const insertAtIndex = blockOrder.indexOf( clientId ) + 1;

		const innerBlocks = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
			wp.blocks.createBlock(
				blockName,
				Object.assign( {}, blockAttributes, {
					textColor: textColor,
				} )
			)
		);

		const newItem = wp.blocks.createBlock(
			'coblocks/events',
			attributes,
			innerBlocks
		);

		dispatch( 'core/editor' ).insertBlock( newItem, insertAtIndex );
	};

	render() {
		const {
			className,
			attributes,
			isSelected,
			clientId,
			selectedParentClientId,
			textColor,
			setAttributes,
		} = this.props;

		const { editing } = this.state;

		const toolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit Calendar URL' ),
				onClick: () => this.setState( { editing: true } ),
			},
		];

		if ( this.state.editing ) {
			return (
				<Fragment>
					<InspectorControls
						{ ...this.props }
						onUpdateTextColor={ this.updateTextColor }
						onToggleCalendarLink={ this.toggleCalendarLink }
					/>
					<Placeholder
						icon="rss"
						label="RSS"
					>
						<form onSubmit={ this.onSubmitURL }>
							<TextControl
								placeholder={ __( 'Enter URL here…' ) }
								value={ attributes.externalCalendarUrl }
								onChange={ ( value ) => setAttributes( { externalCalendarUrl: value } ) }
								className={ 'components-placeholder__input' }
							/>
							<Button isLarge type="submit">
								{ __( 'Use URL' ) }
							</Button>
						</form>
					</Placeholder>
				</Fragment>
			);
		}

		return (
			<Fragment>
				{ attributes.linkACalendar &&
				<BlockControls>
					<Toolbar controls={ toolbarControls } />
				</BlockControls>
				}
				<InspectorControls
					{ ...this.props }
					onUpdateTextColor={ this.updateTextColor }
					onToggleCalendarLink={ this.toggleCalendarLink }
				/>
				{ ! attributes.linkACalendar &&
				<div
					className={ classnames( className, {
						'child-selected': isSelected || clientId === selectedParentClientId,
					} ) }
				>
					{ ! attributes.linkACalendar &&
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
					}
					{ ( isSelected || clientId === selectedParentClientId ) && ! attributes.linkACalendar && (
						<CustomAppender onClick={ this.insertNewItem } />
					) }
				</div>
				}
				{ attributes.linkACalendar &&
				<ServerSideRender
					block="coblocks/events"
					attributes={ this.props.attributes }
					className="coblocks-ical-events"
				/>
				}
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const selectedClientId = select( 'core/block-editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/block-editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
	};
} );

export default compose( [ applyWithSelect, applyWithColors ] )( EventItem );
