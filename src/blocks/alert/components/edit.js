/**
 * Internal dependencies
 */
import Alert from './alert';
import Controls from './controls';
import Inspector from './inspector';

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
export default withState( { editable: 'content' } ) ( class AlertBlock extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			editable,
			onReplace,
			setState,
			setAttributes,
			mergeBlocks,
		} = this.props;

		const {
			align,
			backgroundColor,
			borderColor,
			textAlign,
			textColor,
			title,
			titleColor,
			value,
		} = attributes;

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
			<Alert { ...this.props }>
				{ title || isSelected ? (
					<RichText
						tagName="p"
						placeholder={ __( 'Add title...' ) }
						value={ title }
						className={ `${ className }__title` }
						style={ {
							color: titleColor,
						} }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						isSelected={ isSelected && editable === 'title' }
						onFocus={ onSetActiveEditable( 'title' ) }
						keepPlaceholderOnFocus
					/>
				) : null }

				<RichText
					multiline="p"
					tagName="div"
					placeholder={ __( 'Write alert...' ) }
					value={ value }
					onMerge={ mergeBlocks }
					className={ `${ className }__text` }
					onChange={ ( value ) => setAttributes( { value: value } ) }
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
			</Alert>
		];
	}
} );
