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

        console.log(this.props);

        const scale = 1 / (cropWidth / 100);
        const style = {
            'transform': 'scale(' + scale + ')'
        };

        return (
            <div className={mainClass}>
                <img src={imageUrl} style={style}>
                </img>
                <div>
                    <img src={imageUrl} style={style}>
                    </img>
                </div>
            </div>
        );
    }
}

export default ImageCropControl;
