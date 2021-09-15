/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';

const CoBlocksFieldOption = ( props ) => {
	const {
		isInFocus,
		index,
		onAddOption,
		isSelected,
		option,
		type,
	} = props;

	const textInput = useRef( null );

	useEffect( () => {
		if ( isInFocus ) {
			textInput.current.focus();
		}
	}, [ isInFocus ] );

	const onChangeOption = ( event ) => {
		props.onChangeOption( index, event.target.value );
	};

	const onKeyPress = ( event ) => {
		if ( event.key === 'Enter' ) {
			onAddOption( index );
			event.preventDefault();
			return;
		}

		if ( event.key === 'Backspace' && event.target.value === '' ) {
			props.onChangeOption( index );
			event.preventDefault();
		}
	};

	const onDeleteOption = () => {
		props.onChangeOption( index );
	};

	return (
		<li className="coblocks-option">
			{ type && type !== 'select' && (
				<input className="coblocks-option__type" type={ type } disabled />
			) }
			{ ! isSelected && type && type !== 'select' && (
				option
			) }
			{ isSelected && (
				<>
					<input
						type="text"
						className="coblocks-option__input"
						value={ option }
						placeholder={ __( 'Write option…', 'coblocks' ) }
						onChange={ onChangeOption }
						onKeyDown={ onKeyPress }
						ref={ textInput }
					/>
					<Button
						className="coblocks-option__remove"
						icon="trash"
						label={ __( 'Remove Option', 'coblocks' ) }
						onClick={ onDeleteOption }
					/>
				</>
			) }
		</li>
	);
};

export default CoBlocksFieldOption;
