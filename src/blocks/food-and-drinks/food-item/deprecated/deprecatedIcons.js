/**
 * Internal dependencies
 */
import { hasEmptyAttributes } from '../../../../utils/block-helpers';
import fromEntries from '../../../../js/coblocks-fromEntries';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createElement, Component, isValidElement, cloneElement } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const Path = ( props ) => createElement( 'path', props );

const SVG = ( props ) => {
	const appliedProps = {
		...props,
		role: 'img',
		'aria-hidden': 'true',
		focusable: 'false',
	};

	// Disable reason: We need to have a way to render HTML tag for web.
	// eslint-disable-next-line react/forbid-elements
	return <svg { ...appliedProps } />;
};

function Icon( { icon = null, size, ...additionalProps } ) {
	// Any other icons should be 24x24 by default
	const iconSize = size || 24;

	if ( 'function' === typeof icon ) {
		if ( icon.prototype instanceof Component ) {
			return createElement( icon, { size: iconSize, ...additionalProps } );
		}

		return icon( { size: iconSize, ...additionalProps } );
	}

	if ( icon && ( icon.type === 'svg' || icon.type === SVG ) ) {
		const appliedProps = {
			width: iconSize,
			height: iconSize,
			...icon.props,
			...additionalProps,
		};

		return <SVG { ...appliedProps } />;
	}

	if ( isValidElement( icon ) ) {
		return cloneElement( icon, {
			size: iconSize,
			...additionalProps,
		} );
	}

	return icon;
}

/**
 * Block user interface icons
 */
const icons = {};

icons.glutenFree = (
	<SVG
		height="14"
		viewBox="0 0 14 14"
		width="14"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path d="m6.99766252.00002487c-3.85852931 0-6.99766252 3.13913321-6.99766252 6.99766252s3.13913321 6.99766251 6.99766252 6.99766251c3.85857908 0 6.99771228-3.1391332 6.99771228-6.99766251s-3.1391332-6.99766252-6.99771228-6.99766252zm-.16527708 8.72190053c-.1740675.18691119-.36012079.35314565-.65887034.49870337-.29879929.14560746-.67575489.21838011-1.13207283.21838011-.58016696 0-1.06856305-.18033392-1.43575843-.54106394-.36724512-.36068029-.56548313-.82895915-.56548313-1.40479929v-.99086679c0-.5736643.19144938-1.04139609.54459503-1.40318295.35308348-.36179928.81523268-.54269271 1.37153996-.54269271.57799112 0 1.02444938.14072113 1.33193961.42208881.30746536.28142984.46633925.6577016.47285435 1.11614565l-.00465009.02587389h-.89634813c-.01741918-.27353464-.0977762-.45774778-.24119538-.60442452-.14340675-.14666429-.35313322-.22316696-.62905507-.22316696-.29121492 0-.51775133.1107691-.69588454.33546537-.17819538.2247087-.25912434.5123428-.25912434.86619715v.99646181c0 .36036945.08417407.65290231.26889698.87761102.18467318.22469627.42943695.33699467.74233571.33699467.22163765 0 .40621136-.02271581.54097691-.06824689.13470337-.04548135.20091119-.10180462.31281172-.16898224v-.86832327h-.88277087v-.6589698h1.81527531v1.78079751zm4.11545296-3.37229663h-2.36234462v1.31793961h2.02664302v.70870338h-2.02664302v1.97690941h-.93250444v-4.71225577h3.29484906z" />
	</SVG>
);

icons.vegetarian = (
	<SVG
		height="18"
		viewBox="0 0 18 18"
		width="18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="m.29488995 17.8015943c1.51930857 1.3683839 11.71175615-4.6987887 13.22100305-7.2544468.7244385-1.22752086-.1308014-3.02855552-1.5293702-4.46737092 1.58974-1.05647284 2.9883089 2.23368544 4.3164462 1.53943186.6036987-.32197268.9961029-1.31807564.7043152-1.93183606-.5232056-1.08665778-2.2638704-1.08665778-3.441083-1.21745918.8351166-.20123292 2.8373842-1.05647285 2.8776308-2.26387038.0402466-.92567145-1.136966-1.98214429-2.0626375-1.87146618-1.2174591.14086304-1.6601716 1.89158947-2.0726991 3.01849384-.0503082-.71437688-.2012329-2.28399368-.9860413-2.96818561-1.0464112-.9156098-2.30411695-.05030823-2.33430189 1.05647284-.04024658 1.33819894 2.83738419 2.08276075 1.93183609 3.69262413-1.52937024-1.17721259-3.3304049-1.82115795-4.48749421-1.14702766-.49302066.31191103-1.05647284.9156098-1.64004832 1.7004182.89548651.94579474 2.13306898 2.08276075 3.10904866 2.73676775.20123292.14086305.2616028.42258914.11067811.62382206-.14086305.21129457-.42258914.2616028-.62382206.12073976-.99610297-.6741303-2.21356215-1.79097302-3.11911031-2.72670611-.45277407.67413029-.9156098 1.4388154-1.34826058 2.24374709.85523992.86530157 1.9418977 1.84128127 2.80719927 2.42485667.20123293.1408631.25154116.4225892.11067811.6238221-.14086305.2112946-.42258914.2616028-.63388371.1207398-.85523992-.5835755-1.87146618-1.4891237-2.7267061-2.33430194-1.78091137 3.51151454-3.08892536 7.47580304-2.18337721 8.28073474z"
			fillRule="evenodd"
		/>
	</SVG>
);

icons.spicy = (
	<SVG
		height="18"
		viewBox="0 0 18 18"
		width="18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="m6.42857143 11.814845c-1.14837923 1.2471524-1.79672242 3.3088707-1.94503154 6.185155-2.79750264-.7772099-4.48353989-3.2093657-4.48353989-6.0371114 0-4.76263563 3.60857176-5.79732963 3.19071462-11.9628886.78714296.01369448 3.9678567 1.93929045 4.56142846 6.51096418.62167351-.65045468.93894923-2.80369415.81928582-3.68457578 2.8228569 2.25882831 4.285714 5.15901471 4.285714 8.3947159 0 3.2026027-1.6730476 5.9184005-4.4842629 6.7649668-.14968088-2.8690124-.79778374-4.9260878-1.94430857-6.1712261z"
			fillRule="evenodd"
			transform="translate(2.5)"
		/>
	</SVG>
);

icons.pescatarian = (
	<SVG
		height="18"
		viewBox="0 0 18 18"
		width="18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path d="m17.8325581 4.90148962c-.1046511.04822471-2.344186.91626951-3.9767441 2.12188728-.711628-.94038186-1.7162791-1.88076372-2.9302326-2.55590967-.8162791-1.47085369.3348837-2.79703324.3348837-2.79703324-2.34418603-.6992583-4.10232557.89215716-5.0232558 2.00132551-3.45348837.86804479-6.09069767 4.89480815-6.09069767 5.69051588 0 .62692124 3.07674418 5.47350472 6.96976744 5.81107762.52325581.675146 1.59069767 1.6396402 2.99302323 1.2297302 0 0-.66976742-.747483-.23023253-1.5914155 1.75813953-.6028089 3.20232553-1.7843143 4.10232553-3.0381568 1.611628 1.1573931 3.7465117 2.0013255 3.8720931 2.0495502-.0418605-.1446741-.9627907-3.327505-.9627907-4.46078572-.0209303-1.66375252.9209302-4.36433633.9418604-4.46078576zm-13.8359579 4.14672815c-.54545455 0-1-.45454545-1-1 0-.54545454.45454545-1 1-1s1 .45454546 1 1c0 .56363637-.45454545 1-1 1z" />
	</SVG>
);

icons.popular = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
		<Path d="m9 14.143 5.562 3.357-1.476-6.327 4.914-4.257-6.471-.549-2.529-5.967-2.529 5.967-6.471.549 4.914 4.257-1.476 6.327z" fillRule="evenodd" />
	</SVG>
);

icons.vegan = (
	<SVG
		height="18"
		viewBox="0 0 18 18"
		width="18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="m13.95.43125c-.13125-.4125-.69375-.46875-.91875-.09375-1.74375 3.1875-5.55 4.1625-5.0625 6.8625.1125.58125.45 1.06875.9375 1.44375.84375-1.5 1.875-2.49375 2.5125-3.0375l-4.74375 9.80625-5.1375-10.59375c-.1875-.375-.6375-.525-1.0125-.35625-.375.1875-.525.6375-.35625 1.0125l5.8125 12c.13125.2625.39375.43125.675.43125s.5625-.16875.675-.43125l3.88125-7.9875c1.125.09375 2.26875-.20625 2.94375-.99375 1.36875-1.6125.58125-5.7375-.20625-8.0625z"
			fillRule="evenodd"
			transform="translate(1.5)"
		/>
	</SVG>
);

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'url', 'title', 'description', 'price' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	if ( ! Object.fromEntries ) {
		return hasEmptyAttributes( fromEntries( newAttributes ) );
	}

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function deprecatedIcons( { attributes } ) {
	return isEmpty( attributes ) ? null : (
		<div
			className={ attributes.className }
			itemScope
			itemType="http://schema.org/MenuItem"
		>
			{ !! attributes.showImage && attributes.url && (
				<figure className="wp-block-coblocks-food-item__figure">
					<img
						src={ attributes.url }
						alt={ attributes.alt }
						itemProp="image"
						style={ {
							objectPosition: attributes.focalPoint
								? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y *
										100 }%`
								: undefined,
						} }
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-food-item__content">
				<div className="wp-block-coblocks-food-item__heading-wrapper">
					<RichText.Content
						tagName="h4"
						className="wp-block-coblocks-food-item__heading"
						value={ attributes.title }
						itemprop="name"
					/>
					{ ( !! attributes.spicy ||
						!! attributes.vegetarian ||
						!! attributes.glutenFree ||
						!! attributes.pescatarian ||
						!! attributes.popular ||
						!! attributes.vegan ) && (
						<div className="wp-block-coblocks-food-item__attributes">
							{ !! attributes.popular && (
								<span className="hint--top" aria-label={ __( 'Popular', 'coblocks' ) }>
									<Icon
										icon={ icons.popular }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--popular"
									/>
								</span>
							) }
							{ !! attributes.spicy && (
								<span className="hint--top" aria-label={ __( 'Spicy', 'coblocks' ) }>
									<Icon
										icon={ icons.spicy }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicy"
									/>
								</span>
							) }
							{ !! attributes.spicier && !! attributes.spicy && (
								<span className="hint--top" aria-label={ __( 'Spicier', 'coblocks' ) }>
									<Icon
										icon={ icons.spicy }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicier"
									/>
								</span>
							) }
							{ !! attributes.vegetarian && (
								<span className="hint--top" aria-label={ __( 'Vegetarian', 'coblocks' ) }>
									<Icon
										icon={ icons.vegetarian }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--veg"
									/>
								</span>
							) }
							{ !! attributes.glutenFree && (
								<span className="hint--top" aria-label={ __( 'Gluten Free', 'coblocks' ) }>
									<Icon
										icon={ icons.glutenFree }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--gf"
									/>
								</span>
							) }
							{ !! attributes.pescatarian && (
								<span className="hint--top" aria-label={ __( 'Pescatarian', 'coblocks' ) }>
									<Icon
										icon={ icons.pescatarian }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--pescatarian"
									/>
								</span>
							) }
							{ !! attributes.vegan && (
								<span className="hint--top" aria-label={ __( 'Vegan', 'coblocks' ) }>
									<Icon
										icon={ icons.vegan }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--vegan"
									/>
								</span>
							) }
						</div>
					) }
				</div>
				<RichText.Content
					tagName="p"
					className="wp-block-coblocks-food-item__description"
					value={ attributes.description }
					itemprop="description"
				/>
				{ !! attributes.showPrice && attributes.price && (
					<p
						className="wp-block-coblocks-food-item__price"
						itemProp="offers"
						itemScope
						itemType="http://schema.org/Offer"
					>
						<RichText.Content
							tagName="span"
							value={ attributes.price }
							itemprop="price"
						/>
					</p>
				) }
			</div>
		</div>
	);
}

