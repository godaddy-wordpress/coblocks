<?php
/**
 * Create @@pkg.title admin notices
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks_Admin_Notices Class
 */
class CoBlocks_Admin_Notices {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_notices', array( $this, 'for_ratings' ) );
		add_action( 'wp_ajax_coblocks_rating', array( $this, 'ajax_rating' ) );
	}

	/*
	 * Display rating notice after 7 days
	 */
	function for_ratings(){
		if( !current_user_can( 'update_plugins' ) )
            return;
        
        //show rating notice to page that matters most
        
        global $pagenow, $post_type;
        
        if( !in_array( $pagenow, array( 'edit.php' ) ) ){
            return;
        }

        if( !in_array( $post_type, array( 'coblocks' ) ) ){
            return;
        }
        $install_date   = get_option( 'coblocks_date_installed' );
        $display_date   = date( 'Y-m-d h:i:s' );
        $saved          = get_option( 'coblocks_rated' );
        $datetime1      = new DateTime( $install_date );
        $datetime2      = new DateTime( $display_date );
        $diff_intrval   = round( ($datetime2->format( 'U' ) - $datetime1->format( 'U' ) ) / (60*60*24));

        if( 'yes' != $saved && $diff_intrval >= 7 ){ ?>
	        <div class="coblocks-rating-notice updated" style="box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);">
	        	<p><?php _e( 'Awesome, you\'ve been using <strong>CoBlocks</strong> for more than 1 week. <br> May i ask you to give it a <strong>5-star rating</strong> on WordPress? </br>
	            This will help to spread its popularity and to make this plugin a better one.', '@@textdomain' );?></p>
	            <p><?php _e( 'Your help is much appreciated. Thank you very much,<br> ~ Rich Tabor & Jeffrey Carandang', '@@textdomain' );?></p>
	            <ul>
	                <li><a href="https://wordpress.org/support/view/plugin-reviews/coblocks" target="_blank"><?php echo esc_html__( 'Ok, you deserved it', '@@textdomain' )?></a></li>
	                <li><a href="javascript:void(0);" class="coblocks-rating"><?php echo esc_html__( 'I already did', '@@textdomain' )?></a></li>
	                <li><a href="javascript:void(0);" class="coblocks-rating" ><?php echo esc_html__( 'No, not good enough, i do not like to rate it!', '@@textdomain' )?></a></li>
	            </ul>
	        </div>
	        <script>
	        jQuery( document ).ready(function( $ ) {
	        	jQuery('.coblocks-rating').click(function(){
		            var data = { 'action' : 'coblocks_rating' };
		            jQuery.ajax({
			            url: '<?php echo esc_url( admin_url( 'admin-ajax.php' ) );?>',
			            type: 'post',
			            data: data,
			            dataType: 'json',
			            async: !0,
			            success: function(e) {
			                if (e == "success" ) {
			                   jQuery('.coblocks-rating-notice').slideUp( 600 );
			                }
			            }
		            });
	            })
	        });
	        </script>
	        <?php
	    }
	}

	/*
	 * Save option to check if user closed the rating notice
	 */
	function ajax_rating(){
		update_option( 'coblocks_rated', 'yes' );
	    echo json_encode( array( 'success' ) ); exit;
	}
}

return new CoBlocks_Admin_Notices();
