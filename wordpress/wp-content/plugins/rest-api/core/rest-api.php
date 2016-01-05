<?php
/**
 * REST API functions.
 *
 * @package WordPress
 * @subpackage REST_API
 */

/**
 * Version number for our API.
 *
 * @var string
 */
define( 'REST_API_VERSION', '2.0' );

/** Compatibility shims for PHP functions */
include_once( dirname( __FILE__ ) . '/wp-includes/compat.php' );

/** Core HTTP Request API */
if ( file_exists( ABSPATH . WPINC . '/class-wp-http-response.php' ) ) {
	include_once( dirname( __FILE__ ) . '/wp-includes/http.php' );
} else {
	// Compatibility with WP 4.3 and below
	include_once( dirname( __FILE__ ) . '/wp-includes/class-wp-http-response.php' );
}

/** Main API functions */
include_once( dirname( __FILE__ ) . '/wp-includes/functions.php' );
include_once( dirname( __FILE__ ) . '/wp-includes/rest-api.php' );

/** WP_REST_Server class */
include_once( dirname( __FILE__ ) . '/wp-includes/rest-api/class-wp-rest-server.php' );

/** WP_HTTP_Response class */
include_once( dirname( __FILE__ ) . '/wp-includes/class-wp-http-response.php' );

/** WP_REST_Response class */
include_once( dirname( __FILE__ ) . '/wp-includes/rest-api/class-wp-rest-response.php' );

/** WP_REST_Request class */
require_once( dirname( __FILE__ ) . '/wp-includes/rest-api/class-wp-rest-request.php' );

/** REST filters */
include_once( dirname( __FILE__ ) . '/wp-includes/filters.php' );

/**
 * Determines if the rewrite rules should be flushed.
 *
 * @since 4.4.0
 */
function rest_api_maybe_flush_rewrites() {
	$version = get_option( 'rest_api_plugin_version', null );

	if ( empty( $version ) || REST_API_VERSION !== $version ) {
		flush_rewrite_rules();
		update_option( 'rest_api_plugin_version', REST_API_VERSION );
	}
}
add_action( 'init', 'rest_api_maybe_flush_rewrites', 999 );

/**
 * Registers routes and flush the rewrite rules on activation.
 *
 * @since 4.4.0
 *
 * @param bool $network_wide ?
 */
function rest_api_activation( $network_wide ) {
	if ( function_exists( 'is_multisite' ) && is_multisite() && $network_wide ) {
		$mu_blogs = wp_get_sites();

		foreach ( $mu_blogs as $mu_blog ) {
			switch_to_blog( $mu_blog['blog_id'] );

			rest_api_register_rewrites();
			update_option( 'rest_api_plugin_version', null );
		}

		restore_current_blog();
	} else {
		rest_api_register_rewrites();
		update_option( 'rest_api_plugin_version', null );
	}
}
register_activation_hook( __FILE__, 'rest_api_activation' );

/**
 * Flushes the rewrite rules on deactivation.
 *
 * @since 4.4.0
 *
 * @param bool $network_wide ?
 */
function rest_api_deactivation( $network_wide ) {
	if ( function_exists( 'is_multisite' ) && is_multisite() && $network_wide ) {

		$mu_blogs = wp_get_sites();

		foreach ( $mu_blogs as $mu_blog ) {
			switch_to_blog( $mu_blog['blog_id'] );
			delete_option( 'rest_api_plugin_version' );
		}

		restore_current_blog();
	} else {
		delete_option( 'rest_api_plugin_version' );
	}
}
register_deactivation_hook( __FILE__, 'rest_api_deactivation' );
