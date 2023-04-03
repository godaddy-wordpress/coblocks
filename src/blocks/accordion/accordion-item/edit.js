/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Icon } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * Constants
 */
const TEMPLATE = [
	[ 'core/paragraph', { placeholder: __( 'Add content…', 'coblocks' ) } ],
];

const anySelectedBlocks = ( blocks, selectedClientId ) => {
	return blocks.some( ( block ) => {
		if ( block.clientId === selectedClientId ) {
			return true;
		}

		return anySelectedBlocks( block.innerBlocks, selectedClientId );
	} );
};

/**
 * Block edit function
 *
 * @param {Object} props
 */
const AccordionItemEdit = ( props ) => {
	const {
		attributes,
		backgroundColor,
		className,
		clientId,
		isSelected,
		onReplace,
		setAttributes,
		textColor,
	} = props;

	const { title } = attributes;

	const {
		isEditing,
	} = useSelect( ( select ) => {
		const {
			getSelectedBlockClientId,
			getBlocks,
		} = select( 'core/block-editor' );

		const selectedBlock = getSelectedBlockClientId();
		const anySelectedChildrenBlocks = anySelectedBlocks( getBlocks( clientId ), selectedBlock );

		return {
			isEditing: getSelectedBlockClientId() === clientId || anySelectedChildrenBlocks,
		};
	} );

	return (
		<>
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
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
					className={ classnames(
						'wp-block-coblocks-accordion-item__title', {
							'has-background': backgroundColor.color,
							'has-text-color': textColor.color,
						}
					) }
					/* translators: Accordion is the block name  */
					onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
					onRemove={ ( forward ) => {
						const hasEmptyTitle = typeof title === 'undefined' || ( typeof title !== 'undefined' && title.length === 0 );

						if ( ! forward && hasEmptyTitle ) {
							onReplace( [] );
						}
					} }
					placeholder={ __( 'Write accordion item title…', 'coblocks' ) }
					style={ {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					} }
					tagName="p"
					value={ title }
				/>
				<Icon className={ classnames( { 'has-text-color': textColor.color } ) } icon={ isEditing === true || attributes.open ? 'arrow-down' : 'arrow-right' } style={ { color: textColor.color } } />

				{ ( isEditing === true || attributes.open ) &&
					<div className="wp-block-coblocks-accordion-item__content" style={ { borderColor: backgroundColor.color } }>
						<InnerBlocks
							__experimentalCaptureToolbars={ true }
							template={ TEMPLATE }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				}
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( AccordionItemEdit );
