<?php
/**
 * Main WordPress API.
 *
 * REST API functions located in wp-includes/functions.php.
 *
 * @package WordPress
 */

if ( ! function_exists( 'mysql_to_rfc3339' ) ) :
	/**
	 * Parses and formats a MySQL datetime (Y-m-d H:i:s) for ISO8601/RFC3339.
	 *
	 * Explicitly strips timezones, as datetimes are not saved with any timezone
	 * information. Including any information on the offset could be misleading.
	 *
	 * @since 4.4.0
	 *
	 * @param string $date_string Date string to parse and format.
	 * @return string Date formatted for ISO8601/RFC3339.
	 */
	function mysql_to_rfc3339( $date_string ) {
		$formatted = mysql2date( 'c', $date_string, false );

		// Strip timezone information
		return preg_replace( '/(?:Z|[+-]\d{2}(?::\d{2})?)$/', '', $formatted );
	}
endif;
