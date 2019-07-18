import classnames from 'classnames';

import './styles/editor.scss';

const {Component} = wp.element;
const {RangeControl} = wp.components;
const {ButtonGroup} = wp.components;
const {Button} = wp.components;

class ImageCropControl extends Component {
    constructor(props) {
        super(props);

        const {offsetX, offsetY, cropWidth, cropHeight, rotation} = props;

        this.state = {
            x: offsetX,
            y: offsetY,
            w: cropWidth,
            h: cropHeight,
            r: rotation,
            midX: offsetX + cropWidth / 2,
            midY: offsetY + cropHeight / 2,
            dragging: false,
            containerWidth: 0,
            aspectRatio: 1
        };

        this.mouseDownListener = this.mouseDownListener.bind(this);
        this.mouseMoveListener = this.mouseMoveListener.bind(this);
        this.mouseUpListener = this.mouseUpListener.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.imageContainer = React.createRef();
        this.imageReference = React.createRef();
    }

    componentDidMount() {
        this.setState({
            containerWidth: (jQuery(this.imageContainer.current).width() - 40)
        });
    }

    handleImageLoaded() {
        this.setState({
            aspectRatio: this.imageReference.current.naturalWidth / this.imageReference.current.naturalHeight
        });
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

        this.updateState(this.state.x + e.movementX * 0.35, this.state.y + e.movementY * 0.35, this.state.w, this.state.h, this.state.r);
    }

    mouseUpListener(e) {
        e.preventDefault();
        e.stopPropagation();

        document.removeEventListener('mouseup', this.mouseUpListener, true);
        document.removeEventListener('mousemove', this.mouseMoveListener, true);
    }

    applyRotation(r) {
        this.updateState(this.state.x, this.state.y, this.state.w, this.state.h, r);
    }

    updateState(nX, nY, nW, nH, nR) {
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
                h: nH,
                r: nR
            });
        }

        this.setState({
            x: nX,
            y: nY,
            w: nW,
            h: nH,
            r: nR,
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

        const containerStyle = {
            'height': Math.round(this.state.containerWidth / this.state.aspectRatio + 40) + 'px'
        };
        const style = {
            'transform': 'rotate(' + this.state.r + 'deg) scale(' + scaleX + ', ' + scaleY + ') translate(' + translateX + '%, ' + translateY + '%)'
        };

        const setNewZoom = function (zoom) {
            zoom /= 100;

            let nW = 100 / zoom;
            let nH = 100 / zoom;

            let nX = self.state.midX - nW / 2;
            let nY = self.state.midY - nH / 2;

            self.updateState(nX, nY, nW, nH, self.state.r);
        };

        return (
            <div>
                <div ref={this.imageContainer} className={mainClass} onMouseDown={this.mouseDownListener}
                     style={containerStyle}>
                    <div>
                        <img ref={this.imageReference} src={imageUrl} style={style} alt={""}
                             onLoad={this.handleImageLoaded}/>
                    </div>
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
                <ButtonGroup>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 0}
                        onClick={() => this.applyRotation(0)}
                    >
                        0°
                    </Button>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 90}
                        onClick={() => this.applyRotation(90)}
                    >
                        90°
                    </Button>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 180}
                        onClick={() => this.applyRotation(180)}
                    >
                        180°
                    </Button>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 270}
                        onClick={() => this.applyRotation(270)}
                    >
                        270°
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default ImageCropControl;
