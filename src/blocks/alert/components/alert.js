const { Component } = wp.element;

import classnames from 'classnames';
import * as uniqueID from './../../../utils/helper';

export default class Alert extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { attributes: { title, textAlign, backgroundColor, textColor, borderColor, align } } = this.props;

		return (
			<div
				className={ classnames(
					this.props.className,
					`align${ align }`
				) }
				style={ {
					backgroundColor: backgroundColor,
					borderColor: borderColor,
					color: textColor,
					textAlign: textAlign,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
}
