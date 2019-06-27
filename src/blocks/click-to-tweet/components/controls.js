/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Toolbar } = wp.components;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			className,
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			textAlign,
			via,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
					<Toolbar>
						<div className={ `${ className }__via-wrapper` }>
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
						</div>
					</Toolbar>
				</BlockControls>
			</Fragment>
		);
	}
};

export default Controls;
