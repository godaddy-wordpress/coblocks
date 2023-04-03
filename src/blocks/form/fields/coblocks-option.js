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
		// eslint-disable-next-line react/destructuring-assignment
		props.onChangeOption( index, event.target.value );
	};

	const onKeyPress = ( event ) => {
		if ( event.key === 'Enter' ) {
			onAddOption( index );
			event.preventDefault();
			return;
		}

		if ( event.key === 'Backspace' && event.target.value === '' ) {
			// eslint-disable-next-line react/destructuring-assignment
			props.onChangeOption( index );
			event.preventDefault();
		}
	};

	const onDeleteOption = () => {
		// eslint-disable-next-line react/destructuring-assignment
		props.onChangeOption( index );
	};

	return (
		<li className="coblocks-option">
			{ type && type !== 'select' && (
				<input className="coblocks-option__type" disabled type={ type } />
			) }
			{ ! isSelected && type && type !== 'select' && (
				option
			) }
			{ isSelected && (
				<>
					<input
						className="coblocks-option__input"
						onChange={ onChangeOption }
						onKeyDown={ onKeyPress }
						placeholder={ __( 'Write option…', 'coblocks' ) }
						ref={ textInput }
						type="text"
						value={ option }
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
