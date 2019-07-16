/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Tooltip, ButtonGroup, Button } = wp.components;

/**
 * Responsive Controls Component
 */
class OrientationControl extends Component {
	render() {
		const {
			label,
			help,
			onHorizontalFlip,
			onVerticalFlip,
			verticalFlip,
			horizontalFlip,
		} = this.props;

		const labelClasses = classnames(
			'components-base-control__label',
			'components-coblocks-orientation__label', {}
		);

		const helpClasses = classnames(
			'components-base-control__help',
			'components-coblocks-orientation__help', {}
		);

		return (
			<Fragment>
				{ label && <span className={ labelClasses }>{ label }</span> }
				<div className="components-coblocks-orientation">
					<ButtonGroup aria-label={ __( 'Select Orientation' ) }>
						<Tooltip text={ __( 'Flip vertically' ) }>
							<Button
								key={ 'vertical' }
								isLarge
								isPrimary={ !! verticalFlip }
								aria-pressed={ !! verticalFlip }
								onClick={ () => onVerticalFlip( !! verticalFlip ) }
							>
								{ icons.flipY }
							</Button>
						</Tooltip>
						<Tooltip text={ __( 'Flip horiztonally' ) }>
							<Button
								key={ 'horizontal' }
								isLarge
								isPrimary={ horizontalFlip }
								aria-pressed={ horizontalFlip }
								onClick={ () => onHorizontalFlip( horizontalFlip ) }
							>
								{ icons.flipX }
							</Button>
						</Tooltip>
					</ButtonGroup>
					{ help && <p className={ helpClasses }>{ help }</p> }
				</div>
			</Fragment>
		);
	}
}

export default OrientationControl;
