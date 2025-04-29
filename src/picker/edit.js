import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

import './editor.scss';

const taxonomyToAttribute = {
	category: 'categories',
	post_tag: 'tags',
};

export default function Edit( { attributes, setAttributes } ) {
	const { selectedTaxonomy } = attributes;
	const blockProps = useBlockProps();
	const { editPost } = useDispatch( 'core/editor' );

	// Map built-in taxonomies like "category" and "post_tag" to the correct attribute names used in the post object.
	const attributeName =
		taxonomyToAttribute[ selectedTaxonomy ] || selectedTaxonomy;

	const {
		taxonomies = [],
		terms = [],
		selectedTerms = [],
	} = useSelect(
		( select ) => {
			const { getEditedPostAttribute } = select( 'core/editor' );
			const { getTaxonomies, getEntityRecords } = select( 'core' );

			const postType = getEditedPostAttribute( 'type' );
			if ( ! postType ) {
				return {};
			}

			const taxonomies = getTaxonomies( { type: postType } );
			const terms = selectedTaxonomy
				? getEntityRecords( 'taxonomy', selectedTaxonomy, {
						per_page: -1,
				  } )
				: [];

			const selectedTerms = selectedTaxonomy
				? getEditedPostAttribute( attributeName ) || []
				: [];

			return { taxonomies, terms, selectedTerms };
		},
		[ selectedTaxonomy ]
	);

	if ( ! taxonomies ) {
		return (
			<div { ...blockProps }>
				<p>{ __( 'No taxonomies available.', 'term-picker-block' ) }</p>
			</div>
		);
	}

	// Get the first selected term ID as a string, or an empty string if no term is selected.
	const selectedTermID =
		selectedTerms.length > 0 ? String( selectedTerms[ 0 ] ) : '';

	const taxonomyOptions = [
		{ label: __( 'Select a taxonomy', 'term-picker-block' ), value: '' },
		...taxonomies.map( ( taxonomy ) => ( {
			label: taxonomy.name,
			value: taxonomy.slug,
		} ) ),
	];

	const termOptions =
		terms && terms.length > 0
			? [
					{
						label: __( 'Select a term', 'term-picker-block' ),
						value: '',
					},
					...terms.map( ( term ) => ( {
						label: term.name,
						value: String( term.id ),
					} ) ),
			  ]
			: [
					{
						label: __( 'No terms found', 'term-picker-block' ),
						value: '',
					},
			  ];

	const onSelectTaxonomy = ( value ) => {
		setAttributes( { selectedTaxonomy: value } );
	};

	const onSelectTerm = ( termId ) => {
		if ( ! selectedTaxonomy ) return;
		editPost( {
			[ attributeName ]: [ parseInt( termId, 10 ) ],
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'term-picker-block' ) }
				>
					<SelectControl
						label={ __( 'Pick a taxonomy', 'term-picker-block' ) }
						value={ selectedTaxonomy }
						options={ taxonomyOptions }
						onChange={ onSelectTaxonomy }
					/>
					{ selectedTaxonomy &&
						( ! terms ? (
							<Spinner />
						) : (
							<SelectControl
								label={ __(
									'Pick a term',
									'term-picker-block'
								) }
								value={ selectedTermID }
								options={ termOptions }
								onChange={ onSelectTerm }
							/>
						) ) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ ! selectedTaxonomy ? (
					// Taxonomy select when none selected
					<SelectControl
						value=""
						options={ taxonomyOptions }
						onChange={ onSelectTaxonomy }
					/>
				) : terms ? (
					<SelectControl
						value={ selectedTermID }
						options={ termOptions }
						onChange={ onSelectTerm }
					/>
				) : (
					<Spinner />
				) }
			</div>
		</>
	);
}
