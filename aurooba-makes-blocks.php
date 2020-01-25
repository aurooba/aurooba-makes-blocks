<?php
/*
 * Plugin Name: Aurooba Makes Blocks
 * Plugin URI: https://aurooba.com 
 * Description: Custom plugin for block development
 * Version: 1.0
 * Author: Aurooba Ahmed
 * Author URI: https://aurooba.com
 * Text Domain: aurooba-makes-blocks
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
} 

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  1.0.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}
/**
 * Gets this plugin's URL.
 *
 * @since  1.0.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;
	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}
	return $plugin_url;
}
// // Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

// // Register meta boxes
// include __DIR__ . '/lib/meta-boxes.php';

// // Block Templates
// include __DIR__ . '/lib/block-templates.php';

// // Dynamic Blocks
// include __DIR__ . '/blocks/12-dynamic/index.php';