/**
 * Internal dependencies
 */
import BackgroundImagePanel, { BackgroundImageToolbarControls } from '../../../components/background';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
const { Toolbar } = wp.components;

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
			contentAlign,
			mediaPosition,
		} = attributes;

		const toolbarControls = [ {
			icon: icons.mediaCardLeft,
			title: __( 'Media on left' ),
			isActive: mediaPosition === 'left',
			onClick: () => setAttributes( { mediaPosition: 'left' } ),
		}, {
			icon: icons.mediaCardRight,
			title: __( 'Media on right' ),
			isActive: mediaPosition === 'right',
			onClick: () => setAttributes( { mediaPosition: 'right' } ),
		} ];

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={ toolbarControls }
					/>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					{ BackgroundImageToolbarControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
