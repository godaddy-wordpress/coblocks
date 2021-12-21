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
import { Component } from '@wordpress/element';
import { ToolbarGroup } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

class HeadingToolbar extends Component {
	createLevelControl( targetLevel, selectedLevel, onChange ) {
		const isActive = targetLevel === selectedLevel;

		return {
			icon: <HeadingLevelIcon isPressed={ isActive } level={ targetLevel } />,
			isActive,
			onClick: () => onChange( targetLevel ),
			// translators: %s: heading level e.g: "1", "2", "3"
			title: sprintf( __( 'Heading %d', 'coblocks' ), targetLevel ),
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
			<ToolbarGroup
				controls={ range( minLevel, maxLevel ).map( ( index ) =>
					this.createLevelControl( index, selectedLevel, onChange )
				) }
				icon={ <HeadingLevelIcon level={ selectedLevel } /> }
				isCollapsed={ isCollapsed }
				label={ __( 'Change heading level', 'coblocks' ) }
			/>
		);
	}
}

export default HeadingToolbar;
