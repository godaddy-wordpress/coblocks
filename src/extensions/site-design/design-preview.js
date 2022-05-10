/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { Animations } from '../../components/common/index.js';
import STORE_KEY from './data/constants';

function DesignPreviews() {
	const designStyle = useSelect( ( select ) => select( STORE_KEY ).getDesignStyle(), [] );
	const designStyles = useSelect( ( select ) => select( STORE_KEY ).getDesignStyles(), [] );
	const designsPanelOpen = useSelect( ( select ) => select( STORE_KEY ).isDesignsPanelOpen(), [] );
	const currentColors = useSelect( ( select ) => select( STORE_KEY ).getCurrentColors(), [] );
	const isUpdating = useSelect( ( select ) => select( STORE_KEY ).isUpdating(), [] );
	const activeStyle = designStyles?.find( ( item ) => item.slug === designStyle );

	const { updateDesign, toggleDesignsPanel } = useDispatch( STORE_KEY );

	const onUpdateDesign = ( style ) => {
		if ( style === designStyle ) {
			return;
		}

		updateDesign( { designStyle: style } );
	};

	const renderColors = ( palettes, index ) => {
		const displayedColors = [ palettes.tertiary, palettes.secondary, palettes.primary ];

		return (
			<div className="components-site-design-designs__design__colors">
				{
					displayedColors.map( ( color, colorIndex ) => (
						<li
							className="components-site-design-designs__design__color"
							key={ `components-site-design-designs__design__color-${ index }-${ colorIndex }` }
							style={ { backgroundColor: color } }>
						</li>
					) )
				}
			</div>
		);
	};

	return (
		<>
			<PanelBody
				className="site-design--designs__panel components-site-design-designs"
				onToggle={ toggleDesignsPanel }
				opened={ designsPanelOpen }
				title={ __( 'Design Styles', 'coblocks' ) }>
				<p>{ __( 'Easily explore curated design styles, then customize your colors and fonts to get the perfect fit.', 'coblocks' ) }</p>
				<Animations.Trail>
					{
						designStyles && designStyles.map( ( style, index ) => {
							return (
								<button
									className={ classnames(
										'components-site-design-designs__design', {
											'components-site-design-designs__design--selected': style.slug === designStyle,
											'components-site-design-designs__design--updating': isUpdating,
										},
									) }
									data-test={ `design-button-${ style.slug }` }
									key={ `design-button-${ style.slug }` }
									onClick={ () => onUpdateDesign( style.slug ) }>
									<div className="components-site-design-designs__design__content">
										<div
											className="components-site-design-designs__design__label"
											style={ { fontFamily: Object.entries( style.fonts )[ 0 ][ 0 ] } }>
											{ style.label }
										</div>
										{ renderColors( style.slug === designStyle && ! isUpdating ? currentColors : style.palettes[ 0 ][ 1 ], index ) }
									</div>
								</button>
							);
						} )
					}
				</Animations.Trail>
			</PanelBody>
			{ ( ! designsPanelOpen && !! activeStyle ) &&
				<div className="components-site-design-design components-panel__body is-opened">
					<button
						className="components-site-design-designs__design components-site-design-designs__design--current"
						onClick={ toggleDesignsPanel }>
						<div className="components-site-design-designs__design__content">
							<div
								className="components-site-design-designs__design__label"
								style={ { fontFamily: Object.entries( activeStyle.fonts )[ 0 ][ 0 ] } }>
								{ activeStyle.label }
							</div>
							{ renderColors( currentColors, 9999 ) }
						</div>
					</button>
				</div>
			}
		</>
	);
}

export default DesignPreviews;
