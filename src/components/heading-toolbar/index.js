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
import { BaseControl, Toolbar } from '@wordpress/components';

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
		const { minLevel, maxLevel, selectedLevel, onChange } = this.props;
		return (
			<BaseControl
				label={ __( 'Heading Level', 'coblocks' ) }
				id="components-coblocks-heading-level"
				className="components-coblocks-heading-toolbar"
			>
				<Toolbar
					icon={ <HeadingLevelIcon level={ selectedLevel } /> }
					controls={ range( minLevel, maxLevel ).map( ( index ) =>
						this.createLevelControl( index, selectedLevel, onChange )
					) }
				/>
			</BaseControl>
		);
	}
}

export default HeadingToolbar;
