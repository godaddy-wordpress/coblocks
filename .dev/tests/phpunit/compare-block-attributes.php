<?php
	/**
	 * Compares two arrays recursively and returns an array of items missing.
	 *
	 * This function compares two arrays recursively by checking each key and value of the arrays.
	 * If a key exists in both arrays, but the value differs, that key and value is added to the
	 * returned array of differences. If a key exists in one array but not the other, the key and
	 * value is added to the returned array of differences.
	 *
	 * @param array $expected This should be the expected attributes.
	 * @param array $actual This should be the migrated block attributes.
	 * @param bool  $debug Optional flag to return extra debug information about the uncoupled attributes.
	 *
	 * @return array An array of the attributes that are missing from the expected array.
	 */
function compare_block_attributes( $expected, $actual, $debug = false ) {
	$diff = array();

	foreach ( $expected as $expected_key => $expected_value ) {
		// If the key exists in the second array.
		if ( array_key_exists( $expected_key, $actual ) ) {
			// If the value is an array, recursively compare the arrays.
			if ( is_array( $expected_value ) ) {
				$recursive_diff = compare_block_attributes( $expected_value, $actual[ $expected_key ] );

				// If there a difference, add the key and differences to the final diff array.
				if ( count( $recursive_diff ) ) {
					$diff[ $expected_key ] = $recursive_diff;
				}
			} else {
				// If the values are not the same, add the key and value to the final diff array.
				if ( $expected_value != $actual[ $expected_key ] ) {
					$diff[ $expected_key ] = $expected_value;
				}
			}
		} else {
			// If the key does not exist in the second array, add the key and value to the final diff array.
			$diff[ $expected_key ] = $expected_value;
		}
	}

	if ( $debug ) {
		$debug = false;
		$diff2 = compare_block_attributes( $actual, $expected, false );
		// Note that omitted attributes are matching.
		return array(
			'Expected - Block attributes missing'     => $diff,
			'Actual - Extra Block attributes present' => $diff2,
		);
	}

	return $diff;
}
