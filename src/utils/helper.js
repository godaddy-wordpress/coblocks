/**
 * Helper Functions
 */

// Import helper dependencies
import md5 from 'md5';

// Unique ID generator
export function generateUniqueID( input ) {
	return md5( input ).substr( 0, 6 );
}