/**
 * Internal dependencies
 */
import Accordion from './accordion';
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RichText } = wp.blocks;
const { withState } = wp.components;

/**
 * Block edit function
 */
export default withState( { editable: 'title' } ) ( class AccordionBlock extends Component {

	render() {

		const {
			attributes,
			className,
			editable,
			isSelected,
			mergeBlocks,
			onReplace,
			setAttributes,
			setState,
		} = this.props;

		const { title, content, open, titleBackgroundColor, titleColor, textAlign } = attributes;

		const onSetActiveEditable = ( newEditable ) => () => {
			setState( { editable: newEditable } );
		};

		return [
			isSelected && (
				<Controls
					{ ...this.props }
				/>
			),
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			<Accordion { ...this.props }>
				<RichText
					tagName="summary"
					placeholder={ __( 'Add title...' ) }
					value={ title }
					className={ `${ className }__title` }
					style={ {
						backgroundColor: titleBackgroundColor,
						color: titleColor,
					} }
					onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
					isSelected={ isSelected && editable === 'title' }
					onFocus={ onSetActiveEditable( 'title' ) }
					keepPlaceholderOnFocus
				/>
				{ open || isSelected ? (
					<div
						className={ `${ className }__content` }
						style={ {
							borderColor: titleBackgroundColor,
						} }
					>
						<RichText
							tagName="p"
							placeholder={ __( 'Write text...' ) }
							value={ content }
							className={ `${ className }__text` }
							onMerge={ mergeBlocks }
							onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
							isSelected={ isSelected && editable === 'content' }
							onFocus={ onSetActiveEditable( 'content' ) }
							onRemove={ ( forward ) => {
								const hasEmptyTitle = ! title || title.length === 0;
								if ( ! forward && hasEmptyTitle ) {
									onReplace( [] );
								}
							} }
							keepPlaceholderOnFocus
						/>
					</div>
				) : null }
			</Accordion>
		];
	}
} );
