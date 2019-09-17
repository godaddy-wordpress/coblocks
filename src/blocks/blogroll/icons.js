/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.blog = <svg height="24" className="components-coblocks-svg" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m5.07145937 19.6587063c-2.63299687 0-4.77458437-2.1415875-4.77458437-4.7743688v-8.01133125c0-.76525312.62035313-1.38582187 1.3860375-1.38582187s1.3860375.62056875 1.3860375 1.38582187v8.01154685c0 1.1042157.89829375 2.0025094 2.00250937 2.0025094 1.10421563 0 2.00250938-.8982937 2.00250938-2.0025094-.00064688-.7557656-.41874375-1.4390812-1.0927875-1.7851593-.68094375-.3493125-.95004375-1.1844282-.60073125-1.8662344.3493125-.681375 1.185075-.9498281 1.86601875-.6011625 1.60274062.8223937 2.599575 2.4516562 2.599575 4.252125-.00021563 2.6329969-2.1415875 4.7745844-4.77458438 4.7745844zm8.31708753-3.3876844c-.7656844 0-1.3866844-.621-1.3866844-1.3866844 0-3.3335625-2.37403125-6.19965-5.64441562-6.81245625-.7529625-.14101875-1.24825313-.86551875-1.10809688-1.6171875.14145-.7529625.8668125-1.24868437 1.61848125-1.10745 4.58116875.85840313 7.90653755 4.86967505 7.90653755 9.53709375.0002156.7656844-.6207844 1.3866844-1.3858219 1.3866844zm4.9285406 0c-.7656844 0-1.3866844-.621-1.3866844-1.3866844 0-6.02413125-4.5048375-11.0883-10.47829685-11.780025-.76050937-.08819062-1.30517812-.77603437-1.21785-1.53654375.08840625-.76029375.77258438-1.30388437 1.536975-1.21763437 7.37221875.853875 12.93189375 7.10225625 12.93189375 14.53420312 0 .7656844-.6203531 1.3866844-1.3860375 1.3866844z" fill="#555d66" transform="translate(2 2)" /></svg>;

icons.mediaCardLeft = <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g transform="translate(2 1)"><path d="m9 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z" /><path d="m14.5 4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm0 8v-6h-7v6z" transform="matrix(0 1 -1 0 20 -2)" /></g></svg>;

icons.mediaCardRight = <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 18 1)"><path d="m9 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z" /><path d="m14.5 4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm0 8v-6h-7v6z" transform="matrix(0 1 -1 0 20 -2)" /></g></svg>;

// TODO add the proper SVGs for the code below
icons.layoutGridIcon = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m5 6h13v.87858073 1.12141927h-13z" />
			<Path d="m8 18h6v.8785807 1.1214193h-6z" />
			<Path d="m0 10h23v.8785807 1.1214193h-23z" />
			<Path d="m3 14h17v.8785807 1.1214193h-17z" />
			<Path d="m38 6h13v.87858073 1.12141927h-13z" />
			<Path d="m41 18h6v.8785807 1.1214193h-6z" />
			<Path d="m33 10h23v.8785807 1.1214193h-23z" />
			<Path d="m36 14h17v.8785807 1.1214193h-17z" />
		</G>
	</SVG>
);

icons.layoutGridIconWithImages = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fillRule="evenodd">
			<Path d="m0 0h24v14h-24z" />
			<Path d="m3 16h18v.8785807 1.1214193h-18z" />
			<Path d="m1 20h22v.8785807 1.1214193h-22z" />
			<Path d="m4 24h16v.8785807 1.1214193h-16z" />
			<Path d="m32 0h24v14h-24z" />
			<Path d="m35 16h18v.8785807 1.1214193h-18z" />
			<Path d="m33 20h22v.8785807 1.1214193h-22z" />
			<Path d="m36 24h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

icons.layoutListIcon = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m14 0h18v.87858073 1.12141927h-18z" />
			<Path d="m14 4h28v.87858073 1.12141927h-28z" />
			<Path d="m14 8h20v.87858073 1.12141927h-20z" />
			<Path d="m14 16h18v.8785807 1.1214193h-18z" />
			<Path d="m14 20h28v.8785807 1.1214193h-28z" />
			<Path d="m14 24h20v.8785807 1.1214193h-20z" />
		</G>
	</SVG>
);

icons.layoutListIconWithImages = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m10 0h10v10h-10z" />
			<Path d="m22 0h14v.87858073 1.12141927h-14z" />
			<Path d="m22 4h22v.87858073 1.12141927h-22z" />
			<Path d="m22 8h16v.87858073 1.12141927h-16z" />
			<Path d="m10 16h10v10h-10z" />
			<Path d="m22 16h14v.8785807 1.1214193h-14z" />
			<Path d="m22 20h22v.8785807 1.1214193h-22z" />
			<Path d="m22 24h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

icons.layoutCarouselIcon = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m14 0h18v.87858073 1.12141927h-18z" />
			<Path d="m14 4h28v.87858073 1.12141927h-28z" />
			<Path d="m14 8h20v.87858073 1.12141927h-20z" />
			<Path d="m14 16h18v.8785807 1.1214193h-18z" />
			<Path d="m14 20h28v.8785807 1.1214193h-28z" />
			<Path d="m14 24h20v.8785807 1.1214193h-20z" />
		</G>
	</SVG>
);

icons.layoutCarouselIconWithImages = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m10 0h10v10h-10z" />
			<Path d="m22 0h14v.87858073 1.12141927h-14z" />
			<Path d="m22 4h22v.87858073 1.12141927h-22z" />
			<Path d="m22 8h16v.87858073 1.12141927h-16z" />
			<Path d="m10 16h10v10h-10z" />
			<Path d="m22 16h14v.8785807 1.1214193h-14z" />
			<Path d="m22 20h22v.8785807 1.1214193h-22z" />
			<Path d="m22 24h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

export default icons;
