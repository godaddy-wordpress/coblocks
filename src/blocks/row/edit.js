/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { layoutOptions } from './layouts';
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
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'coblocks/column' ];

const TEMPLATE = {
	100: [
		[ 'coblocks/column', { width: '100' } ],
	],
	'50-50': [
		[ 'coblocks/column', { width: '50' } ],
		[ 'coblocks/column', { width: '50' } ],
	],
	'25-75': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '75' } ],
	],
	'75-25': [
		[ 'coblocks/column', { width: '75' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'66-33': [
		[ 'coblocks/column', { width: '66' } ],
		[ 'coblocks/column', { width: '33' } ],
	],
	'33-66': [
		[ 'coblocks/column', { width: '33' } ],
		[ 'coblocks/column', { width: '66' } ],
	],
	'33-33-33': [
		[ 'coblocks/column', { width: '33.33' } ],
		[ 'coblocks/column', { width: '33.33' } ],
		[ 'coblocks/column', { width: '33.33' } ],
	],
	'50-25-25': [
		[ 'coblocks/column', { width: '50' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'25-25-50': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '50' } ],
	],
	'25-50-25': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '50' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'20-60-20': [
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '60' } ],
		[ 'coblocks/column', { width: '20' } ],
	],
	'25-25-25-25': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'40-20-20-20': [
		[ 'coblocks/column', { width: '40' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
	],
	'20-20-20-40': [
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '40' } ],
	],
};

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
			className,
			isSelected,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			id,
			columns,
			layout,
			gutter,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			paddingUnit,
			marginUnit,
			marginSize,
			paddingSize,
			isStackedOnMobile,
			focalPoint,
			hasParallax,
			backgroundType,
		} = attributes;

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
						icon={ <BlockIcon icon={ columns ? rowIcons.layout : rowIcons.row } /> }
						label={ columns ? __( 'Row Layout', 'coblocks' ) : __( 'Row', 'coblocks' ) }
						instructions={ columns ?
							sprintf(
								/* translators: %s: 'one' 'two' 'three' and 'four' */
								__( 'Now select a layout for this %s column row.', 'coblocks' ),
								this.numberToText( columns )
							) :
							__( 'Select the number of columns for this row.', 'coblocks' )
						}
						className={ 'components-coblocks-visual-dropdown' }
					>
						{ ! columns ?
							<ButtonGroup aria-label={ __( 'Select Row Columns', 'coblocks' ) }>
								{ map( columnOptions, ( { name, key, icon, columns } ) => (
									<Tooltip text={ name }>
										<div className="components-coblocks-visual-dropdown__button-wrapper">
											<Button
												className="components-coblocks-visual-dropdown__button"
												isSmall
												onClick={ () => {
													setAttributes( {
														columns: columns,
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
				'has-text-color': textColor.color,
				[ `has-${ gutter }-gutter` ]: gutter,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
				'is-stacked-on-mobile': isStackedOnMobile,
			}
		);

		const innerStyles = {
			backgroundColor: backgroundColor.color,
			backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
			color: textColor.color,
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
							template={ TEMPLATE[ layout ] }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS }
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
