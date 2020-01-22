/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { template, allowedBlocks, layoutOptions } from './utilities';
import Inspector from './inspector';
import Controls from './controls';
import applyWithColors from './colors';
import rowIcons from './icons';
import { BackgroundClasses, BackgroundDropZone, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockIcon, InnerBlocks } from '@wordpress/block-editor';
import { ButtonGroup, Button, IconButton, Tooltip, Placeholder, Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			layoutSelection: true,
		};
	}

	numberToText( columns ) {
		if ( columns === 1 ) {
			return __( 'one', 'coblocks' );
		} else if ( columns === 2 ) {
			return __( 'two', 'coblocks' );
		} else if ( columns === 3 ) {
			return __( 'three', 'coblocks' );
		} else if ( columns === 4 ) {
			return __( 'four', 'coblocks' );
		}
	}

	render() {
		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add background to row', 'coblocks' ) }
			/>
		);

		const columnOptions = [
			{ columns: 1, name: __( 'One Column', 'coblocks' ), icon: rowIcons.colOne, key: '100' },
			{ columns: 2, name: __( 'Two Columns', 'coblocks' ), icon: rowIcons.colTwo },
			{ columns: 3, name: __( 'Three Columns', 'coblocks' ), icon: rowIcons.colThree },
			{ columns: 4, name: __( 'Four Columns', 'coblocks' ), icon: rowIcons.colFour },
		];

		let selectedRows = 1;

		if ( attributes.columns ) {
			selectedRows = parseInt( attributes.columns.toString().split( '-' ) );
		}

		if ( ! attributes.layout && this.state.layoutSelection ) {
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
					<Placeholder
						key="placeholder"
						icon={ <BlockIcon icon={ attributes.columns ? rowIcons.layout : rowIcons.row } /> }
						label={ attributes.columns ? __( 'Row Layout', 'coblocks' ) : __( 'Row', 'coblocks' ) }
						instructions={ attributes.columns ?
							sprintf(
								/* translators: %s: 'one' 'two' 'three' and 'four' */
								__( 'Now select a layout for this %s column row.', 'coblocks' ),
								this.numberToText( attributes.columns )
							) :
							__( 'Select the number of columns for this row.', 'coblocks' )
						}
						className={ 'components-coblocks-visual-dropdown' }
					>
						{ ! attributes.columns ?
							<ButtonGroup aria-label={ __( 'Select Row Columns', 'coblocks' ) }>
								{ map( columnOptions, ( { name, key, icon, columns } ) => (
									<Tooltip text={ name }>
										<div className="components-coblocks-visual-dropdown__button-wrapper">
											<Button
												className="components-coblocks-visual-dropdown__button"
												isSmall
												onClick={ () => {
													setAttributes( {
														columns,
														layout: columns === 1 ? key : null,
													} );

													if ( columns === 1 ) {
														this.setState( { layoutSelection: false } );
													}
												} }
											>
												{ icon }
											</Button>
										</div>
									</Tooltip>
								) ) }
							</ButtonGroup> :
							<Fragment>
								<ButtonGroup aria-label={ __( 'Select Row Layout', 'coblocks' ) }>
									<IconButton
										icon="exit"
										className="components-coblocks-visual-dropdown__back"
										onClick={ () => {
											setAttributes( {
												columns: null,
											} );
											this.setState( { layoutSelection: true } );
										} }
										label={ __( 'Back to Columns', 'coblocks' ) }
									/>
									{ map( layoutOptions[ selectedRows ], ( { name, key, icon } ) => (
										<Tooltip text={ name }>
											<div className="components-coblocks-visual-dropdown__button-wrapper">
												<Button
													key={ key }
													className="components-coblocks-visual-dropdown__button"
													isSmall
													onClick={ () => {
														setAttributes( {
															layout: key,
														} );
														this.setState( { layoutSelection: false } );
													} }
												>
													{ icon }
												</Button>
											</div>
										</Tooltip>
									) ) }
								</ButtonGroup>
							</Fragment>
						}
					</Placeholder>
				</Fragment>
			);
		}

		let classes = classnames(
			this.props.className, {
				[ `coblocks-row--${ attributes.id }` ]: attributes.id,
			}
		);

		if ( attributes.coblocks && ( typeof attributes.coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-row-${ attributes.coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-row__inner',
			...BackgroundClasses( attributes ), {
				'has-text-color': this.props.textColor.color,
				[ `has-${ attributes.gutter }-gutter` ]: attributes.gutter,
				'has-padding': attributes.paddingSize && attributes.paddingSize !== 'no',
				[ `has-${ attributes.paddingSize }-padding` ]: attributes.paddingSize && attributes.paddingSize !== 'advanced',
				'has-margin': attributes.marginSize && attributes.marginSize !== 'no',
				[ `has-${ attributes.marginSize }-margin` ]: attributes.marginSize && attributes.marginSize !== 'advanced',
				'is-stacked-on-mobile': attributes.isStackedOnMobile,
			}
		);

		const innerStyles = {
			backgroundColor: this.props.backgroundColor.color,
			backgroundImage: attributes.backgroundImg && attributes.backgroundType === 'image' ? `url(${ attributes.backgroundImg })` : undefined,
			backgroundPosition: attributes.focalPoint && ! attributes.hasParallax ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined,
			color: this.props.textColor.color,
			paddingTop: attributes.paddingSize === 'advanced' && attributes.paddingTop ? attributes.paddingTop + attributes.paddingUnit : undefined,
			paddingRight: attributes.paddingSize === 'advanced' && attributes.paddingRight ? attributes.paddingRight + attributes.paddingUnit : undefined,
			paddingBottom: attributes.paddingSize === 'advanced' && attributes.paddingBottom ? attributes.paddingBottom + attributes.paddingUnit : undefined,
			paddingLeft: attributes.paddingSize === 'advanced' && attributes.paddingLeft ? attributes.paddingLeft + attributes.paddingUnit : undefined,
			marginTop: attributes.marginSize === 'advanced' && attributes.marginTop ? attributes.marginTop + attributes.marginUnit : undefined,
			marginRight: attributes.marginSize === 'advanced' && attributes.marginRight ? attributes.marginRight + attributes.marginUnit : undefined,
			marginBottom: attributes.marginSize === 'advanced' && attributes.marginBottom ? attributes.marginBottom + attributes.marginUnit : undefined,
			marginLeft: attributes.marginSize === 'advanced' && attributes.marginLeft ? attributes.marginLeft + attributes.marginUnit : undefined,
		};

		return (
			<Fragment>
				{ dropZone }
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
				<div className={ classes }>
					{ isBlobURL( attributes.backgroundImg ) && <Spinner /> }
					<div className={ innerClasses } style={ innerStyles }>
						{ BackgroundVideo( attributes ) }
						<InnerBlocks
							template={ template[ attributes.layout ] }
							templateLock="all"
							allowedBlocks={ allowedBlocks }
							templateInsertUpdatesSelection={ attributes.columns === 1 }
							renderAppender={ () => ( null ) } />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Edit );
