/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';
import Controls from './controls';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Constants
 */
const TEMPLATE = [
	[ 'core/paragraph', { placeholder: __( 'Add content…', 'coblocks' ) } ],
];

/**
 * Block edit function
 */
class AccordionItemEdit extends Component {
	render() {
		const {
			attributes,
			backgroundColor,
			className,
			isEditing,
			isSelected,
			onReplace,
			setAttributes,
			textColor,
		} = this.props;

		const { title } = attributes;

		return (
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className,
						{
							[ `${ className }--open` ]: isEditing === true || attributes.open,
							'is-selected': isSelected,
						}
					) }
				>
					<RichText
						tagName="p"
						/* translators: Accordion is the block name  */
						placeholder={ __( 'Write accordion item title…', 'coblocks' ) }
						value={ title }
						className={ classnames(
							'wp-block-coblocks-accordion-item__title', {
								'has-background': backgroundColor.color,
								'has-text-color': textColor.color,
							}
						) }
						style={ {
							backgroundColor: backgroundColor.color,
							color: textColor.color,
						} }
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						keepPlaceholderOnFocus
						onRemove={ ( forward ) => {
							const hasEmptyTitle = typeof title === 'undefined' || ( typeof title !== 'undefined' && title.length === 0 );

							if ( ! forward && hasEmptyTitle ) {
								onReplace( [] );
							}
						} }
					/>
					<Icon className={ classnames( { 'has-text-color': textColor.color } ) } style={ { color: textColor.color } } icon={ isEditing === true || attributes.open ? 'arrow-down' : 'arrow-right' } />

					{ ( isEditing === true || attributes.open ) &&
						<div className="wp-block-coblocks-accordion-item__content" style={ { borderColor: backgroundColor.color } }>
							<InnerBlocks
								template={ TEMPLATE }
								templateInsertUpdatesSelection={ false }
								__experimentalCaptureToolbars={ true }
							/>
						</div>
					}
				</div>
			</Fragment>
		);
	}
}

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getSelectedBlockClientId,
			getBlockRootClientId,
			getBlocks,
		} = select( 'core/block-editor' );

		const hasSelectedChildren = getBlocks( props.clientId ).filter( ( elem ) => elem.clientId === getSelectedBlockClientId() || elem.clientId === getBlockRootClientId( getSelectedBlockClientId() ) );

		return {
			isEditing: getSelectedBlockClientId() === props.clientId || hasSelectedChildren.length > 0,
		};
	} ),

	applyWithColors,

] )( AccordionItemEdit );
