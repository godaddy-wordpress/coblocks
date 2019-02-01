/**
 * Internal dependencies
 */
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight', ];

const TEMPLATE = [
	[ 'coblocks/icon', { hasContentAlign: false } ],
	[ 'core/heading', { placeholder: _x( 'Add feature title...', 'content placeholder' ), content: _x( 'Feature Title', 'content placeholder' ), level: 4 } ],
	[ 'core/paragraph', { placeholder: _x( 'Add feature content', 'content placeholder' ), content: _x( 'This is a feature block that you can use to highlight features.', 'content placeholder' ), } ]
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
			isSelected,
			className,
			attributes,
		} = this.props;

		const {
			contentAlign,
		} = attributes;

		return [
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<div className={ className } style={ { textAlign: contentAlign } } >
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</Fragment>
		];
	}
}

export default Edit;
