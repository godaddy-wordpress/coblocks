/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	RangeControl,
	QueryControls,
	RadioControl,
} from '@wordpress/components';

class Inspector extends Component {
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
			columns,
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
						value={ columns }
						onChange={ ( value ) => {
							setAttributes( { columns: value } );
						} }
						min={ 2 }
						max={ Math.min( 4, postCount ) }
						required
					/>
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
