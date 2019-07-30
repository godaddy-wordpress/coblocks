/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import ResizableSpacerTransforms from './transforms';

/**
 * Export
 */
export {
	ResizableSpacerTransforms,
};

/**
 * WordPress dependencies
 */
const { ResizableBox } = wp.components;
const { Component } = wp.element;

/**
 * ResizableSpacer Component
 */
class ResizableSpacer extends Component {
	constructor( props ) {
		super( ...arguments );
		this.setActiveStateClass = this.setActiveStateClass.bind( this );
		this.onResizeStart = this.onResizeStart.bind( this );
		this.onResizeStop = this.onResizeStop.bind( this );

		if ( props.type === 'heading' ) {
			this.state = {
				spacerHeading: false,
			};
		}

		if ( props.type === 'content' ) {
			this.state = {
				spacerContent: false,
			};
		}

		if ( props.type === 'button' ) {
			this.state = {
				spacerButton: false,
			};
		}

		if ( props.type === 'image' ) {
			this.state = {
				spacerImage: false,
			};
		}
	}

	setActiveStateClass() {
		if ( this.props.type === 'heading' ) {
			return this.state.spacerHeading;
		}

		if ( this.props.type === 'content' ) {
			return this.state.spacerContent;
		}

		if ( this.props.type === 'button' ) {
			return this.state.spacerButton;
		}

		if ( this.props.type === 'image' ) {
			return this.state.spacerImage;
		}
	}

	onResizeStart() {
		if ( this.props.type === 'heading' ) {
			return this.setState( { spacerHeading: true } );
		}

		if ( this.props.type === 'content' ) {
			return this.setState( { spacerContent: true } );
		}

		if ( this.props.type === 'button' ) {
			return this.setState( { spacerButton: true } );
		}

		if ( this.props.type === 'image' ) {
			return this.setState( { spacerImage: true } );
		}
	}

	onResizeStop( delta ) {
		if ( this.props.type === 'heading' ) {
			this.setState( { spacerHeading: false } );
			this.props.setAttributes( {
				spacerHeading: parseInt( this.props.attribute + delta.height, 10 ),
			} );
		}

		if ( this.props.type === 'content' ) {
			this.setState( { spacerContent: false } );
			this.props.setAttributes( {
				spacerContent: parseInt( this.props.attribute + delta.height, 10 ),
			} );
		}

		if ( this.props.type === 'button' && this.props.orientation === 'horizontal' ) {
			this.setState( { spacerButton: false } );
			this.props.setAttributes( {
				spacerButton: parseInt( this.props.attribute + delta.width, 10 ),
			} );
		}

		if ( this.props.type === 'button' && this.props.orientation === 'vertical' ) {
			this.setState( { spacerButton: false } );
			this.props.setAttributes( {
				spacerButton: parseInt( this.props.attribute + delta.height, 10 ),
			} );
		}

		if ( this.props.type === 'image' ) {
			this.setState( { spacerImage: false } );
			this.props.setAttributes( {
				spacerImage: parseInt( this.props.attribute + delta.height, 10 ),
			} );
		}
	}

	render() {
		const {
			toggleSelection,
		} = this.props;

		return (
			<ResizableBox
				size={ {
					height: this.props.orientation === 'horizontal' ? '100%' : this.props.attribute,
					width: this.props.orientation === 'vertical' ? '100%' : this.props.attribute,
				} }
				className={ classnames(
					'components-coblocks__resizablebox-spacer', {
						'is-active': this.setActiveStateClass(),
						'is-horizontal': this.props.orientation === 'horizontal',
					}
				) }
				minHeight={ this.props.minHeight ? this.props.minHeight : undefined }
				maxHeight={ this.props.maxHeight ? this.props.maxHeight : undefined }
				minWidth={ this.props.minWidth ? this.props.minWidth : undefined }
				maxWidth={ this.props.maxWidth ? this.props.maxWidth : undefined }
				enable={ {
					bottom: this.props.orientation === 'vertical' ? true : false,
					top: this.props.orientation === 'vertical' ? true : false,
					left: this.props.orientation === 'horizontal' ? true : false,
					right: this.props.orientation === 'horizontal' ? true : false,
				} }
				onResizeStop={ ( _event, _direction, _elt, delta ) => {
					toggleSelection( true );
					this.onResizeStop( delta );
				} }
				onResizeStart={ () => {
					toggleSelection( false );
					this.onResizeStart();
				} }
			>
			</ResizableBox>
		);
	}
}

export default ResizableSpacer;
