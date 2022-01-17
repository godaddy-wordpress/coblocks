/**
 * Internal dependencies.
 */
import Controls from './controls';
import Inspector from './inspector';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { InnerBlocks, withColors } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = [ 'coblocks/testimonial' ];

const layoutOptions = [
	{
		isDefault: true,
		/* translators: block style */
		label: __( 'Boxy', 'coblocks' ),
		name: 'boxy',
	},
	{
		/* translators: block style */
		label: __( 'Conversation', 'coblocks' ),
		name: 'conversation',
	},
	{
		/* translators: block style */
		label: __( 'Horizontal', 'coblocks' ),
		name: 'horizontal',
	},
];

const Edit = ( props ) => {
	const {
		attributes,
		className,
		clientId,
		customBackgroundColor,
		customTextColor,
		setAttributes,
		backgroundColor,
		textColor,
	} = props;

	const {
		columns,
		gutter,
		styleName,
	} = attributes;

	const { insertBlock, updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	useEffect( () => {
		const testimonialBlocksCount = innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/testimonial' ), 0 );

		if ( testimonialBlocksCount < columns ) {
			insertBlock(
				createBlock( 'coblocks/testimonial', {
					showImage: attributes.showImages,
					showRole: attributes.showRoles,
				} ),
				innerBlocks.length,
				clientId,
				false
			);
		}
	}, [ columns, innerBlocks ] );

	useEffect( () => {
		updateInnerAttributes( 'coblocks/testimonial', {
			backgroundColor: backgroundColor?.slug,
			customBackgroundColor: backgroundColor?.class ? undefined : backgroundColor.color,
			customTextColor: textColor?.class ? undefined : textColor.color,
			textColor: textColor?.slug,
		} );
	}, [ backgroundColor, customBackgroundColor, customTextColor, textColor ] );

	const classes = classnames( className, {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
		[ `has-${ gutter }-gutter` ]: gutter,
		[ `is-style-${ styleName }` ]: styleName,
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

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/testimonial', { headingLevel } );
	};

	const toggleImages = () => {
		const showImages = ! attributes.showImages;
		setAttributes( { showImages } );
		updateInnerAttributes( 'coblocks/testimonial', { showImage: showImages } );
	};

	const toggleRoles = () => {
		const showRoles = ! attributes.showRoles;
		setAttributes( { showRoles } );
		updateInnerAttributes( 'coblocks/testimonial', { showRole: showRoles } );
	};

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	const setGutter = ( value ) => {
		setAttributes( { gutter: value } );
	};

	const setStyleName = ( value ) => {
		setAttributes( { styleName: value.name } );
		updateInnerAttributes( 'coblocks/testimonial', { styleName: value.name } );
	};

	return (
		<>
			<Controls
				{ ...props }
				onChangeHeadingLevel={ onChangeHeadingLevel }
			/>
			<Inspector
				{ ...props }
				activeStyle={ styleName }
				attributes={ attributes }
				layoutOptions={ layoutOptions }
				onSetColumns={ setColumns }
				onSetGutter={ setGutter }
				onToggleImages={ toggleImages }
				onToggleRoles={ toggleRoles }
				onUpdateStyleName={ setStyleName }
			/>
			<div className={ classes }>
				<InnerBlocks
					__experimentalCaptureToolbars={ true }
					allowedBlocks={ ALLOWED_BLOCKS }
					templateInsertUpdatesSelection={ false }
				/>
			</div>
		</>
	);
};

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Edit );
