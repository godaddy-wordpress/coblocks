<?php

add_action( 'phpmailer_init', function( $phpmailer ) {
	// Define that we are sending with SMTP
	$phpmailer->isSMTP();

	// The hostname of the mail server
	$phpmailer->Host = 'localhost';

	// Use SMTP authentication (true|false)
	$phpmailer->SMTPAuth = false;

	// SMTP port number
	// Mailhog normally run on port 1025
	$phpmailer->Port = '1025';

	// Username to use for SMTP authentication
	// $phpmailer->Username = 'yourusername';

	// Password to use for SMTP authentication
	// $phpmailer->Password = 'yourpassword';

	// The encryption system to use - ssl (deprecated) or tls
	// $phpmailer->SMTPSecure = 'tls';

	$phpmailer->From = 'admin@wp.dev';
	$phpmailer->FromName = 'WP DEV';
}, 10, 1 );
