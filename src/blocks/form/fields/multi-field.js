/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, IconButton } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from './field-label';
import CoBlocksFieldOption from './coblocks-option';

class CoBlocksFieldMultiple extends Component {
	constructor( ...args ) {
		super( ...args );
		this.onChangeOption = this.onChangeOption.bind( this );
		this.addNewOption = this.addNewOption.bind( this );
		this.state = { inFocus: null };
	}

	onChangeOption( key = null, option = null ) {
		const newOptions = this.props.options.slice( 0 );
		if ( null === option ) {
			// Remove a key
			newOptions.splice( key, 1 );
			if ( key > 0 ) {
				this.setState( { inFocus: key - 1 } );
			}
		} else {
			// update a key
			newOptions.splice( key, 1, option );
			this.setState( { inFocus: key } ); // set the focus.
		}
		this.props.setAttributes( { options: newOptions } );
	}

	addNewOption( key = null ) {
		const newOptions = this.props.options.slice( 0 );
		let inFocus = 0;
		if ( 'object' === typeof key ) {
			newOptions.push( '' );
			inFocus = newOptions.length - 1;
		} else {
			newOptions.splice( key + 1, 0, '' );
			inFocus = key + 1;
		}

		this.setState( { inFocus: inFocus } );
		this.props.setAttributes( { options: newOptions } );
	}

	render() {
		const { type, instanceId, required, label, setAttributes, isSelected, isInline } = this.props;
		let { options } = this.props;
		let { inFocus } = this.state;
		if ( ! options.length ) {
			options = [ '' ];
			inFocus = 0;
		}

		return (
			<Fragment>
				<BaseControl
					id={ `coblocks-field-multiple-${ instanceId }` }
					className="coblocks-field coblocks-field-multiple"
					label={
						<CoBlocksFieldLabel
							required={ required }
							label={ label }
							setAttributes={ setAttributes }
							isSelected={ isSelected }
							resetFocus={ () => this.setState( { inFocus: null } ) }
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
									onChangeOption={ this.onChangeOption }
									onAddOption={ this.addNewOption }
									isInFocus={ index === inFocus && isSelected }
									isSelected={ isSelected }
								/>
							) ) }
						</ol>
					) }
					{ isSelected && (
						<IconButton
							className="coblocks-field-multiple__add-option"
							icon="insert"
							label={ 'radio' === type || 'select' === type ? __( 'Add Option', 'coblocks' ) : __( 'Add Checkbox', 'coblocks' ) }
							onClick={ this.addNewOption }
						>
							{ 'radio' === type || 'select' === type ? __( 'Add Option', 'coblocks' ) : __( 'Add Checkbox', 'coblocks' ) }
						</IconButton>
					) }
				</BaseControl>
			</Fragment>
		);
	}
}

export default withInstanceId( CoBlocksFieldMultiple );
