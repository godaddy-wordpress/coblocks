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
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

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
		const anySelectedChildrenBlocks = anySelectedBlocks( getBlocks( props.clientId ), selectedBlock );

		return {
			isEditing: getSelectedBlockClientId() === props.clientId || anySelectedChildrenBlocks,
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
		</>
	);
};

export default compose( [
	applyWithColors,
] )( AccordionItemEdit );
