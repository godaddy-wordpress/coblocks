/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, InnerBlocks, withFontSizes } = wp.editor;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight', ];

const TEMPLATE = [
	[ 'core/heading', { placeholder: __( 'Add title...' ), content: __( 'Feature' ), level: 3 } ],
	[ 'core/paragraph', { placeholder: __( 'Add feature content...' ), content: __( 'This is a feature block that you may use to highlight features.' ), } ]
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
			className,
		} = this.props;
		
		return [
			<Fragment>
				<div className={ className } >
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</Fragment>
		];
	}
}

export default Edit;
