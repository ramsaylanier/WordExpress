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
	'development' => 'intelsat.dev',
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
 define('AUTH_KEY',         '2PihA;H&$-R(;Z;PT!gD?ym`VH`$h~1-%l%>LB}xCK8M|h~N_3v~Q|<=@i$#@H6.');
 define('SECURE_AUTH_KEY',  'owt{7vqtB-rNb[6C]Q_}bbU;hT~PN,M7k~t:%83eCLJIAYu*KCm,0.@{|1#89SPT');
 define('LOGGED_IN_KEY',    'X(!S32;pUxsNM#S;#&H=B)YMUMZK|/_ew%zvsz@7?vN.@XZMPRD2YL:i-Z#h&`Of');
 define('NONCE_KEY',        'J6@bx|B],)_ o@Z_E&v/tUiDavcGjw|C?-e^%U^+H;|lp-fQ]V}kB-I}Aw-w_~6g');
 define('AUTH_SALT',        'La8ZTe>@{|@BRpc!DlEz.tHpZi4O3 G4O-^OP>xJ{Qb[IjR#V7_)T8pi9[7>s(<w');
 define('SECURE_AUTH_SALT', ':&(x hO;Th<U!#:2zh2y9@-Z4`Gz$=K~^Z@m}ak vVUtC0`Wi4{+X(-56W !r[z%');
 define('LOGGED_IN_SALT',   '+>p5R2%b.*QEv_dRiDuGf!Zj}M)^*+%(=FN5i8|>I+/vN;aid>,Pr.Lq+UxLjCv2');
 define('NONCE_SALT',       'L|{{dWVN5(R/,o`QQy1Z(3R}) z*8Le{()a,T2BA!8x$:|gv@%:7lb!``_4Z*?=$');

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
