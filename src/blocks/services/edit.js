/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import InspectorControls from './inspector';
import HeadingToolbar from '../../components/heading-toolbar';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import {
	SERVICES_ALLOWED_BLOCKS as ALLOWED_BLOCKS,
	SERVICES_TEMPLATE as TEMPLATE,
	replaceActiveStyle,
	getActiveStyle,
	layoutOptions,
} from './utilities';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { AlignmentToolbar, BlockControls, InnerBlocks } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const {	className, attributes, setAttributes, clientId } = props;

	const [ removedColumns, setRemovedColumns ] = useState( [] );

	const {	updateBlockAttributes, insertBlock, removeBlock, replaceBlocks } = useDispatch( 'core/block-editor' );

	const { getBlocksByClientId, innerBlocks } = useSelect( ( select ) => {
		return {
			getBlocksByClientId: select( 'core/block-editor' ).getBlocksByClientId,
			innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
		};
	} );

	const updateStyle = ( style ) => {
		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	};

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerColumns = getBlocksByClientId( clientId )[ 0 ].innerBlocks;
		innerColumns.forEach( ( column ) => {
			const innerServiceItems = getBlocksByClientId( column.clientId )[ 0 ].innerBlocks;
			innerServiceItems.forEach( ( item ) => {
				if ( item.name === blockName ) {
					updateBlockAttributes(
						item.clientId,
						newAttributes
					);
				}
			} );
		} );
	};

	const onChangeAlignment = ( alignment ) => {
		setAttributes( { alignment } );
		updateInnerAttributes( 'coblocks/service', { alignment } );
	};

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/service', { headingLevel } );
	};

	const toggleCtas = () => {
		const buttons = ! attributes.buttons;
		setAttributes( { buttons } );

		updateInnerAttributes( 'coblocks/service', { showCta: buttons } );
	};

	const setColumns = ( value ) => {
		setBlocksPropagated( false );
		setAttributes( { columns: parseInt( value ) } );
	};

	/* istanbul ignore next */
	useEffect( () => {
		const activeStyle = getActiveStyle( layoutOptions, attributes.className );
		return () => {
			const lastActiveStyle = getActiveStyle(
				layoutOptions,
				attributes.className
			);

			if ( activeStyle !== lastActiveStyle ) {
				if ( 'circle' === activeStyle.name && ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ) {
					onChangeAlignment( 'center' );
				}
			}
		};
	}, [ attributes.className ] );

	const [ blocksPropagated, setBlocksPropagated ] = useState( false );

	/* istanbul ignore next */
	useEffect( () => {
		// Block has been removed by user, decrement block count.
		if ( blocksPropagated && innerBlocks.length < attributes.columns ) {
			setColumns( columns - ( attributes.columns - innerBlocks.length ) );
			setBlocksPropagated( true );
		}
	}, [ innerBlocks.length, blocksPropagated ] );

	/* istanbul ignore next */
	useEffect( () => {
		const { columns } = attributes;
		// Add service-column when column count is increased.
		if ( innerBlocks.length < columns ) {
			const blockToInsert = () => {
				const removedBlock = removedColumns?.[ 0 ];
				if ( ! removedBlock ) {
					return createBlock( 'coblocks/service-column' );
				}

				const shiftedRemovedColumns = removedColumns;
				shiftedRemovedColumns.shift();

				setRemovedColumns( shiftedRemovedColumns );
				return removedBlock;
			};

			if ( ! blocksPropagated ) {
				insertBlock(
					blockToInsert(),
					innerBlocks.length + 1,
					clientId,
					false,
				);
			}
		}

		// Remove service-column when column count is reduced.
		if ( innerBlocks.length > columns ) {
			const targetBlock = innerBlocks[ innerBlocks.length - 1 ];
			if ( targetBlock ) {
				const unshiftedRemovedColumns = removedColumns;
				unshiftedRemovedColumns.unshift( targetBlock );

				setRemovedColumns( unshiftedRemovedColumns );
				removeBlock( targetBlock.clientId, false );
			}
		}

		// useEffect logic should now have all blocks in place.
		if ( innerBlocks.length === attributes.columns ) {
			setBlocksPropagated( true );
		}
	}, [ attributes.columns, innerBlocks.length ] );

	/* istanbul ignore next */
	useEffect( () => {
		// Check for existence of service blocks to migrate to service-columns
		if ( innerBlocks.length ) {
			const serviceBlocks = innerBlocks.filter( ( block ) => block.name === 'coblocks/service' );
			const migrateToServiceColumns = !! serviceBlocks.length;

			if ( migrateToServiceColumns ) {
				const newServiceColumnsBlocks = serviceBlocks.map( ( serviceBlock ) => {
					const newServiceBlocks = createBlock( serviceBlock.name, serviceBlock.attributes, [ ...serviceBlock.innerBlocks ] );
					return createBlock( 'coblocks/service-column', {}, [ newServiceBlocks ] );
				} );
				replaceBlocks( serviceBlocks.map( ( block ) => block.clientId ), newServiceColumnsBlocks, 0 );
			}
		}
	}, [ innerBlocks.length ] );

	const {	alignment, columns } = attributes;

	const classes = classnames(
		'has-columns', {
			[ `has-${ columns }-columns` ]: columns,
			'has-responsive-columns': columns > 1,
		}
	);

	const activeStyle = getActiveStyle( layoutOptions, className );

	return (
		<Fragment>
			<BlockControls>
				<HeadingToolbar
					minLevel={ 2 }
					maxLevel={ 6 }
					selectedLevel={ attributes.headingLevel }
					onChange={ onChangeHeadingLevel }
				/>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				activeStyle={ activeStyle }
				layoutOptions={ layoutOptions }
				onToggleCtas={ toggleCtas }
				onUpdateStyle={ updateStyle }
				onSetColumns={ setColumns }
			/>
			<div className={ className }>
				<GutterWrapper { ...attributes } >
					<div className={ classes }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							orientation={ 'horizontal' }
							templateInsertUpdatesSelection={ false }
							__experimentalCaptureToolbars={ true }
						/>
					</div>
				</GutterWrapper>
			</div>
		</Fragment>
	);
};

export default Edit;
