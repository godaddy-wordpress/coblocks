/**
 * Internal dependencies
 */
import IconControls from '../toolbar-components';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, AlignmentToolbar } = wp.editor;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			align,
		} = attributes;
		console.log( 'asdfads' );
		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
					/>
					<IconControls { ...this.props } />
				</BlockControls>
			</Fragment>
		);
	}
};

export default Controls;
