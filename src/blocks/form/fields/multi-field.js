/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from './field-label';
import CoBlocksFieldOption from './coblocks-option';

const CoBlocksFieldMultiple = ( props ) => {
	const {
		setAttributes,
		type,
		instanceId,
		required,
		label,
		isSelected,
		isInline,
		textColor,
		customTextColor,
		name,
	} = props;

	// from original component
	let { options } = props;
	if ( ! options.length ) {
		options = [ '' ];
	}

	const [ inFocus, setInFocus ] = useState( 0 );

	const onChangeOption = ( key = null, option = null ) => {
		const newOptions = options.slice( 0 );
		if ( null === option ) {
			// Remove a key
			newOptions.splice( key, 1 );
			if ( key > 0 ) {
				setInFocus( key - 1 );
			}
		} else {
			// update a key
			newOptions.splice( key, 1, option );
			setInFocus( key );
		}
		setAttributes( { options: newOptions } );
	};

	const addNewOption = ( key = null ) => {
		const newOptions = options.slice( 0 );
		let newInFocus = 0;
		if ( 'object' === typeof key ) {
			newOptions.push( '' );
			newInFocus = newOptions.length - 1;
		} else {
			newOptions.splice( key + 1, 0, '' );
			newInFocus = key + 1;
		}

		setInFocus( newInFocus );
		setAttributes( { options: newOptions } );
	};

	return (
		<>
			<BaseControl
				id={ `coblocks-field-multiple-${ instanceId }` }
				className="coblocks-field coblocks-field-multiple"
				label={
					<CoBlocksFieldLabel
						required={ required }
						label={ label }
						setAttributes={ setAttributes }
						isSelected={ isSelected }
						resetFocus={ () => setInFocus( null ) }
						textColor={ textColor }
						customTextColor={ customTextColor }
						name={ name }
					/>
				}
			>
				{ ! isSelected && 'select' === type ? (
					<select>
						{ options.map( ( option, index ) => (
							<option value={ option } key={ index }>{ option }</option>
						) ) }
					</select>
				) : (
					<ol
						className={
							classnames(
								'coblocks-field-multiple__list',
								{ 'is-inline': isInline }
							) }
						id={ `coblocks-field-multiple-${ instanceId }` }
					>
						{ options.map( ( option, index ) => (
							<CoBlocksFieldOption
								type={ type }
								key={ index }
								option={ option }
								index={ index }
								onChangeOption={ onChangeOption }
								onAddOption={ addNewOption }
								isInFocus={ index === inFocus && isSelected }
								isSelected={ isSelected }
							/>
						) ) }
					</ol>
				) }
				{ isSelected && (
					<Button
						className="coblocks-field-multiple__add-option"
						icon="insert"
						label={ 'radio' === type || 'select' === type ? __( 'Add option', 'coblocks' ) : __( 'Add checkbox', 'coblocks' ) }
						onClick={ addNewOption }
					>
						{ 'radio' === type || 'select' === type ? __( 'Add option', 'coblocks' ) : __( 'Add checkbox', 'coblocks' ) }
					</Button>
				) }
			</BaseControl>
		</>
	);
};

export default withInstanceId( CoBlocksFieldMultiple );
