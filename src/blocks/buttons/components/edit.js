/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;
const { Spinner } = wp.components;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight', ];

const TEMPLATE = [
	[ 'coblocks/button', { hasContentAlign: false } ],
];

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			backgroundColor,
			textColor,
			customTextColor,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			coblocks,
			gutter,
		} = attributes;

		const classes = classnames(
			className, {
				[ `coblocks-buttons-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-buttons__inner'
		);

		const innerStyles = {
		};

		return [
			<Fragment>
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	// applyWithColors,
] )( Edit );
