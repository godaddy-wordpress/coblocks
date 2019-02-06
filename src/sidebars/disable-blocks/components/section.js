const Section = ( { title, children } ) => (
	<section className="edit-post-options-modal__section">
		<h2 className="edit-post-options-modal__section-title">{ title }</h2>
		<ul className="coblocks-disable-block-item-list">
			{ children }
		</ul>
	</section>
);

export default Section;