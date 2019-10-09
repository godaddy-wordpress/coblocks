/**
 * Internal dependencies
 */
import autoPlayOptions from './../../components/slider-panel/autoplay-options';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	RangeControl,
	QueryControls,
	RadioControl,
	SelectControl,
} from '@wordpress/components';

class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.getAutoPlayHelp = this.getAutoPlayHelp.bind( this );
	}

	getAutoPlayHelp( checked ) {
		// Retrieve the height value and divide it to display full seconds.
		const speed = this.props.attributes.autoPlaySpeed / 1000;
		const time = ( speed > 1 ) ? __( 'seconds' ) : __( 'second' );

		// translators: 1. Speed of the slider, 2: Time until the slide advances
		return checked ? sprintf( __( 'Advancing after %1$d %2$s.' ), speed, time ) : __( 'Automatically advance carousel.' );
	}

	render() {
		const {
			attributes,
			categoriesList,
			hasPosts,
			postCount,
			setAttributes,
		} = this.props;

		const {
			displayPostContent,
			displayPostDate,
			excerptLength,
			order,
			orderBy,
			postFeedType,
			postsToShow,
			visibleItems,
			autoPlay,
			autoPlaySpeed,
		} = attributes;

		const settings = (
			<PanelBody title={ __( 'Post Carousel Settings' ) }>
				<Fragment>
					<ToggleControl
						label={ __( 'Post Date' ) }
						checked={ displayPostDate }
						help={
							displayPostDate ?
								__( 'Showing the publish date.' ) :
								__( 'Toggle to show the publish date.' )
						}
						onChange={ () => setAttributes( { displayPostDate: ! displayPostDate } ) }
					/>
					<ToggleControl
						label={ __( 'Post Content' ) }
						checked={ displayPostContent }
						help={
							displayPostContent ?
								__( 'Showing the post content.' ) :
								__( 'Toggle to show the post content.' )
						}
						onChange={ () => setAttributes( { displayPostContent: ! displayPostContent } ) }
					/>
					{ displayPostContent &&
						<RangeControl
							label={ __( 'Max words in content' ) }
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 5 }
							max={ 75 }
						/>
					}
					<RangeControl
						label={ __( 'Columns' ) }
						value={ visibleItems }
						onChange={ ( value ) => {
							setAttributes( { visibleItems: value } );
						} }
						min={ 2 }
						max={ Math.min( 4, postCount ) }
						required
					/>
					<ToggleControl
						label={ __( 'Autoplay' ) }
						checked={ !! autoPlay }
						onChange={ () => setAttributes( { autoPlay: ! autoPlay } ) }
						help={ this.getAutoPlayHelp }
						className="components-coblocks-post-carousel-autoplay"
					/>
					{ autoPlay && <SelectControl
						value={ autoPlaySpeed }
						onChange={ ( value ) => setAttributes( { autoPlaySpeed: value } ) }
						options={ autoPlayOptions }
						className="components-coblocks-post-carousel-autoplayspeed"
					/> }
				</Fragment>
			</PanelBody>
		);

		return (
			<InspectorControls>
				{ hasPosts ? settings : null }
				<PanelBody title={ __( 'Feed Settings' ) } initialOpen={ ! hasPosts ? true : false }>
					<RadioControl
						selected={ postFeedType }
						options={ [
							{ label: __( 'My Blog' ), value: 'internal' },
							{ label: __( 'External Feed' ), value: 'external' },
						] }
						onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
					/>
					{ hasPosts ?
						<Fragment>
							{ postFeedType === 'internal' &&
								<QueryControls
									{ ...{ order, orderBy } }
									categoriesList={ categoriesList }
									selectedCategoryId={ categoriesList.categories }
									onOrderChange={ ( value ) => setAttributes( { order: value } ) }
									onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
									onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
								/>
							}
							<RangeControl
								label={ __( 'Number of posts' ) }
								value={ postsToShow }
								onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
								min={ 1 }
								max={ 20 }
							/>
						</Fragment> : null }
				</PanelBody>
			</InspectorControls>
		);
	}
}

export default Inspector;
