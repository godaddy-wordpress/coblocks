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

/**
 * Internal dependencies
 */
import { categories } from './image-categories.json';

const LayoutSelectorSidebarDropdown = ( { imageCategory, setImageCategory } ) => {
	const [ isVisible, setVisible ] = useState( false );

	const toggleVisible = () => setVisible( ! isVisible );
	const buttonSlug = categories.filter( ( { name } ) => name === imageCategory )?.[ 0 ]?.slug || '<none>';

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
						{ categories.map( ( { name, slug } ) => {
							return (
								<MenuItem key={ `image-category-${ name }` } onClick={ () => setImageCategory( name ) }>
									{ slug }
								</MenuItem>
							);
						} ) }
					</MenuGroup>
				</Popover>
			) }
		</>
	);
};

export default LayoutSelectorSidebarDropdown;
