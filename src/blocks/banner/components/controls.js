/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './icons';
import BackgroundPanel, { BackgroundControls } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;
const { Toolbar } = wp.components;
const { select, dispatch } = wp.data;

class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			clientId,
			attributes,
			setAttributes,
		} = this.props;

		const {
			contentAlign,
			layout,
		} = attributes;

		let getBlockContents = select( 'core/editor' ).getBlock( clientId );

		const toolbarControls = [ {
			icon: icons.bannerLeft,
			title: __( 'Left' ),
			isActive: layout === 'left',
			onClick: () => {
				setAttributes( { layout: 'left', contentAlign: 'left' } );
				if ( getBlockContents.innerBlocks ) {
					dispatch( 'core/editor' ).updateBlockAttributes( getBlockContents.innerBlocks[0].clientId, { contentAlign: 'left' });
				}
			},
		}, {
			icon: icons.bannerRight,
			title: __( 'Right' ),
			isActive: layout === 'right',
			onClick: () => {
				setAttributes( { layout: 'right', contentAlign: 'left' } );
				if ( getBlockContents.innerBlocks ) {
					dispatch( 'core/editor' ).updateBlockAttributes( getBlockContents.innerBlocks[0].clientId, { contentAlign: 'right' });
				}
			},
		}, {
			icon: icons.bannerCenter,
			title: __( 'Center' ),
			isActive: layout === 'full',
			onClick: () => {
				setAttributes( { layout: 'full', contentAlign: 'center' } );
				if ( getBlockContents.innerBlocks ) {
					dispatch( 'core/editor' ).updateBlockAttributes( getBlockContents.innerBlocks[0].clientId, { contentAlign: 'center' });
				}
			},
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
					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
};

export default Controls;
