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
			className,
		} = this.props;

		const {
			columns,
			layout,
			id,
			backgroundImg,
			coblocks,
			gutter,
			paddingSize,
			marginSize,
			marginUnit,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			paddingUnit,
			paddingTop,
			backgroundType,
			hasParallax,
			focalPoint,
			paddingRight,
			paddingBottom,
			isStackedOnMobile,
			paddingLeft,
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add background to row', 'coblocks' ) }
			/>
		);

		const columnOptions = [
			{ columns: 2, name: __( 'Two Columns', 'coblocks' ), icon: rowIcons.colTwo },
			{ columns: 3, name: __( 'Three Columns', 'coblocks' ), icon: rowIcons.colThree },
			{ columns: 4, name: __( 'Four Columns', 'coblocks' ), icon: rowIcons.colFour },
		];

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split( '-' ) );
		}

		if ( ! layout && this.state.layoutSelection ) {
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
						className="components-coblocks-row-placeholder"
						icon={ <BlockIcon icon={ columns ? rowIcons.layout : rowIcons.row } /> }
						label={ columns ? __( 'Row Layout', 'coblocks' ) : __( 'Row', 'coblocks' ) }
						instructions={ columns ?
							sprintf(
								/* translators: %s: 'one' 'two' 'three' and 'four' */
								__( 'Select a layout for this %s column row.', 'coblocks' ),
								this.numberToText( columns )
							) :
							__( 'Select the number of columns for this row.', 'coblocks' )
						}
					>
						{ ! columns ?
							<ButtonGroup aria-label={ __( 'Select Row Columns', 'coblocks' ) } className="block-editor-inner-blocks__template-picker-options block-editor-block-pattern-picker__patterns">
								{ map( columnOptions, ( { name, key, icon, columns } ) => (
									<Tooltip text={ name }>
										<div className="components-coblocks-row-placeholder__button-wrapper">
											<Button
												className="components-coblocks-row-placeholder__button block-editor-inner-blocks__template-picker-option block-editor-block-pattern-picker__pattern"
												isLarge
												isSecondary
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
								<ButtonGroup aria-label={ __( 'Select Row Layout', 'coblocks' ) } className="block-editor-inner-blocks__template-picker-options block-editor-block-pattern-picker__patterns">
									<IconButton
										icon="exit"
										className="components-coblocks-row-placeholder__back"
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
											<div className="components-coblocks-row-placeholder__button-wrapper">
												<Button
													key={ key }
													className="components-coblocks-row-placeholder__button block-editor-inner-blocks__template-picker-option block-editor-block-pattern-picker__pattern"
													isLarge
													isSecondary
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
			className, {
				[ `coblocks-row--${ id }` ]: id,
			}
		);

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-row-${ coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-row__inner',
			...BackgroundClasses( attributes ), {
				'has-text-color': this.props.textColor.color,
				[ `has-${ gutter }-gutter` ]: gutter,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
				'is-stacked-on-mobile': isStackedOnMobile,
			}
		);

		const innerStyles = {
			backgroundColor: this.props.backgroundColor.color,
			backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
			color: this.props.textColor.color,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
			marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
			marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
			marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
			marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
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
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					<div className={ innerClasses } style={ innerStyles }>
						{ BackgroundVideo( attributes ) }
						<InnerBlocks
							template={ template[ layout ] }
							templateLock="all"
							allowedBlocks={ allowedBlocks }
							templateInsertUpdatesSelection={ columns === 1 }
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
