/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {compose} = wp.compose;
const {Component, Fragment} = wp.element;
const {Button, TextControl} = wp.components;
const {InnerBlocks} = wp.blockEditor;

const ALLOWED_BLOCKS = [];

const FORM_TEMPLATE = [
    [
        'coblocks/input',
        {
            required: false,
        },
    ],
    [
        'coblocks/button',
        {
            required: false,
        },
    ],
];

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
        } = this.props;

        const {
        } = attributes;

        const classes = classnames(
            className, {}
        );

        const innerClasses = classnames(
            'wp-block-coblocks-subscribe__inner', {}
        );

        return [
            <Fragment>
                <div className={classes}>
                    <div className={innerClasses}>
                        <div className="wp-block-coblocks-subscribe__inner-form-wrapper">
                            <InnerBlocks
                                allowedBlocks={ ALLOWED_BLOCKS }
                                templateLock={ true }
                                templateInsertUpdatesSelection={ false }
                                renderAppender={ () => ( null ) }
                                template={ FORM_TEMPLATE }
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        ];
    }
}

export default compose([
    applyWithColors,
])(Edit);
