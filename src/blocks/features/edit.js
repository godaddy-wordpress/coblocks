/**
 * External dependencies
 */
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/feature' ];

/**
 * Returns the layouts configuration for a given number of feature items.
 *
 * @param {number} count Number of feature items.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/feature' ] );
} );

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.updateInnerAttributes = this.updateInnerAttributes.bind( this );
		this.onChangeHeadingLevel = this.onChangeHeadingLevel.bind( this );
	}

	updateInnerAttributes( blockName, newAttributes ) {
		const innerItems = select( 'core/block-editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	}

	onChangeHeadingLevel( headingLevel ) {
		const { setAttributes } = this.props;

		setAttributes( { headingLevel } );
		this.updateInnerAttributes( 'coblocks/feature', { headingLevel } );
	}

	render() {
		const {
			attributes,
			textColor,
			className,
			isSelected,
			backgroundColor,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			columns,
			contentAlign,
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
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add as background', 'coblocks' ) }
			/>
		);

		let classes = className;

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-features-${ coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-features__inner',
			...BackgroundClasses( attributes ), {
				'has-columns': columns > 1,
				[ `has-${ columns }-columns` ]: columns,
				'has-responsive-columns': columns > 1,
				[ `has-${ gutter }-gutter` ]: gutter,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'no' && paddingSize !== 'advanced' ),
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'no' && marginSize !== 'advanced' ),
				[ `has-${ contentAlign }-content` ]: contentAlign,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes, backgroundColor ),
			color: textColor.color,
			textAlign: contentAlign,
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
						onChangeHeadingLevel={ this.onChangeHeadingLevel }
					/>
				) }
				{ isSelected && (
					<Inspector { ...this.props } />
				) }
				<div
					className={ classes }
				>
					<div className={ innerClasses } style={ innerStyles }>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<InnerBlocks
							template={ getCount( columns ) }
							allowedBlocks={ ALLOWED_BLOCKS }
							templateLock="all"
							templateInsertUpdatesSelection={ false }
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
