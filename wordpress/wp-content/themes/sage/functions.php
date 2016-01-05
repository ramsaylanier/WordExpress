<?php
/**
 * Sage includes
 *
 * The $sage_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/sage/pull/1042
 */
$sage_includes = [
  'lib/assets.php',    // Scripts and stylesheets
  'lib/extras.php',    // Custom functions
  'lib/setup.php',     // Theme setup
  'lib/titles.php',    // Page titles
  'lib/wrapper.php',   // Theme wrapper class
  'lib/customizer.php' // Theme customizer
];

foreach ($sage_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'sage'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);


add_action( 'init', 'allow_origin' );
function allow_origin() {
    header("Access-Control-Allow-Origin: *");
}

/**
 * Grab latest post title by an author!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
function get_menu_function( $data ) {

  error_log($data['name']);

  $args = array(
      'order'                  => 'ASC',
      'orderby'                => 'menu_order',
      'post_type'              => 'nav_menu_item',
      'post_status'            => 'publish',
      'output'                 => ARRAY_A,
      'output_key'             => 'menu_order',
      'nopaging'               => true,
      'update_post_term_cache' => false );

  $items = wp_get_nav_menu_items( $data['name'], $args );

  return $items;
}


add_action( 'rest_api_init', function () {
    register_rest_route( 'sage/v1', '/menu/(?P<name>[A-Za-z]\S+)', array(
        'methods' => 'GET',
        'callback' => 'get_menu_function',
    ) );
} );
