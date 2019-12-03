/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { Component, createRef, Fragment } from '@wordpress/element';

class CoBlocksFieldOption extends Component {
	constructor( ...args ) {
		super( ...args );
		this.onChangeOption = this.onChangeOption.bind( this );
		this.onKeyPress = this.onKeyPress.bind( this );
		this.onDeleteOption = this.onDeleteOption.bind( this );
		this.textInput = createRef();
	}

	componentDidMount() {
		if ( this.props.isInFocus ) {
			this.textInput.current.focus();
		}
	}

	componentDidUpdate() {
		if ( this.props.isInFocus ) {
			this.textInput.current.focus();
		}
	}

	onChangeOption( event ) {
		this.props.onChangeOption( this.props.index, event.target.value );
	}

	onKeyPress( event ) {
		if ( event.key === 'Enter' ) {
			this.props.onAddOption( this.props.index );
			event.preventDefault();
			return;
		}

		if ( event.key === 'Backspace' && event.target.value === '' ) {
			this.props.onChangeOption( this.props.index );
			event.preventDefault();
		}
	}

	onDeleteOption() {
		this.props.onChangeOption( this.props.index );
	}

	render() {
		const { isSelected, option, type } = this.props;
		return (
			<li className="coblocks-option">
				{ type && type !== 'select' && (
					<input className="coblocks-option__type" type={ type } disabled />
				) }
				{ ! isSelected && type && type !== 'select' && (
					option
				) }
				{ isSelected && (
					<Fragment>
						<input
							type="text"
							className="coblocks-option__input"
							value={ option }
							placeholder={ __( 'Write option…', 'coblocks' ) }
							onChange={ this.onChangeOption }
							onKeyDown={ this.onKeyPress }
							ref={ this.textInput }
						/>
						<IconButton
							className="coblocks-option__remove"
							icon="trash"
							label={ __( 'Remove Option', 'coblocks' ) }
							onClick={ this.onDeleteOption }
						/>
					</Fragment>
				) }
			</li>
		);
	}
}

export default CoBlocksFieldOption;
