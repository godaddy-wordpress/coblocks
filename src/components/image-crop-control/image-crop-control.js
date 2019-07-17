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

        const translateX = 50 - (offsetX + cropWidth / 2);
        const translateY = 50 - (offsetY + cropHeight / 2);
        const scale = 1 / (cropWidth / 100);
        const style = {
            'transform': 'scale(' + scale + ') translate(' + translateX + '%, ' + translateY + '%)'
        };

        return (
            <div className={mainClass}>
                <div>
                    <img src={imageUrl} style={style} alt={""}/>
                </div>
                <img src={imageUrl} alt={""}/>
                <div>
                    <img src={imageUrl} style={style} alt={""}/>
                </div>
            </div>
        );
    }
}

export default ImageCropControl;
