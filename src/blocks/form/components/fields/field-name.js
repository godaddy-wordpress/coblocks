/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls, RichText } from '@wordpress/editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoblocksFieldLabel from './field-label';

function CoblocksFieldName( {
	isSelected,
	type,
	required,
	label,
	setAttributes,
	placeholder,
	hasLastName,
	labelFirstName,
	labelLastName,
} ) {
	return (
		<Fragment>
			<div className={
				classnames(
					'coblocks-field',
					`coblocks-field--${ type }`,
					{ 'is-selected': isSelected }
				) }
			>
				<CoblocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
				{ hasLastName ?
					<div className="name-wrap">
						<div className="wrap">
							<TextControl className="coblocks-field"/>
								<RichText
									tagName="small"
									className={ classnames(
										'subtext',
										`name-wrap__first`,
									) }
									value={ labelFirstName }
									onChange={ value => {
										setAttributes( { labelFirstName: value } );
									} }
									placeholder={ __( 'Add label…' ) }
								/>
						</div>
						<div className="wrap">
							<TextControl className="coblocks-field"/>
							<RichText
								tagName="small"
								className={ classnames(
									'subtext',
									`name-wrap__first`,
								) }
								value={ labelLastName }
								onChange={ value => {
									setAttributes( { labelLastName: value } );
								} }
								placeholder={ __( 'Add label…' ) }
							/>
						</div>
					</div>
				:
					<TextControl/>
				}
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Name Field Settings' ) }>
					<ToggleControl
						label={ __( 'Last Name' ) }
						className="coblocks-field-label__required"
						checked={ hasLastName }
						onChange={ value => setAttributes( { hasLastName: value } ) }
						help={ !! hasLastName ? __( 'Showing both first and last name fields.' ) : __( 'Toggle to add a last name field.' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default CoblocksFieldName;
