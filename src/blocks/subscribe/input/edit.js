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
            isSelected,
            setAttributes,
            backgroundColor,
            textColor,
        } = this.props;

        const {
            email,
            label,
        } = attributes;

        return [
            <Fragment>
                {isSelected && (
                    <Inspector
                        {...this.props}
                    />
                )}
                <div className="input-wrapper">
                    <TextControl
                        className={classnames({
                            'has-background': backgroundColor.color,
                            'has-text-color': textColor.color,
                            [backgroundColor.class]: backgroundColor.class,
                            [textColor.class]: textColor.class,
                        })}
                        style={{
                            backgroundColor: backgroundColor.color,
                            color: textColor.color
                        }}
                        value={email}
                        /* eslint-disable jsx-a11y/no-autofocus */
                        // Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
                        placeholder={label}
                        /* eslint-enable jsx-a11y/no-autofocus */
                        onChange={value => setAttributes({email: value})}
                    />
                </div>
            </Fragment>
        ];
    }
}

export default compose([
    applyWithColors,
])(Edit);
