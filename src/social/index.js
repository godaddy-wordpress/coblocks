// Import CSS.
import './editor.scss';
import './style.scss';

// External Dependencies.
import classnames from 'classnames';

// Internal Dependencies.
const { __ } = wp.i18n;

const {
	Toolbar,
	PanelColor,
	Dashicon,
	RangeControl,
	ToggleControl,
	SelectControl,
} = wp.components;

const {
	registerBlockType,
	InspectorControls,
	ColorPalette,
	BlockControls,
	AlignmentToolbar,
} = wp.blocks;

registerBlockType( 'coblocks/social', {

	title: __( 'Social ' ),

	description: __( 'Add a social sharing element to your post.' ),

	icon: 'share',

	category: 'common',

	keywords: [
		__( 'share' ),
		__( 'twitter' ),
		__( 'coblocks' ),
	],

	supports: {
		customClassName: false,
		html: false,
	},

	edit( { className, attributes, setAttributes, isSelected } ) {

		const { twitter, facebook, pinterest, tumblr, linkedin, align, backgroundColor } = attributes;

		const iconStyle = {
			backgroundColor: backgroundColor,
		};

		const inspectorControls = isSelected && (
			<InspectorControls key="inspector">
				<ToggleControl
					label={ __( 'Twitter' ) }
					checked={ !! twitter }
					onChange={ () => setAttributes( {  twitter: ! twitter } ) }
				/>
				<ToggleControl
					label={ __( 'Facebook' ) }
					checked={ !! facebook }
					onChange={ () => setAttributes( {  facebook: ! facebook } ) }
				/>
				<ToggleControl
					label={ __( 'LinkedIn' ) }
					checked={ !! linkedin }
					onChange={ () => setAttributes( {  linkedin: ! linkedin } ) }
				/>
				<ToggleControl
					label={ __( 'Pinterest' ) }
					checked={ !! pinterest }
					onChange={ () => setAttributes( {  pinterest: ! pinterest } ) }
				/>
				<ToggleControl
					label={ __( 'Tumblr' ) }
					checked={ !! tumblr }
					onChange={ () => setAttributes( {  tumblr: ! tumblr } ) }
				/>
				<PanelColor title={ __( 'Icon Color' ) } colorValue={ backgroundColor }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);

		const controls = isSelected && (
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ align }
					onChange={ ( newAlignment ) => setAttributes( { align: newAlignment } ) }
					controls={ [ 'left', 'center', 'right' ] }
				/>
			</BlockControls>
		);

		return [
			controls,
			inspectorControls,
			<div className={ className } style={ { textAlign: align } }>

				<p>
					{ twitter &&
						<a className={ 'wp-block-coblocks-social__button button--twitter icon--coblocks' } style={ iconStyle }>
							<span className={ 'screen-reader-text' }>
								{ __( 'Share on Twitter' ) }
							</span>
						</a>
					}

					{ facebook &&
						<a className={ 'wp-block-coblocks-social__button button--facebook icon--coblocks' } style={ iconStyle }>
							<span className={ 'screen-reader-text' }>
								{ __( 'Share on Facebook' ) }
							</span>
						</a>
					}

					{ pinterest &&
						<a className={ 'wp-block-coblocks-social__button button--pinterest icon--coblocks' } style={ iconStyle }>
							<span className={ 'screen-reader-text' }>
								{ __( 'Share on Pinterest' ) }
							</span>
						</a>
					}

					{ linkedin &&
						<a className={ 'wp-block-coblocks-social__button button--linkedin icon--coblocks' } style={ iconStyle }>
							<span className={ 'screen-reader-text' }>
								{ __( 'Share on LinkedIn' ) }
							</span>
						</a>
					}

					{ tumblr &&
						<a className={ 'wp-block-coblocks-social__button button--tumblr icon--coblocks' } style={ iconStyle }>
							<span className={ 'screen-reader-text' }>
								{ __( 'Share on Tumblr' ) }
							</span>
						</a>
					}
				</p>
			</div>
		];
	},

	save( { attributes, className } ) {
	},
} );
