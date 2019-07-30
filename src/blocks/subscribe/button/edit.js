/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {compose} = wp.compose;
const {Component, Fragment} = wp.element;
const {Button, TextControl} = wp.components;

/**
 * Block edit function
 */
class Edit extends Component {

    constructor(props) {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            className,
            isSelected,
            setAttributes,
            backgroundColor,
            textColor,
        } = this.props;

        const {
            buttonLabel,
        } = attributes;

        return [
            <Fragment>
                {isSelected && (
                    <Inspector
                        {...this.props}
                    />
                )}
                <Button
                    className={classnames('sign-up-button', {
                        'has-background': backgroundColor.color,
                        'has-text-color': textColor.color,
                        [backgroundColor.class]: backgroundColor.class,
                        [textColor.class]: textColor.class,
                    })}
                    style={{
                        backgroundColor: backgroundColor.color,
                        color: textColor.color
                    }}
                >{buttonLabel}</Button>
            </Fragment>
        ];
    }
}

export default compose([
    applyWithColors,
])(Edit);
