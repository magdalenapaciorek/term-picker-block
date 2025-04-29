<?php
	$term_name = '-';
	
	if ( !empty( $attributes['selectedTaxonomy'] ) ) {
		$terms = get_the_terms( get_the_ID(), $attributes['selectedTaxonomy'] );
		if ( !is_wp_error( $terms ) && !empty( $terms ) && is_array( $terms ) ) {
			$term = $terms[0];
			if ( $term instanceof WP_Term ) {
				$term_name = $term->name ;
			}
		}

	}

?>
<p><?php echo esc_html( $term_name ); ?></p>
