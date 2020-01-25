<?php
/**
 * CoBlocks event.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Events Block iCal event.
 *
 * @since 1.20.0
 */
class CoBlocks_ICal_Event {

	const HTML_TEMPLATE = '<p>%s: %s</p>';

	/**
	 * Defines a short summary or subject for the calendar component.
	 * https://www.kanzaki.com/docs/ical/summary.html
	 *
	 * @var $summary
	 */
	public $summary;

	/**
	 * Specifies when the calendar component begins.
	 * https://www.kanzaki.com/docs/ical/dtstart.html
	 *
	 * @var $dtstart
	 */
	public $dtstart;

	/**
	 * Specifies the date and time that a calendar component ends.
	 * https://www.kanzaki.com/docs/ical/dtend.html
	 *
	 * @var $dtend
	 */
	public $dtend;

	/**
	 * Specifies a positive duration of time.
	 * https://www.kanzaki.com/docs/ical/duration.html
	 *
	 * @var $duration
	 */
	public $duration;

	/**
	 * Indicates the date/time that the instance of the iCalendar object was created.
	 * https://www.kanzaki.com/docs/ical/dtstamp.html
	 *
	 * @var $dtstamp
	 */
	public $dtstamp;

	/**
	 * Defines the persistent, globally unique identifier for the calendar component.
	 * https://www.kanzaki.com/docs/ical/uid.html
	 *
	 * @var $uid
	 */
	public $uid;

	/**
	 * Specifies the date and time that the calendar information was created by
	 * the calendar user agent in the calendar store.
	 * https://www.kanzaki.com/docs/ical/created.html
	 *
	 * @var $created
	 */
	public $created;

	/**
	 * Specifies the date and time that the information associated with the
	 * calendar component was last revised in the calendar store.
	 * https://www.kanzaki.com/docs/ical/lastModified.html
	 *
	 * @var $lastmodified
	 */
	public $lastmodified;

	/**
	 * Provides a more complete description of the calendar component, than that
	 * provided by the "SUMMARY" property.
	 * https://www.kanzaki.com/docs/ical/description.html
	 *
	 * @var $description
	 */
	public $description;

	/**
	 * Defines the intended venue for the activity defined by a calendar component.
	 * https://www.kanzaki.com/docs/ical/location.html
	 *
	 * @var $location
	 */
	public $location;

	/**
	 * Defines the revision sequence number of the calendar component within a
	 * sequence of revisions.
	 * https://www.kanzaki.com/docs/ical/sequence.html
	 *
	 * @var $sequence
	 */
	public $sequence;

	/**
	 * Defines the overall status or confirmation for the calendar component.
	 * https://www.kanzaki.com/docs/ical/status.html
	 *
	 * @var $status
	 */
	public $status;

	/**
	 * Defines whether an event is transparent or not to busy time searches.
	 * https://www.kanzaki.com/docs/ical/transp.html
	 *
	 * @var $transp
	 */
	public $transp;

	/**
	 * Defines the organizer for a calendar component.
	 * https://www.kanzaki.com/docs/ical/organizer.html
	 *
	 * @var $organizer
	 */
	public $organizer;

	/**
	 * Defines an "Attendee" within a calendar component.
	 * https://www.kanzaki.com/docs/ical/attendee.html
	 *
	 * @var $attendee
	 */
	public $attendee;

	/**
	 * Creates the Event object
	 *
	 * @param  array $data Calendar data.
	 * @return void
	 */
	public function __construct( array $data = array() ) {
		if ( ! empty( $data ) ) {
			foreach ( $data as $key => $value ) {
				$variable          = self::snake_case( $key );
				$this->{$variable} = self::prepare_data( $value );
			}
		}
	}

	/**
	 * Prepares the data for output
	 *
	 * @param  mixed $value Value to prepare.
	 *
	 * @return mixed
	 */
	protected function prepare_data( $value ) {
		if ( is_string( $value ) ) {
			return stripslashes( trim( str_replace( '\n', "\n", $value ) ) );
		} elseif ( is_array( $value ) ) {
			return array_map( 'self::prepare_data', $value );
		}
		return $value;
	}

	/**
	 * Converts the given input to snake_case
	 *
	 * @param  string $input     Input value.
	 * @param  string $glue      Character to join values with.
	 * @param  string $separator Character to separate values with.
	 *
	 * @return string
	 */
	protected static function snake_case( $input, $glue = '_', $separator = '-' ) {
		$input = preg_split( '/(?<=[a-z])(?=[A-Z])/x', $input );
		$input = implode( $glue, $input );
		$input = str_replace( $separator, $glue, $input );
		return strtolower( $input );
	}
}
