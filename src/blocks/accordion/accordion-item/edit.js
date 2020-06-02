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

					{ ( isEditing === true || attributes.open ) &&
						<div className="wp-block-coblocks-accordion-item__content" style={ { borderColor: backgroundColor.color } }>
							<InnerBlocks
								template={ TEMPLATE }
								templateInsertUpdatesSelection={ false }
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
			getBlocks,
		} = select( 'core/block-editor' );

		const hasSelectedChildren = getBlocks( props.clientId ).filter( ( elem ) => elem.clientId === getSelectedBlockClientId() );

		return {
			isEditing: getSelectedBlockClientId() === props.clientId || hasSelectedChildren.length > 0,
		};
	} ),

	applyWithColors,

] )( AccordionItemEdit );
