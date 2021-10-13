/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, usePrevious } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight' ];

const TEMPLATE = [
	[
		'coblocks/icon',
		{
			hasContentAlign: false,
		},
	],
	[
		'core/heading',
		{
			/* translators: content placeholder */
			placeholder: __( 'Add feature title…', 'coblocks' ),
			/* translators: content placeholder */
			content: __( 'Feature Title', 'coblocks' ),
			level: 4,
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Add feature content', 'coblocks' ),
			/* translators: content placeholder */
			content: __( 'This is a feature block that you can use to highlight features.', 'coblocks' ),
		},
	],
];

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		attributes,
		textColor,
		className,
		isSelected,
		backgroundColor,
		clientId,
	} = props;

	const {
		coblocks,
		backgroundImg,
		contentAlign,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingSize,
		paddingUnit,
		headingLevel,
	} = attributes;

	const prevHeadingLevel = usePrevious( headingLevel );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		if (
			headingLevel !== prevHeadingLevel
		) {
			updateInnerAttributes( 'core/heading', {
				level: headingLevel,
			} );
		}
	}, [ headingLevel, prevHeadingLevel ] );

	const {
		innerBlocks,
	} = useSelect( ( select ) => {
		return {
			innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
		};
	} );

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		innerBlocks.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	const dropZone = (
		<BackgroundDropZone
			{ ...props }
			label={ __( 'Add as background', 'coblocks' ) }
		/>
	);

	let classes = className;

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-feature-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-feature__inner',
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor.color,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
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
	};

	return (
		<>
			{ dropZone }
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<div className={ classes }>
				<div className={ innerClasses } style={ innerStyles }>
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					{ BackgroundVideo( attributes ) }
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						templateInsertUpdatesSelection={ false }
						renderAppender={ () => ( null ) }
						__experimentalCaptureToolbars={ true }
					/>
				</div>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
