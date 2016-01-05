<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

$environments = array(
	'development' => 'wordpressexpress.dev',
);

include 'wp-config.environments.php';


/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
 define('AUTH_KEY',         '|^1FO-^0b,Cb9bghg}[d7:Z^-%p&K^|)kZNl:%sON^)hJOyA.,PiSM,|sfhr8t~+');
 define('SECURE_AUTH_KEY',  '!_LKzW%-&I%5sqfp7Cit]O9`0nW.C4=?MHzkp>sqi8.-<F K^I 9Kxx)/7#!CLKg');
 define('LOGGED_IN_KEY',    '`>xl+d8Z>=1vj~jn.@InC5JrJr^imJ&bBDNGw ARK&Gq*CsH o.X][.`[#dMoR/u');
 define('NONCE_KEY',        '@EqZS/H{[;)C2fyVqJCV`8+:88*>J_oH+aVH`7~1+J^4;Tic9|~|gZwwXO}8~`03');
 define('AUTH_SALT',        'WF*);cQ_)!o%U-w)i/i0e#~%#JR7;I-y0pH ~V?fq|dHO=zLw+XR1mBS <=>J_qi');
 define('SECURE_AUTH_SALT', '(:UQ(LB78|L<y{wJvV5LuKdL@3T^E0-|CW&7|,vt-DSb=YXQ,Be+ZmO%.>Mw]{:%');
 define('LOGGED_IN_SALT',   'I^nu,IT+Ao{^w8T?)Rd`9m758X2S0b)DU2Z0uM-i119=7Us$2O[]++QKve+OwfEK');
 define('NONCE_SALT',       '}NW>p+4.Ta,d}S@@|E!OB7 |Ka2* %3K-}TEYNMn4P00r>|n?1Nf07uH/p-TliK<');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
