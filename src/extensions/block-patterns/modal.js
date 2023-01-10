/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { BlockPreview } from '@wordpress/block-editor';
import { serialize } from '@wordpress/blocks';
import apiFetch from '@wordpress/api-fetch';
import {
	Button,
	Modal,
	SelectControl,
	TextControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { InfoPopover } from '../../components/info-popover';

class CoBlocksBlockPatternsModal extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			name: '',
			description: '',
			category: '',
		};
	}

	savePattern = ( event ) => {
		event.preventDefault();

		const {
			category,
			description,
			name,
		} = this.state;

		const {
			closeModal,
			createErrorNotice,
			createSuccessNotice,
			selectedBlocks,
			setIsInserterOpened,
		} = this.props;

		apiFetch( {
			path: '/wp/v2/coblocks_pattern',
			method: 'POST',
			data: {
				title: name,
				slug: name,
				content: serialize( selectedBlocks ),
				excerpt: description,
				status: 'publish',
				terms: {
					coblocks_pattern_type: [ 'pattern' ],
					coblocks_pattern_category: [ category ],
				},
			},
		} )
			.then( () => {
				closeModal();

				// Inject block pattern into the inserter.
				this.props.updateSettings( {
					...this.props.getSettings(),
					__experimentalBlockPatterns: [
						...this.props.getSettings().__experimentalBlockPatterns,
						{
							title: name,
							name: `coblocks_pattern/${ name }`,
							content: serialize( selectedBlocks ),
							description,
							categories: [ category ],
						},
					],
				} );

				createSuccessNotice(
					sprintf(
						// translators: %s is the pattern name.
						__( '"%s" pattern has been saved.', 'coblocks' ),
						name
					),
					{
						type: 'snackbar',
						actions: [
							{
								label: __( 'View Patterns', 'coblocks' ),
								onClick: () => {
									setIsInserterOpened( true );
									setTimeout( () => document.getElementById( 'tab-panel-1-patterns' ).click(), 1000 );
								},
							},
						],
					}
				);
			} )
			.catch( () => {
				createErrorNotice( __( 'Failed to save new pattern.', 'coblocks' ) );
			} );
	};

	render() {
		const {
			blockPatternCategories,
			closeModal,
			isOpen,
			selectedBlocks,
		} = this.props;

		return isOpen && (
			<Modal
				className="coblocks-block-patterns__modal"
				onRequestClose={ closeModal }
				title={ (
					<>
						{ __( 'Save Design Pattern', 'coblocks' ) }
						<InfoPopover
							popoverProps={ { position: 'top center' } }
							title={ __( 'Design Patterns', 'coblocks' ) }
						>
							{ __( 'Create reusable content and designs that can be quickly added anywhere, but not be tied to other copies of itself (i.e. changing one will not affect the others).', 'coblocks' ) }
						</InfoPopover>
					</>
				) }
			>
				<div className="coblocks-block-patterns__preview">
					<BlockPreview
						autoHeight
						blocks={ selectedBlocks }
					/>
				</div>
				<form onSubmit={ this.savePattern }>
					<TextControl
						label={ __( 'Name', 'coblocks' ) + '*' }
						onChange={ ( name ) => this.setState( { name } ) }
						required
					/>
					<TextControl
						label={ __( 'Description', 'coblocks' ) }
						onChange={ ( description ) => this.setState( { description } ) }
					/>
					<SelectControl
						label={ __( 'Category', 'coblocks' ) }
						onChange={ ( category ) => this.setState( { category } ) }
						options={ [
							{ label: __( 'Select a pattern category', 'coblocks' ), value: '' },
							...blockPatternCategories.map( ( category ) => ( { ...category, value: category.name } ) ),
						] }
					/>
					<Button isPrimary type="submit">
						{ __( 'Save Pattern', 'coblocks' ) }
					</Button>
				</form>
			</Modal>
		);
	}
}

export default compose( [

	withSelect( ( select ) => {
		const {
			getMultiSelectedBlocks,
			getSelectedBlock,
			getSelectedBlockCount,
			getSettings,
		} = select( 'core/block-editor' );

		return {
			getSettings,
			selectedBlocks: getSelectedBlockCount() === 1
				? getSelectedBlock()
				: getMultiSelectedBlocks(),
			blockPatternCategories: getSettings().__experimentalBlockPatternCategories,
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			updateSettings,
		} = dispatch( 'core/block-editor' );

		const {
			setIsInserterOpened,
		} = dispatch( 'core/edit-post' );

		const {
			createErrorNotice,
			createSuccessNotice,
		} = dispatch( 'core/notices' );

		return {
			createErrorNotice,
			createSuccessNotice,
			setIsInserterOpened,
			updateSettings,
		};
	} ),

] )( CoBlocksBlockPatternsModal );
