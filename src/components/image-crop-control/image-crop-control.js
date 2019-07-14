import classnames from 'classnames';

import './styles/editor.scss';

const {Component, Fragment} = wp.element;

class ImageCropControl extends Component {
    render() {
        const {offsetX, offsetY, cropWidth, cropHeight, rotation, imageUrl} = this.props;

        const mainClass = classnames(
            'components-base-control',
            'components-coblocks-image-control'
        );

        return (
            <div className={mainClass}>
                <img src={imageUrl}>
                </img>
            </div>
        );
    }
}

export default ImageCropControl;
