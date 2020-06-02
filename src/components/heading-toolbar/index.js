/**
 * External dependencies
 */
import { range } from 'lodash';

/**
 * Internal dependencies.
 */
import HeadingLevelIcon from './icon';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';

class HeadingToolbar extends Component {
	createLevelControl( targetLevel, selectedLevel, onChange ) {
		const isActive = targetLevel === selectedLevel;

		return {
			icon: <HeadingLevelIcon level={ targetLevel } isPressed={ isActive } />,
			// translators: %s: heading level e.g: "1", "2", "3"
			title: sprintf( __( 'Heading %d', 'coblocks' ), targetLevel ),
			isActive,
			onClick: () => onChange( targetLevel ),
		};
	}

	render() {
		const {
			isCollapsed = true,
			minLevel,
			maxLevel,
			selectedLevel,
			onChange,
		} = this.props;

		return (
			<Toolbar
				isCollapsed={ isCollapsed }
				icon={ <HeadingLevelIcon level={ selectedLevel } /> }
				controls={ range( minLevel, maxLevel ).map( ( index ) =>
					this.createLevelControl( index, selectedLevel, onChange )
				) }
				label={ __( 'Change heading level' ) }
			/>
		);
	}
}

export default HeadingToolbar;
