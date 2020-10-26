/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { chevronDown } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Button, Icon, MenuGroup, MenuItem, Popover } from '@wordpress/components';

const ImageCategorySelector = ( { imageCategory, setImageCategory, imageCategories } ) => {
	const [ isVisible, setVisible ] = useState( false );
	const toggleVisible = () => setVisible( ! isVisible );
	const buttonSlug = imageCategories.filter( ( { slug } ) => slug === imageCategory )?.[ 0 ]?.name || '<none>';

	return (
		<>
			<span>{ __( 'My site is about:', 'coblocks' ) }</span>
			<Button
				className="coblocks-layout-selector__dropdown"
				onClick={ () => toggleVisible() }
			>
				{ buttonSlug }
				<Icon
					icon={ chevronDown }
					className={ classnames(
						'chevron', {
							'is-open': isVisible,
						}
					) }
				/>
			</Button>
			{ isVisible && (
				<Popover
					className="coblocks-layout-selector__pop"
					focusOnMount="container"
					onClose={ () => setVisible( false ) }
					noArrow="false"
				>
					<MenuGroup>
						{ imageCategories.map( ( { name, slug } ) => {
							return (
								<MenuItem key={ `image-category-${ slug }` } onClick={ () => setImageCategory( slug ) }>
									{ name }
								</MenuItem>
							);
						} ) }
					</MenuGroup>
				</Popover>
			) }
		</>
	);
};

export default ImageCategorySelector;
