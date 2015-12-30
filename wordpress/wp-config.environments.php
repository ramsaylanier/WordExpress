<?php
/** Loads environment specific config files for Wordpress.
* 	See https://github.com/studio24/wordpress-multi-env-config and/or http://abandon.ie/notebook/wordpress-configuration-for-multiple-environments
*
* 	Environment can be:
*	1. Directly loaded via an Environment variable (Name: WP_ENV)
* 	2. Looks the ServerName attribute 
*	3. Default to production (if no other one is found)
*
*	** Usage **
*	a. Add the following to your wp-config.php file.
*
*		$environments = array(
*			'development' => 'project-name.dev',
*			'production' => 'site.nclud.com'
*		);
* 		include 'wp-config.environments.php';
*	
*	b. Add environment specific files with DB connection information, named like so:
*		wp-config.production.php
*		wp-config.development.php
**/

// Try environment variable 'WP_ENV'
if (getenv('WP_ENV') !== false) {
    // Filter non-alphabetical characters for security
    define('WP_ENV', preg_replace('/[^a-z]/', '', getenv('WP_ENV')));
} 

if (!defined('WP_ENV')) {

	// Get Server name
	$server_name = $_SERVER['SERVER_NAME'];
 
	foreach($environments AS $key => $env){
	    if(strstr($server_name, $env)){
	        define('WP_ENV', $key);
	        break;
	    }
	}
}
// If no environment is set default to production
#if(!defined('WP_ENV')) define('WP_ENV', 'production');
if(!defined('WP_ENV')) define('WP_ENV', 'amazon_staging');

// Load config file for current environment
include 'wp-config.' . WP_ENV . '.php';