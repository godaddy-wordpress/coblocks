import classnames from 'classnames';

import './styles/editor.scss';

const {Component} = wp.element;
const {RangeControl} = wp.components;

class ImageCropControl extends Component {
    constructor(props) {
        super(props);

        const {offsetX, offsetY, cropWidth, cropHeight} = props;

        this.state = {
            x: offsetX,
            y: offsetY,
            w: cropWidth,
            h: cropHeight,
            midX: offsetX + cropWidth / 2,
            midY: offsetY + cropHeight / 2,
            dragging: false
        };

        this.mouseDownListener = this.mouseDownListener.bind(this);
        this.mouseMoveListener = this.mouseMoveListener.bind(this);
        this.mouseUpListener = this.mouseUpListener.bind(this);
    }

    mouseDownListener(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            dragging: true
        });

        this.captureMouseEvents();
    }

    captureMouseEvents() {
        document.addEventListener('mouseup', this.mouseUpListener, true);
        document.addEventListener('mousemove', this.mouseMoveListener, true);
    }

    mouseMoveListener(e) {
        e.preventDefault();
        e.stopPropagation();

        this.updateState(this.state.x + e.movementX, this.state.y + e.movementY, this.state.w, this.state.h);
    }

    mouseUpListener(e) {
        e.preventDefault();
        e.stopPropagation();

        document.removeEventListener('mouseup', this.mouseUpListener, true);
        document.removeEventListener('mousemove', this.mouseMoveListener, true);
    }

    updateState(nX, nY, nW, nH) {
        const {onChange} = this.props;

        if (nX + nW > 100) {
            nX = 100 - nW;
        }

        if (nX < 0) {
            nX = 0;
        }

        if (nY + nH > 100) {
            nY = 100 - nH;
        }

        if (nY < 0) {
            nY = 0;
        }

        if (onChange) {
            onChange({
                x: nX,
                y: nY,
                w: nW,
                h: nH
            });
        }

        this.setState({
            x: nX,
            y: nY,
            w: nW,
            h: nH,
            midX: nX + nW / 2,
            midY: nY + nH / 2
        });
    }

    render() {
        const self = this;
        const {imageUrl} = self.props;

        const mainClass = classnames(
            'components-base-control',
            'components-coblocks-image-control'
        );

        const translateX = 50 - (self.state.x + self.state.w / 2);
        const translateY = 50 - (self.state.y + self.state.h / 2);
        const scaleX = 1 / (self.state.w / 100);
        const scaleY = 1 / (self.state.h / 100);

        const style = {
            'transform': 'scale(' + scaleX + ', ' + scaleY + ') translate(' + translateX + '%, ' + translateY + '%)'
        };

        const setNewZoom = function (zoom) {
            zoom /= 100;

            let nW = 100 / zoom;
            let nH = 100 / zoom;

            let nX = self.state.midX - nW / 2;
            let nY = self.state.midY - nH / 2;

            self.updateState(nX, nY, nW, nH);
        };

        return (
            <div>
                <div className={mainClass} onMouseDown={this.mouseDownListener}>
                    <div>
                        <img src={imageUrl} style={style} alt={""}/>
                    </div>
                    <img src={imageUrl} alt={""}/>
                    <div>
                        <img src={imageUrl} style={style} alt={""}/>
                    </div>
                </div>
                <RangeControl
                    label={"Zoom (%)"}
                    value={scaleX * 100}
                    onChange={(val) => setNewZoom(val)}
                    min={100}
                    max={1000}
                />
            </div>
        );
    }
}

export default ImageCropControl;
