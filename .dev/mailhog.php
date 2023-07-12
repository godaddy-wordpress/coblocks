<?php

add_action(
	'phpmailer_init',
	function( $phpmailer ) {
		// Define that we are sending with SMTP.
		$phpmailer->isSMTP();

		// Set options.
		$phpmailer->Host     = 'localhost';
		$phpmailer->SMTPAuth = false;
		$phpmailer->Port     = '1025';
		$phpmailer->From     = 'admin@wp.dev';
		$phpmailer->FromName = 'WP DEV';
	},
	10,
	1
);
