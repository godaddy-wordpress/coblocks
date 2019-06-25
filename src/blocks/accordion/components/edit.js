/**
 * External dependencies
 */
import times from 'lodash/times';
import classnames from 'classnames';
import memoize from 'memize';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { Button, IconButton } = wp.components;
const { createBlock } = wp.blocks;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'coblocks/accordion-item' ];

/**
 * Returns the layouts configuration for a given number of accordion items.
 *
 * @param {number} count Number of accordion items.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/accordion-item' ] );
} );

/**
 * Block edit function
 */
class Edit extends Component {

	render() {

		const {
			clientId,
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			count,
		} = attributes;

		const items = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId );

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div className={ className }>
					<InnerBlocks
						template={ getCount( count ) }
						allowedBlocks={ ALLOWED_BLOCKS } />

						<div className="components-coblocks-add-accordion-item">
							<IconButton
								isLarge
								className="components-coblocks-add-accordion-item__button"
								label={ __( 'Add Accordion Item' ) }
								icon="insert"
								onClick={ () => {
									if ( items[0].innerBlocks ) {
										let lastId 	   = items[0].innerBlocks[ items[0].innerBlocks.length - 1 ].clientId;
										let copyAttributes = {};

										if( lastId ){
											const lastBlockClient 	= wp.data.select( 'core/editor' ).getBlockAttributes( lastId );
											if( lastBlockClient.backgroundColor ){
												copyAttributes = Object.assign( copyAttributes, {
													backgroundColor: lastBlockClient.backgroundColor
												} );
											}

											if( lastBlockClient.borderColor ){
												copyAttributes = Object.assign( copyAttributes, {
													borderColor: lastBlockClient.borderColor
												} );
											}

											if( lastBlockClient.textColor ){
												copyAttributes = Object.assign( copyAttributes, {
													textColor: lastBlockClient.textColor
												} );
											}

											if( lastBlockClient.customTextColor ){
												copyAttributes = Object.assign( copyAttributes, {
													customTextColor: lastBlockClient.customTextColor
												} );
											}
										}

										let created = createBlock( 'coblocks/accordion-item', copyAttributes );
										wp.data.dispatch( 'core/editor' ).insertBlock( created , undefined, clientId );
									}
								} } >
								{ __( 'Add Accordion Item' ) }
							</IconButton>
						</div>
				</div>
			</Fragment>
		];
	}
}

export default Edit;
