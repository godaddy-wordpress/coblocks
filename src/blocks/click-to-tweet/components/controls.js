/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Toolbar, TextControl } = wp.components;
const { AlignmentToolbar, BlockControls } = wp.blocks;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			className,
			attributes,
			setAttributes,
		} = this.props;

		const {
			textAlign,
			via,
		} = attributes;

		return (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
				/>
				<Toolbar>
					<label
						aria-label={ __( 'Twitter Username' ) }
						className={ `${ className }__via-label` }
						htmlFor={ `${ className }__via` }
					>
						{ icons.at }
					</label>
					<input
						aria-label={ __( 'Twitter Username' ) }
						className={ `${ className }__via` }
						id={ `${ className }__via` }
						onChange={ ( event ) => setAttributes( { via: event.target.value } ) }
						placeholder={ __( 'Username' ) }
						type="text"
						value={ via }
					/>
				</Toolbar>
			</BlockControls>
		);
	}
}
