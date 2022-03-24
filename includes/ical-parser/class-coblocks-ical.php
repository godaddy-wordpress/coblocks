<?php
/**
 * This PHP class will read an ICS (`.ics`, `.ical`, `.ifb`) file, parse it and return an
 * array of its contents.
 *
 * PHP 5 (≥ 5.3.9)
 *
 * @author  Jonathan Goode <https://github.com/u01jmg3>
 * @license https://opensource.org/licenses/mit-license.php MIT License
 * @version 2.1.12
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks iCal class.
 */
class CoBlocks_ICal {

	const DATE_TIME_FORMAT        = 'Ymd\THis';
	const DATE_TIME_FORMAT_PRETTY = 'F Y H:i:s';
	const ICAL_DATE_TIME_TEMPLATE = 'TZID=%s:';
	const RECURRENCE_EVENT        = 'Generated recurrence event';
	const SECONDS_IN_A_WEEK       = 604800;
	const TIME_FORMAT             = 'His';
	const TIME_ZONE_UTC           = 'UTC';
	const UNIX_FORMAT             = 'U';
	const UNIX_MIN_YEAR           = 1970;

	/**
	 * Tracks the number of alarms in the current iCal feed
	 *
	 * @var integer
	 */
	public $alarm_count = 0;

	/**
	 * Tracks the number of events in the current iCal feed
	 *
	 * @var integer
	 */
	public $event_count = 0;

	/**
	 * Tracks the free/busy count in the current iCal feed
	 *
	 * @var integer
	 */
	public $free_busy_count = 0;

	/**
	 * Tracks the number of todos in the current iCal feed
	 *
	 * @var integer
	 */
	public $todo_count = 0;

	/**
	 * The value in years to use for indefinite, recurring events
	 *
	 * @var integer
	 */
	public $default_span = 2;

	/**
	 * Enables customisation of the default time zone
	 *
	 * @var string
	 */
	public $default_time_zone;

	/**
	 * The two letter representation of the first day of the week
	 *
	 * @var string
	 */
	public $default_week_start = 'MO';

	/**
	 * Toggles whether to skip the parsing of recurrence rules
	 *
	 * @var boolean
	 */
	public $skip_recurrence = false;

	/**
	 * Toggles whether to use time zone info when parsing recurrence rules
	 *
	 * @var boolean
	 */
	public $use_timezone_with_r_rules = false;

	/**
	 * Toggles whether to disable all character replacement.
	 *
	 * @var boolean
	 */
	public $disable_character_replacement = false;

	/**
	 * With this being non-null the parser will ignore all events more than roughly this many days after now.
	 *
	 * @var integer
	 */
	public $filter_days_before = null;

	/**
	 * With this being non-null the parser will ignore all events more than roughly this many days before now.
	 *
	 * @var integer
	 */
	public $filter_days_after = null;

	/**
	 * The parsed calendar
	 *
	 * @var array
	 */
	public $cal = array();

	/**
	 * Tracks the VFREEBUSY component
	 *
	 * @var integer
	 */
	protected $free_busy_index = 0;

	/**
	 * Variable to track the previous keyword
	 *
	 * @var string
	 */
	protected $last_keyword;

	/**
	 * Cache valid IANA time zone IDs to avoid unnecessary lookups
	 *
	 * @var array
	 */
	protected $valid_iana_timezones = array();

	/**
	 * Event recurrence instances that have been altered
	 *
	 * @var array
	 */
	protected $altered_recurrence_instances = array();

	/**
	 * An associative array containing ordinal data
	 *
	 * @var array
	 */
	protected $day_ordinals;

	/**
	 * An associative array containing weekday conversion data
	 *
	 * @var array
	 */
	protected $weekdays;

	/**
	 * An associative array containing week conversion data
	 * (UK = SU, Europe = MO)
	 *
	 * @var array
	 */
	protected $weeks = array(
		'SA' => array( 'SA', 'SU', 'MO', 'TU', 'WE', 'TH', 'FR' ),
		'SU' => array( 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA' ),
		'MO' => array( 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU' ),
	);

	/**
	 * An associative array containing month names
	 *
	 * @var array
	 */
	protected $month_names;

	/**
	 * An associative array containing frequency conversion terms
	 *
	 * @var array
	 */
	protected $frequency_conversion;

	/**
	 * Holds the username and password for HTTP basic authentication
	 *
	 * @var array
	 */
	protected $http_basic_auth = array();

	/**
	 * Holds the custom User Agent string header
	 *
	 * @var string
	 */
	protected $http_user_agent = null;

	/**
	 * Define which variables can be configured
	 *
	 * @var array
	 */
	private static $configurable_options = array(
		'default_span',
		'default_time_zone',
		'default_week_start',
		'disable_character_replacement',
		'filter_days_after',
		'filter_days_before',
		'skip_recurrence',
		'use_timezone_with_r_rules',
	);

	/**
	 * CLDR time zones mapped to IANA time zones.
	 *
	 * @var array
	 */
	private static $cldr_timezones_map = array(
		'(UTC-12:00) International Date Line West'         => 'Etc/GMT+12',
		'(UTC-11:00) Coordinated Universal Time-11'        => 'Etc/GMT+11',
		'(UTC-10:00) Hawaii'                               => 'Pacific/Honolulu',
		'(UTC-09:00) Alaska'                               => 'America/Anchorage',
		'(UTC-08:00) Pacific Time (US & Canada)'           => 'America/Los_Angeles',
		'(UTC-07:00) Arizona'                              => 'America/Phoenix',
		'(UTC-07:00) Chihuahua, La Paz, Mazatlan'          => 'America/Chihuahua',
		'(UTC-07:00) Mountain Time (US & Canada)'          => 'America/Denver',
		'(UTC-06:00) Central America'                      => 'America/Guatemala',
		'(UTC-06:00) Central Time (US & Canada)'           => 'America/Chicago',
		'(UTC-06:00) Guadalajara, Mexico City, Monterrey'  => 'America/Mexico_City',
		'(UTC-06:00) Saskatchewan'                         => 'America/Regina',
		'(UTC-05:00) Bogota, Lima, Quito, Rio Branco'      => 'America/Bogota',
		'(UTC-05:00) Chetumal'                             => 'America/Cancun',
		'(UTC-05:00) Eastern Time (US & Canada)'           => 'America/New_York',
		'(UTC-05:00) Indiana (East)'                       => 'America/Indianapolis',
		'(UTC-04:00) Asuncion'                             => 'America/Asuncion',
		'(UTC-04:00) Atlantic Time (Canada)'               => 'America/Halifax',
		'(UTC-04:00) Caracas'                              => 'America/Caracas',
		'(UTC-04:00) Cuiaba'                               => 'America/Cuiaba',
		'(UTC-04:00) Georgetown, La Paz, Manaus, San Juan' => 'America/La_Paz',
		'(UTC-04:00) Santiago'                             => 'America/Santiago',
		'(UTC-03:30) Newfoundland'                         => 'America/St_Johns',
		'(UTC-03:00) Brasilia'                             => 'America/Sao_Paulo',
		'(UTC-03:00) Cayenne, Fortaleza'                   => 'America/Cayenne',
		'(UTC-03:00) City of Buenos Aires'                 => 'America/Buenos_Aires',
		'(UTC-03:00) Greenland'                            => 'America/Godthab',
		'(UTC-03:00) Montevideo'                           => 'America/Montevideo',
		'(UTC-03:00) Salvador'                             => 'America/Bahia',
		'(UTC-02:00) Coordinated Universal Time-02'        => 'Etc/GMT+2',
		'(UTC-01:00) Azores'                               => 'Atlantic/Azores',
		'(UTC-01:00) Cabo Verde Is.'                       => 'Atlantic/Cape_Verde',
		'(UTC) Coordinated Universal Time'                 => 'Etc/GMT',
		'(UTC+00:00) Casablanca'                           => 'Africa/Casablanca',
		'(UTC+00:00) Dublin, Edinburgh, Lisbon, London'    => 'Europe/London',
		'(UTC+00:00) Monrovia, Reykjavik'                  => 'Atlantic/Reykjavik',
		'(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna' => 'Europe/Berlin',
		'(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague' => 'Europe/Budapest',
		'(UTC+01:00) Brussels, Copenhagen, Madrid, Paris'  => 'Europe/Paris',
		'(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb'     => 'Europe/Warsaw',
		'(UTC+01:00) West Central Africa'                  => 'Africa/Lagos',
		'(UTC+02:00) Amman'                                => 'Asia/Amman',
		'(UTC+02:00) Athens, Bucharest'                    => 'Europe/Bucharest',
		'(UTC+02:00) Beirut'                               => 'Asia/Beirut',
		'(UTC+02:00) Cairo'                                => 'Africa/Cairo',
		'(UTC+02:00) Chisinau'                             => 'Europe/Chisinau',
		'(UTC+02:00) Damascus'                             => 'Asia/Damascus',
		'(UTC+02:00) Harare, Pretoria'                     => 'Africa/Johannesburg',
		'(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius' => 'Europe/Kiev',
		'(UTC+02:00) Jerusalem'                            => 'Asia/Jerusalem',
		'(UTC+02:00) Kaliningrad'                          => 'Europe/Kaliningrad',
		'(UTC+02:00) Tripoli'                              => 'Africa/Tripoli',
		'(UTC+02:00) Windhoek'                             => 'Africa/Windhoek',
		'(UTC+03:00) Baghdad'                              => 'Asia/Baghdad',
		'(UTC+03:00) Istanbul'                             => 'Europe/Istanbul',
		'(UTC+03:00) Kuwait, Riyadh'                       => 'Asia/Riyadh',
		'(UTC+03:00) Minsk'                                => 'Europe/Minsk',
		'(UTC+03:00) Moscow, St. Petersburg, Volgograd'    => 'Europe/Moscow',
		'(UTC+03:00) Nairobi'                              => 'Africa/Nairobi',
		'(UTC+03:30) Tehran'                               => 'Asia/Tehran',
		'(UTC+04:00) Abu Dhabi, Muscat'                    => 'Asia/Dubai',
		'(UTC+04:00) Baku'                                 => 'Asia/Baku',
		'(UTC+04:00) Izhevsk, Samara'                      => 'Europe/Samara',
		'(UTC+04:00) Port Louis'                           => 'Indian/Mauritius',
		'(UTC+04:00) Tbilisi'                              => 'Asia/Tbilisi',
		'(UTC+04:00) Yerevan'                              => 'Asia/Yerevan',
		'(UTC+04:30) Kabul'                                => 'Asia/Kabul',
		'(UTC+05:00) Ashgabat, Tashkent'                   => 'Asia/Tashkent',
		'(UTC+05:00) Ekaterinburg'                         => 'Asia/Yekaterinburg',
		'(UTC+05:00) Islamabad, Karachi'                   => 'Asia/Karachi',
		'(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi'  => 'Asia/Calcutta',
		'(UTC+05:30) Sri Jayawardenepura'                  => 'Asia/Colombo',
		'(UTC+05:45) Kathmandu'                            => 'Asia/Katmandu',
		'(UTC+06:00) Astana'                               => 'Asia/Almaty',
		'(UTC+06:00) Dhaka'                                => 'Asia/Dhaka',
		'(UTC+06:30) Yangon (Rangoon)'                     => 'Asia/Rangoon',
		'(UTC+07:00) Bangkok, Hanoi, Jakarta'              => 'Asia/Bangkok',
		'(UTC+07:00) Krasnoyarsk'                          => 'Asia/Krasnoyarsk',
		'(UTC+07:00) Novosibirsk'                          => 'Asia/Novosibirsk',
		'(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi' => 'Asia/Shanghai',
		'(UTC+08:00) Irkutsk'                              => 'Asia/Irkutsk',
		'(UTC+08:00) Kuala Lumpur, Singapore'              => 'Asia/Singapore',
		'(UTC+08:00) Perth'                                => 'Australia/Perth',
		'(UTC+08:00) Taipei'                               => 'Asia/Taipei',
		'(UTC+08:00) Ulaanbaatar'                          => 'Asia/Ulaanbaatar',
		'(UTC+09:00) Osaka, Sapporo, Tokyo'                => 'Asia/Tokyo',
		'(UTC+09:00) Pyongyang'                            => 'Asia/Pyongyang',
		'(UTC+09:00) Seoul'                                => 'Asia/Seoul',
		'(UTC+09:00) Yakutsk'                              => 'Asia/Yakutsk',
		'(UTC+09:30) Adelaide'                             => 'Australia/Adelaide',
		'(UTC+09:30) Darwin'                               => 'Australia/Darwin',
		'(UTC+10:00) Brisbane'                             => 'Australia/Brisbane',
		'(UTC+10:00) Canberra, Melbourne, Sydney'          => 'Australia/Sydney',
		'(UTC+10:00) Guam, Port Moresby'                   => 'Pacific/Port_Moresby',
		'(UTC+10:00) Hobart'                               => 'Australia/Hobart',
		'(UTC+10:00) Vladivostok'                          => 'Asia/Vladivostok',
		'(UTC+11:00) Chokurdakh'                           => 'Asia/Srednekolymsk',
		'(UTC+11:00) Magadan'                              => 'Asia/Magadan',
		'(UTC+11:00) Solomon Is., New Caledonia'           => 'Pacific/Guadalcanal',
		'(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky'     => 'Asia/Kamchatka',
		'(UTC+12:00) Auckland, Wellington'                 => 'Pacific/Auckland',
		'(UTC+12:00) Coordinated Universal Time+12'        => 'Etc/GMT-12',
		'(UTC+12:00) Fiji'                                 => 'Pacific/Fiji',
		"(UTC+13:00) Nuku'alofa"                           => 'Pacific/Tongatapu',
		'(UTC+13:00) Samoa'                                => 'Pacific/Apia',
		'(UTC+14:00) Kiritimati Island'                    => 'Pacific/Kiritimati',
	);

	/**
	 * Maps Windows (non-CLDR) time zone ID to IANA ID. This is pragmatic but not 100% precise as one Windows zone ID
	 * maps to multiple IANA IDs (one for each territory). For all practical purposes this should be good enough, though.
	 *
	 * Source: http://unicode.org/repos/cldr/trunk/common/supplemental/windowsZones.xml
	 *
	 * @var array
	 */
	private static $windows_timezones_map = array(
		'AUS Central Standard Time'       => 'Australia/Darwin',
		'AUS Eastern Standard Time'       => 'Australia/Sydney',
		'Afghanistan Standard Time'       => 'Asia/Kabul',
		'Alaskan Standard Time'           => 'America/Anchorage',
		'Aleutian Standard Time'          => 'America/Adak',
		'Altai Standard Time'             => 'Asia/Barnaul',
		'Arab Standard Time'              => 'Asia/Riyadh',
		'Arabian Standard Time'           => 'Asia/Dubai',
		'Arabic Standard Time'            => 'Asia/Baghdad',
		'Argentina Standard Time'         => 'America/Buenos_Aires',
		'Astrakhan Standard Time'         => 'Europe/Astrakhan',
		'Atlantic Standard Time'          => 'America/Halifax',
		'Aus Central W. Standard Time'    => 'Australia/Eucla',
		'Azerbaijan Standard Time'        => 'Asia/Baku',
		'Azores Standard Time'            => 'Atlantic/Azores',
		'Bahia Standard Time'             => 'America/Bahia',
		'Bangladesh Standard Time'        => 'Asia/Dhaka',
		'Belarus Standard Time'           => 'Europe/Minsk',
		'Bougainville Standard Time'      => 'Pacific/Bougainville',
		'Canada Central Standard Time'    => 'America/Regina',
		'Cape Verde Standard Time'        => 'Atlantic/Cape_Verde',
		'Caucasus Standard Time'          => 'Asia/Yerevan',
		'Cen. Australia Standard Time'    => 'Australia/Adelaide',
		'Central America Standard Time'   => 'America/Guatemala',
		'Central Asia Standard Time'      => 'Asia/Almaty',
		'Central Brazilian Standard Time' => 'America/Cuiaba',
		'Central Europe Standard Time'    => 'Europe/Budapest',
		'Central European Standard Time'  => 'Europe/Warsaw',
		'Central Pacific Standard Time'   => 'Pacific/Guadalcanal',
		'Central Standard Time (Mexico)'  => 'America/Mexico_City',
		'Central Standard Time'           => 'America/Chicago',
		'Chatham Islands Standard Time'   => 'Pacific/Chatham',
		'China Standard Time'             => 'Asia/Shanghai',
		'Cuba Standard Time'              => 'America/Havana',
		'Dateline Standard Time'          => 'Etc/GMT+12',
		'E. Africa Standard Time'         => 'Africa/Nairobi',
		'E. Australia Standard Time'      => 'Australia/Brisbane',
		'E. Europe Standard Time'         => 'Europe/Chisinau',
		'E. South America Standard Time'  => 'America/Sao_Paulo',
		'Easter Island Standard Time'     => 'Pacific/Easter',
		'Eastern Standard Time (Mexico)'  => 'America/Cancun',
		'Eastern Standard Time'           => 'America/New_York',
		'Egypt Standard Time'             => 'Africa/Cairo',
		'Ekaterinburg Standard Time'      => 'Asia/Yekaterinburg',
		'FLE Standard Time'               => 'Europe/Kiev',
		'Fiji Standard Time'              => 'Pacific/Fiji',
		'GMT Standard Time'               => 'Europe/London',
		'GTB Standard Time'               => 'Europe/Bucharest',
		'Georgian Standard Time'          => 'Asia/Tbilisi',
		'Greenland Standard Time'         => 'America/Godthab',
		'Greenwich Standard Time'         => 'Atlantic/Reykjavik',
		'Haiti Standard Time'             => 'America/Port-au-Prince',
		'Hawaiian Standard Time'          => 'Pacific/Honolulu',
		'India Standard Time'             => 'Asia/Calcutta',
		'Iran Standard Time'              => 'Asia/Tehran',
		'Israel Standard Time'            => 'Asia/Jerusalem',
		'Jordan Standard Time'            => 'Asia/Amman',
		'Kaliningrad Standard Time'       => 'Europe/Kaliningrad',
		'Korea Standard Time'             => 'Asia/Seoul',
		'Libya Standard Time'             => 'Africa/Tripoli',
		'Line Islands Standard Time'      => 'Pacific/Kiritimati',
		'Lord Howe Standard Time'         => 'Australia/Lord_Howe',
		'Magadan Standard Time'           => 'Asia/Magadan',
		'Magallanes Standard Time'        => 'America/Punta_Arenas',
		'Marquesas Standard Time'         => 'Pacific/Marquesas',
		'Mauritius Standard Time'         => 'Indian/Mauritius',
		'Middle East Standard Time'       => 'Asia/Beirut',
		'Montevideo Standard Time'        => 'America/Montevideo',
		'Morocco Standard Time'           => 'Africa/Casablanca',
		'Mountain Standard Time (Mexico)' => 'America/Chihuahua',
		'Mountain Standard Time'          => 'America/Denver',
		'Myanmar Standard Time'           => 'Asia/Rangoon',
		'N. Central Asia Standard Time'   => 'Asia/Novosibirsk',
		'Namibia Standard Time'           => 'Africa/Windhoek',
		'Nepal Standard Time'             => 'Asia/Katmandu',
		'New Zealand Standard Time'       => 'Pacific/Auckland',
		'Newfoundland Standard Time'      => 'America/St_Johns',
		'Norfolk Standard Time'           => 'Pacific/Norfolk',
		'North Asia East Standard Time'   => 'Asia/Irkutsk',
		'North Asia Standard Time'        => 'Asia/Krasnoyarsk',
		'North Korea Standard Time'       => 'Asia/Pyongyang',
		'Omsk Standard Time'              => 'Asia/Omsk',
		'Pacific SA Standard Time'        => 'America/Santiago',
		'Pacific Standard Time (Mexico)'  => 'America/Tijuana',
		'Pacific Standard Time'           => 'America/Los_Angeles',
		'Pakistan Standard Time'          => 'Asia/Karachi',
		'Paraguay Standard Time'          => 'America/Asuncion',
		'Romance Standard Time'           => 'Europe/Paris',
		'Russia Time Zone 10'             => 'Asia/Srednekolymsk',
		'Russia Time Zone 11'             => 'Asia/Kamchatka',
		'Russia Time Zone 3'              => 'Europe/Samara',
		'Russian Standard Time'           => 'Europe/Moscow',
		'SA Eastern Standard Time'        => 'America/Cayenne',
		'SA Pacific Standard Time'        => 'America/Bogota',
		'SA Western Standard Time'        => 'America/La_Paz',
		'SE Asia Standard Time'           => 'Asia/Bangkok',
		'Saint Pierre Standard Time'      => 'America/Miquelon',
		'Sakhalin Standard Time'          => 'Asia/Sakhalin',
		'Samoa Standard Time'             => 'Pacific/Apia',
		'Sao Tome Standard Time'          => 'Africa/Sao_Tome',
		'Saratov Standard Time'           => 'Europe/Saratov',
		'Singapore Standard Time'         => 'Asia/Singapore',
		'South Africa Standard Time'      => 'Africa/Johannesburg',
		'Sri Lanka Standard Time'         => 'Asia/Colombo',
		'Sudan Standard Time'             => 'Africa/Tripoli',
		'Syria Standard Time'             => 'Asia/Damascus',
		'Taipei Standard Time'            => 'Asia/Taipei',
		'Tasmania Standard Time'          => 'Australia/Hobart',
		'Tocantins Standard Time'         => 'America/Araguaina',
		'Tokyo Standard Time'             => 'Asia/Tokyo',
		'Tomsk Standard Time'             => 'Asia/Tomsk',
		'Tonga Standard Time'             => 'Pacific/Tongatapu',
		'Transbaikal Standard Time'       => 'Asia/Chita',
		'Turkey Standard Time'            => 'Europe/Istanbul',
		'Turks And Caicos Standard Time'  => 'America/Grand_Turk',
		'US Eastern Standard Time'        => 'America/Indianapolis',
		'US Mountain Standard Time'       => 'America/Phoenix',
		'UTC'                             => 'Etc/GMT',
		'UTC+12'                          => 'Etc/GMT-12',
		'UTC+13'                          => 'Etc/GMT-13',
		'UTC-02'                          => 'Etc/GMT+2',
		'UTC-08'                          => 'Etc/GMT+8',
		'UTC-09'                          => 'Etc/GMT+9',
		'UTC-11'                          => 'Etc/GMT+11',
		'Ulaanbaatar Standard Time'       => 'Asia/Ulaanbaatar',
		'Venezuela Standard Time'         => 'America/Caracas',
		'Vladivostok Standard Time'       => 'Asia/Vladivostok',
		'W. Australia Standard Time'      => 'Australia/Perth',
		'W. Central Africa Standard Time' => 'Africa/Lagos',
		'W. Europe Standard Time'         => 'Europe/Berlin',
		'W. Mongolia Standard Time'       => 'Asia/Hovd',
		'West Asia Standard Time'         => 'Asia/Tashkent',
		'West Bank Standard Time'         => 'Asia/Hebron',
		'West Pacific Standard Time'      => 'Pacific/Port_Moresby',
		'Yakutsk Standard Time'           => 'Asia/Yakutsk',
	);

	/**
	 * If `$filter_days_before` or `$filter_days_after` are set then the events are filtered according to the window defined
	 * by this field and `$window_max_timestamp`.
	 *
	 * @var integer
	 */
	private $window_min_timestamp = null;

	/**
	 * If `$filter_days_before` or `$filter_days_after` are set then the events are filtered according to the window defined
	 * by this field and `$window_min_timestamp`.
	 *
	 * @var integer
	 */
	private $window_max_timestamp = null;

	/**
	 * `true` if either `$filter_days_before` or `$filter_days_after` are set.
	 *
	 * @var boolean
	 */
	private $should_filter_by_window = false;

	/**
	 * Creates the ICal object
	 *
	 * @param  mixed $files   Files.
	 * @param  array $options Options array.
	 *
	 * @return void
	 */
	public function __construct( $files = false, array $options = array() ) {
		ini_set( 'auto_detect_line_endings', '1' );

		// Used only for strtotime(), i18n not needed.
		$this->day_ordinals = array(
			1 => 'first',
			2 => 'second',
			3 => 'third',
			4 => 'fourth',
			5 => 'fifth',
		);

		// Used only for strtotime(), i18n not needed.
		$this->weekdays = array(
			'SU'      => 'Sunday of',
			'MO'      => 'Monday of',
			'TU'      => 'Tuesday of',
			'WE'      => 'Wednesday of',
			'TH'      => 'Thursday of',
			'FR'      => 'Friday of',
			'SA'      => 'Saturday of',
			'day'     => 'day of',
			'weekday' => 'weekday',
		);

		// Used only for strtotime(), i18n not needed.
		$this->month_names = array(
			1  => 'January',
			2  => 'February',
			3  => 'March',
			4  => 'April',
			5  => 'May',
			6  => 'June',
			7  => 'July',
			8  => 'August',
			9  => 'September',
			10 => 'October',
			11 => 'November',
			12 => 'December',
		);

		// Used only for strtotime(), i18n not needed.
		$this->frequency_conversion = array(
			'DAILY'   => 'day',
			'WEEKLY'  => 'week',
			'MONTHLY' => 'month',
			'YEARLY'  => 'year',
		);

		foreach ( $options as $option => $value ) {
			if ( in_array( $option, self::$configurable_options, true ) ) {
				$this->{$option} = $value;
			}
		}

		// Fallback to use the system default time zone.
		if ( ! isset( $this->default_time_zone ) || ! $this->is_valid_timezone_id( $this->default_time_zone ) ) {
			$this->default_time_zone = date_default_timezone_get();
		}

		$this->window_min_timestamp = is_null( $this->filter_days_before ) ? ~PHP_INT_MAX : ( new \DateTime( 'now' ) )->sub( new \DateInterval( 'P' . $this->filter_days_before . 'D' ) )->getTimestamp();
		$this->window_max_timestamp = is_null( $this->filter_days_after ) ? PHP_INT_MAX : ( new \DateTime( 'now' ) )->add( new \DateInterval( 'P' . $this->filter_days_after . 'D' ) )->getTimestamp();

		$this->should_filter_by_window = ! is_null( $this->filter_days_before ) || ! is_null( $this->filter_days_after );

		if ( false !== $files ) {
			$files = is_array( $files ) ? $files : array( $files );

			foreach ( $files as $file ) {
				if ( ! is_array( $file ) && $this->is_file_or_url( $file ) ) {
					$lines = $this->file_or_url( $file );
				} else {
					$lines = is_array( $file ) ? $file : array( $file );
				}

				$this->init_lines( $lines );
			}
		}
	}

	/**
	 * Initialises lines from a string
	 *
	 * @param  string $string String value.
	 *
	 * @return ICal
	 */
	public function init_string( $string ) {
		if ( empty( $this->cal ) ) {
			$lines = explode( PHP_EOL, $string );

			$this->init_lines( $lines );
		}

		return $this;
	}

	/**
	 * Initialises lines from a file
	 *
	 * @param  string $file File string.
	 *
	 * @return ICal
	 */
	public function init_file( $file ) {
		if ( empty( $this->cal ) ) {
			$lines = $this->file_or_url( $file );

			$this->init_lines( $lines );
		}

		return $this;
	}

	/**
	 * Initialises lines from a URL
	 *
	 * @param  string $url        URL.
	 * @param  string $username   Username.
	 * @param  string $password   Password.
	 * @param  string $user_agent User agent.
	 *
	 * @return ICal
	 */
	public function init_url( $url, $username = null, $password = null, $user_agent = null ) {
		if ( ! is_null( $username ) && ! is_null( $password ) ) {
			$this->http_basic_auth['username'] = $username;
			$this->http_basic_auth['password'] = $password;
		}

		if ( ! is_null( $user_agent ) ) {
			$this->http_user_agent = $user_agent;
		}

		$this->init_file( $url );

		return $this;
	}

	/**
	 * Initialises the parser using an array
	 * containing each line of iCal content
	 *
	 * @param  array $lines Lines array.
	 *
	 * @return void
	 */
	protected function init_lines( array $lines ) {
		$lines = $this->unfold( $lines );

		if ( stristr( $lines[0], 'BEGIN:VCALENDAR' ) !== false ) {
			$component = '';
			foreach ( $lines as $line ) {
				$line = rtrim( $line ); // Trim trailing whitespace.
				$line = $this->remove_unprintable_chars( $line );

				if ( ! $this->disable_character_replacement ) {
					$line = $this->clean_data( $line );
				}

				$add = $this->key_value_from_string( $line );

				$keyword = $add[0];
				$values  = $add[1]; // May be an array containing multiple values.

				if ( ! is_array( $values ) ) {
					if ( ! empty( $values ) ) {
						$values      = array( $values ); // Make an array as not already.
						$blank_array = array(); // Empty placeholder array.
						array_push( $values, $blank_array );
					} else {
						$values = array(); // Use blank array to ignore this line.
					}
				} elseif ( empty( $values[0] ) ) {
					$values = array(); // Use blank array to ignore this line.
				}

				// Reverse so that our array of properties is processed first.
				$values = array_reverse( $values );

				foreach ( $values as $value ) {
					switch ( $line ) {
						/* https://www.kanzaki.com/docs/ical/vtodo.html */
						case 'BEGIN:VTODO':
							if ( ! is_array( $value ) ) {
								$this->todo_count++;
							}

							$component = 'VTODO';
							break;

						/* https://www.kanzaki.com/docs/ical/vevent.html */
						case 'BEGIN:VEVENT':
							if ( ! is_array( $value ) ) {
								$this->event_count++;
							}

							$component = 'VEVENT';
							break;

						/* https://www.kanzaki.com/docs/ical/vfreebusy.html */
						case 'BEGIN:VFREEBUSY':
							if ( ! is_array( $value ) ) {
								$this->free_busy_index++;
							}

							$component = 'VFREEBUSY';
							break;

						case 'BEGIN:VALARM':
							if ( ! is_array( $value ) ) {
								$this->alarm_count++;
							}

							$component = 'VALARM';
							break;

						case 'END:VALARM':
							$component = 'VEVENT';
							break;

						case 'BEGIN:DAYLIGHT':
						case 'BEGIN:STANDARD':
						case 'BEGIN:VCALENDAR':
						case 'BEGIN:VTIMEZONE':
							$component = $value;
							break;

						case 'END:DAYLIGHT':
						case 'END:STANDARD':
						case 'END:VCALENDAR':
						case 'END:VFREEBUSY':
						case 'END:VTIMEZONE':
						case 'END:VTODO':
							$component = 'VCALENDAR';
							break;

						case 'END:VEVENT':
							if ( $this->should_filter_by_window ) {
								$this->remove_last_event_if_outside_window_and_non_recurring();
							}

							$component = 'VCALENDAR';
							break;

						default:
							$this->add_calendar_component_with_key_and_value( $component, $keyword, $value );
							break;
					}
				}
			}

			$this->process_events();

			if ( ! $this->skip_recurrence ) {
				$this->process_recurrences();

				// Apply changes to altered recurrence instances.
				if ( ! empty( $this->altered_recurrence_instances ) ) {
					$events = $this->cal['VEVENT'];

					foreach ( $this->altered_recurrence_instances as $altered_recurrence_instance ) {
						if ( isset( $altered_recurrence_instance['altered-event'] ) ) {
							$altered_event  = $altered_recurrence_instance['altered-event'];
							$key            = key( $altered_event );
							$events[ $key ] = $altered_event[ $key ];
						}
					}

					$this->cal['VEVENT'] = $events;
				}
			}

			if ( $this->should_filter_by_window ) {
				$this->reduce_events_to_min_max_range();
			}

			$this->process_date_conversions();
		}
	}

	/**
	 * Removes the last event (i.e. most recently parsed) if its start date is outside the window spanned by
	 * `$window_min_timestamp` / `$window_max_timestamp`.
	 *
	 * @return void
	 */
	protected function remove_last_event_if_outside_window_and_non_recurring() {
		$events = $this->cal['VEVENT'];

		if ( ! empty( $events ) ) {
			$last_index = count( $events ) - 1;
			$last_event = $events[ $last_index ];

			if ( ( ! isset( $last_event['RRULE'] ) || '' === $last_event['RRULE'] ) && $this->does_event_start_outside_window( $last_event ) ) {
				$this->event_count--;

				unset( $events[ $last_index ] );
			}

			$this->cal['VEVENT'] = $events;
		}
	}

	/**
	 * Reduces the number of events to the defined minimum and maximum range
	 *
	 * @return void
	 */
	protected function reduce_events_to_min_max_range() {
		$events = ( isset( $this->cal['VEVENT'] ) ) ? $this->cal['VEVENT'] : array();

		if ( ! empty( $events ) ) {
			foreach ( $events as $key => $an_event ) {
				if ( null === $an_event ) {
					unset( $events[ $key ] );
					continue;
				}

				if ( $this->does_event_start_outside_window( $an_event ) ) {
					$this->event_count--;

					unset( $events[ $key ] );

					continue;
				}
			}

			$this->cal['VEVENT'] = $events;
		}
	}

	/**
	 * Determines whether the event start date is outside `$window_min_timestamp` / `$window_max_timestamp`.
	 * Returns `true` for invalid dates.
	 *
	 * @param  array $event Event data.
	 *
	 * @return boolean
	 */
	protected function does_event_start_outside_window( array $event ) {
		return ! $this->is_valid_date( $event['DTSTART'] ) || $this->is_out_of_range( $event['DTSTART'], $this->window_min_timestamp, $this->window_max_timestamp );
	}

	/**
	 * Determines whether a valid iCalendar date is within a given range
	 *
	 * @param  string  $calendar_date Calendar date.
	 * @param  integer $min_timestamp Minimum timestamp value.
	 * @param  integer $max_timestamp Maximum timestamp value.
	 *
	 * @return boolean
	 */
	protected function is_out_of_range( $calendar_date, $min_timestamp, $max_timestamp ) {
		$timestamp = strtotime( explode( 'T', $calendar_date )[0] );

		return $timestamp < $min_timestamp || $timestamp > $max_timestamp;
	}

	/**
	 * Unfolds an iCal file in preparation for parsing
	 * (https://icalendar.org/iCalendar-RFC-5545/3-1-content-lines.html)
	 *
	 * @param  array $lines iCal data.
	 *
	 * @return array
	 */
	protected function unfold( array $lines ) {
		$string = implode( PHP_EOL, $lines );
		$string = preg_replace( '/' . PHP_EOL . '[ \t]/', '', $string );
		$lines  = explode( PHP_EOL, $string );

		return $lines;
	}

	/**
	 * Add one key and value pair to the `$this->cal` array
	 *
	 * @param  string         $component Component name.
	 * @param  string|boolean $keyword   Keyword value.
	 * @param  string         $value     Value.
	 *
	 * @return void
	 */
	protected function add_calendar_component_with_key_and_value( $component, $keyword, $value ) {
		if ( false === $keyword ) {
			$keyword = $this->last_keyword;
		}

		switch ( $component ) {
			case 'VALARM':
				$key1 = 'VEVENT';
				$key2 = ( $this->event_count - 1 );
				$key3 = $component;

				if ( ! isset( $this->cal[ $key1 ][ $key2 ][ $key3 ][ "{$keyword}_array" ] ) ) {
					$this->cal[ $key1 ][ $key2 ][ $key3 ][ "{$keyword}_array" ] = array();
				}

				if ( is_array( $value ) ) {
					// Add array of properties to the end.
					array_push( $this->cal[ $key1 ][ $key2 ][ $key3 ][ "{$keyword}_array" ], $value );
				} else {
					if ( ! isset( $this->cal[ $key1 ][ $key2 ][ $key3 ][ $keyword ] ) ) {
						$this->cal[ $key1 ][ $key2 ][ $key3 ][ $keyword ] = $value;
					}

					if ( $this->cal[ $key1 ][ $key2 ][ $key3 ][ $keyword ] !== $value ) {
						$this->cal[ $key1 ][ $key2 ][ $key3 ][ $keyword ] .= ',' . $value;
					}
				}
				break;

			case 'VEVENT':
				$key1 = $component;
				$key2 = ( $this->event_count - 1 );

				if ( ! isset( $this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ] ) ) {
					$this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ] = array();
				}

				if ( is_array( $value ) ) {
					// Add array of properties to the end.
					array_push( $this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ], $value );
				} else {
					if ( ! isset( $this->cal[ $key1 ][ $key2 ][ $keyword ] ) ) {
						$this->cal[ $key1 ][ $key2 ][ $keyword ] = $value;
					}

					if ( 'EXDATE' === $keyword ) {
						if ( trim( $value ) === $value ) {
							$array = array_filter( explode( ',', $value ) );
							$this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ][] = $array;
						} else {
							$value = explode( ',', implode( ',', $this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ][1] ) . trim( $value ) );
							$this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ][1] = $value;
						}
					} else {
						$this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ][] = $value;

						if ( 'DURATION' === $keyword ) {
							$duration = new \DateInterval( $value );
							array_push( $this->cal[ $key1 ][ $key2 ][ "{$keyword}_array" ], $duration );
						}
					}

					if ( $this->cal[ $key1 ][ $key2 ][ $keyword ] !== $value ) {
						$this->cal[ $key1 ][ $key2 ][ $keyword ] .= ',' . $value;
					}
				}
				break;

			case 'VFREEBUSY':
				$key1 = $component;
				$key2 = ( $this->free_busy_index - 1 );
				$key3 = $keyword;

				if ( 'FREEBUSY' === $keyword ) {
					if ( is_array( $value ) ) {
						$this->cal[ $key1 ][ $key2 ][ $key3 ][][] = $value;
					} else {
						$this->free_busy_count++;

						end( $this->cal[ $key1 ][ $key2 ][ $key3 ] );
						$key = key( $this->cal[ $key1 ][ $key2 ][ $key3 ] );

						$value = explode( '/', $value );
						$this->cal[ $key1 ][ $key2 ][ $key3 ][ $key ][] = $value;
					}
				} else {
					$this->cal[ $key1 ][ $key2 ][ $key3 ][] = $value;
				}
				break;

			case 'VTODO':
				$this->cal[ $component ][ $this->todo_count - 1 ][ $keyword ] = $value;
				break;

			default:
				$this->cal[ $component ][ $keyword ] = $value;
				break;
		}

		$this->last_keyword = $keyword;
	}

	/**
	 * Gets the key value pair from an iCal string
	 *
	 * @param  string $text Text value.
	 *
	 * @return array|boolean
	 */
	protected function key_value_from_string( $text ) {
		$text = htmlspecialchars( $text, ENT_NOQUOTES, 'UTF-8' );

		$colon = strpos( $text, ':' );
		$quote = strpos( $text, '"' );
		if ( false === $colon ) {
			$matches = array();
		} elseif ( false === $quote || $colon < $quote ) {
			list($before, $after) = explode( ':', $text, 2 );
			$matches              = array( $text, $before, $after );
		} else {
			list($before, $text) = explode( '"', $text, 2 );
			$text                = '"' . $text;
			$matches             = str_getcsv( $text, ':' );
			$combined_value      = '';

			foreach ( $matches as $key => $match ) {
				if ( 0 === $key ) {
					if ( ! empty( $before ) ) {
						$matches[ $key ] = $before . '"' . $matches[ $key ] . '"';
					}
				} else {
					if ( $key > 1 ) {
						$combined_value .= ':';
					}

					$combined_value .= $matches[ $key ];
				}
			}

			$matches    = array_slice( $matches, 0, 2 );
			$matches[1] = $combined_value;
			array_unshift( $matches, $before . $text );
		}

		if ( count( $matches ) === 0 ) {
			return false;
		}

		if ( preg_match( '/^([A-Z-]+)([;][\w\W]*)?$/', $matches[1] ) ) {
			$matches = array_splice( $matches, 1, 2 ); // Remove first match and re-align ordering.

			// Process properties.
			if ( preg_match( '/([A-Z-]+)[;]([\w\W]*)/', $matches[0], $properties ) ) {
				// Remove first match.
				array_shift( $properties );
				// Fix to ignore everything in keyword after a ; (e.g. Language, TZID, etc.).
				$matches[0] = $properties[0];
				array_shift( $properties ); // Repeat removing first match.

				$formatted = array();
				foreach ( $properties as $property ) {
					// Match semicolon separator outside of quoted substrings.
					preg_match_all( '~[^' . PHP_EOL . '";]+(?:"[^"\\\]*(?:\\\.[^"\\\]*)*"[^' . PHP_EOL . '";]*)*~', $property, $attributes );
					// Remove multi-dimensional array and use the first key.
					$attributes = ( count( $attributes ) === 0 ) ? array( $property ) : reset( $attributes );

					if ( is_array( $attributes ) ) {
						foreach ( $attributes as $attribute ) {
							// Match equals sign separator outside of quoted substrings.
							preg_match_all(
								'~[^' . PHP_EOL . '"=]+(?:"[^"\\\]*(?:\\\.[^"\\\]*)*"[^' . PHP_EOL . '"=]*)*~',
								$attribute,
								$values
							);
							// Remove multi-dimensional array and use the first key.
							$value = ( count( $values ) === 0 ) ? null : reset( $values );

							if ( is_array( $value ) && isset( $value[1] ) ) {
								// Remove double quotes from beginning and end only.
								$formatted[ $value[0] ] = trim( $value[1], '"' );
							}
						}
					}
				}

				// Assign the keyword property information.
				$properties[0] = $formatted;

				// Add match to beginning of array.
				array_unshift( $properties, $matches[1] );
				$matches[1] = $properties;
			}

			return $matches;
		} else {
			return false; // Ignore this match.
		}
	}

	/**
	 * Returns a `DateTime` object from an iCal date time format
	 *
	 * @param  string $ical_date iCal date format.
	 *
	 * @return \DateTime
	 *
	 * @throws \Exception Exception thrown on error.
	 */
	public function ical_date_to_date_time( $ical_date ) {
		/**
		 * The iCal times may be in 3 formats, (https://www.kanzaki.com/docs/ical/dateTime.html).
		 *
		 * UTC:      Has a trailing 'Z'
		 * Floating: No time zone reference specified, no trailing 'Z', use local time
		 * TZID:     Set time zone as specified
		 *
		 * Use DateTime class objects to get around limitations with `mktime` and `gmmktime`.
		 * Must have a local time zone set to process floating times.
		 */
		$pattern  = '/^(?:TZID=)?([^:]*|".*")'; // 1: Time zone
		$pattern .= ':?';                       // Time zone delimiter.
		$pattern .= '([0-9]{8})';               // 2: YYYYMMDD
		$pattern .= 'T?';                       // Time delimiter.
		$pattern .= '(?(?<=T)([0-9]{6}))';      // 3: HHMMSS (filled if delimiter present)
		$pattern .= '(Z?)/';                    // 4: UTC flag

		preg_match( $pattern, $ical_date, $date );

		if ( empty( $date ) ) {
			throw new \Exception( 'Invalid iCal date format.' );
		}

		// A Unix timestamp usually cannot represent a date prior to 1 Jan 1970.
		// PHP, on the other hand, uses negative numbers for that. Thus we don't
		// need to special case them.
		if ( 'Z' === $date[4] ) {
			$date_timezone = new \DateTimeZone( self::TIME_ZONE_UTC );
		} elseif ( ! empty( $date[1] ) ) {
			$date_timezone = $this->timezone_string_to_date_timezone( $date[1] );
		} else {
			$date_timezone = new \DateTimeZone( $this->default_time_zone );
		}

		// The exclamation mark at the start of the format string indicates that if a
		// time portion is not included, the time in the returned DateTime should be
		// set to 00:00:00. Without it, the time would be set to the current system time.
		$date_format = '!Ymd';
		$date_basic  = $date[2];
		if ( ! empty( $date[3] ) ) {
			$date_basic  .= 'T' . $date[3];
			$date_format .= '\THis';
		}

		return \DateTime::createFromFormat( $date_format, $date_basic, $date_timezone );
	}

	/**
	 * Returns a Unix timestamp from an iCal date time format
	 *
	 * @param  string $ical_date iCal date value.
	 *
	 * @return integer
	 */
	public function ical_date_to_unix_timestamp( $ical_date ) {
		return $this->ical_date_to_date_time( $ical_date )->getTimestamp();
	}

	/**
	 * Returns a date adapted to the calendar time zone depending on the event `TZID`
	 *
	 * @param  array  $event  Event array.
	 * @param  string $key    Array key.
	 * @param  string $format Date format.
	 *
	 * @return string|boolean
	 */
	public function ical_date_with_timezone( array $event, $key, $format = self::DATE_TIME_FORMAT ) {
		if ( ! isset( $event[ $key . '_array' ] ) || ! isset( $event[ $key ] ) ) {
			return false;
		}

		$date_array = $event[ $key . '_array' ];

		if ( 'DURATION' === $key ) {
			$duration  = end( $date_array );
			$date_time = $this->parse_duration( $event['DTSTART'], $duration, null );
		} else {
			$date_time = new \DateTime( $date_array[1], new \DateTimeZone( self::TIME_ZONE_UTC ) );
			$date_time->setTimezone( new \DateTimeZone( $this->calendar_timezone() ) );
		}

		// Force time zone.
		if ( isset( $date_array[0]['TZID'] ) ) {
			$date_time->setTimezone( $this->timezone_string_to_date_timezone( $date_array[0]['TZID'] ) );
		}

		if ( is_null( $format ) ) {
			$output = $date_time;
		} else {
			if ( self::UNIX_FORMAT === $format ) {
				$output = $date_time->getTimestamp();
			} else {
				$output = $date_time->format( $format );
			}
		}

		return $output;
	}

	/**
	 * Performs admin tasks on all events as read from the iCal file.
	 * Adds a Unix timestamp to all `{DTSTART|DTEND|RECURRENCE-ID}_array` arrays
	 * Tracks modified recurrence instances
	 *
	 * @return void
	 */
	protected function process_events() {
		$events = ( isset( $this->cal['VEVENT'] ) ) ? $this->cal['VEVENT'] : array();

		if ( ! empty( $events ) ) {
			foreach ( $events as $key => $an_event ) {
				foreach ( array( 'DTSTART', 'DTEND', 'RECURRENCE-ID' ) as $type ) {
					if ( isset( $an_event[ $type ] ) ) {
						$date = $an_event[ $type . '_array' ][1];

						if ( isset( $an_event[ $type . '_array' ][0]['TZID'] ) ) {
							$timezone = $this->escape_param_text( $an_event[ $type . '_array' ][0]['TZID'] );
							$date     = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $date;
						}

						$an_event[ $type . '_array' ][2] = $this->ical_date_to_unix_timestamp( $date );
						$an_event[ $type . '_array' ][3] = $date;
					}
				}

				if ( isset( $an_event['RECURRENCE-ID'] ) ) {
					$uid = $an_event['UID'];

					if ( ! isset( $this->altered_recurrence_instances[ $uid ] ) ) {
						$this->altered_recurrence_instances[ $uid ] = array();
					}

					$recurrence_date_utc                                = $this->ical_date_to_unix_timestamp( $an_event['RECURRENCE-ID_array'][3] );
					$this->altered_recurrence_instances[ $uid ][ $key ] = $recurrence_date_utc;
				}

				$events[ $key ] = $an_event;
			}

			$event_keys_to_remove = array();

			foreach ( $events as $key => $event ) {
				$checks   = array();
				$checks[] = ! isset( $event['RECURRENCE-ID'] );
				$checks[] = isset( $event['UID'] );
				$checks[] = isset( $event['UID'] ) && isset( $this->altered_recurrence_instances[ $event['UID'] ] );

				if ( (bool) array_product( $checks ) ) {
					$event_dt_start_unix = $this->ical_date_to_unix_timestamp( $event['DTSTART_array'][3] );
					$altered_event_key   = array_search( $event_dt_start_unix, $this->altered_recurrence_instances[ $event['UID'] ], true );

					if ( false !== $altered_event_key ) {
						$event_keys_to_remove[] = $altered_event_key;

						$altered_event = array_replace_recursive( $events[ $key ], $events[ $altered_event_key ] );
						$this->altered_recurrence_instances[ $event['UID'] ]['altered-event'] = array( $key => $altered_event );
					}
				}

				unset( $checks );
			}

			if ( ! empty( $event_keys_to_remove ) ) {
				foreach ( $event_keys_to_remove as $event_key_to_remove ) {
					$events[ $event_key_to_remove ] = null;
				}
			}

			$this->cal['VEVENT'] = $events;
		}
	}

	/**
	 * Processes recurrence rules
	 *
	 * @return void
	 */
	protected function process_recurrences() {
		$events = ( isset( $this->cal['VEVENT'] ) ) ? $this->cal['VEVENT'] : array();

		$recurrence_events     = array();
		$all_recurrence_events = array();

		if ( ! empty( $events ) ) {
			foreach ( $events as $an_event ) {
				if ( isset( $an_event['RRULE'] ) && '' !== $an_event['RRULE'] ) {
					// Tag as generated by a recurrence rule.
					$an_event['RRULE_array'][2] = self::RECURRENCE_EVENT;

					$count_nb = 0;

					$initial_start               = new \DateTime( $an_event['DTSTART_array'][1] );
					$initial_start_timezone_name = $initial_start->getTimezone()->getName();

					if ( isset( $an_event['DTEND'] ) ) {
						$initial_end               = new \DateTime( $an_event['DTEND_array'][1] );
						$initial_end_timezone_name = $initial_end->getTimezone()->getName();
					} else {
						$initial_end_timezone_name = $initial_start_timezone_name;
					}

					// Recurring event, parse RRULE and add appropriate duplicate events.
					$rrules        = array();
					$rrule_strings = explode( ';', $an_event['RRULE'] );

					foreach ( $rrule_strings as $s ) {
						list($k, $v)  = explode( '=', $s );
						$rrules[ $k ] = $v;
					}

					// Get frequency.
					$frequency = $rrules['FREQ'];
					// Get Start timestamp.
					$start_timestamp = $initial_start->getTimestamp();

					if ( isset( $an_event['DTEND'] ) ) {
						$end_timestamp = $initial_end->getTimestamp();
					} elseif ( isset( $an_event['DURATION'] ) ) {
						$duration      = end( $an_event['DURATION_array'] );
						$end_timestamp = $this->parse_duration( $an_event['DTSTART'], $duration );
					} else {
						$end_timestamp = $an_event['DTSTART_array'][2];
					}

					$event_timestamp_offset = $end_timestamp - $start_timestamp;
					// Get Interval.
					$interval = ( isset( $rrules['INTERVAL'] ) && '' !== $rrules['INTERVAL'] ) ? $rrules['INTERVAL'] : 1;

					$day_number = null;
					$weekday    = null;

					if ( in_array( $frequency, array( 'MONTHLY', 'YEARLY' ), true ) && isset( $rrules['BYDAY'] ) && '' !== $rrules['BYDAY'] ) {
						// Deal with BYDAY.
						$by_day     = $rrules['BYDAY'];
						$day_number = intval( $by_day );

						if ( empty( $day_number ) ) { // Returns 0 when no number defined in BYDAY.
							if ( ! isset( $rrules['BYSETPOS'] ) ) {
								$day_number = 1; // Set first as default.
							} elseif ( is_numeric( $rrules['BYSETPOS'] ) ) {
								$day_number = $rrules['BYSETPOS'];

								$by_days_counted = array_count_values( explode( ',', $rrules['BYDAY'] ) );

								if ( array_count_values( $this->weeks['MO'] ) === $by_days_counted ) {
									$weekday = 'day';
								} elseif ( array_count_values( array_slice( $this->weeks['MO'], 0, 5 ) === $by_days_counted ) ) {
									$weekday = 'weekday';
								}
							}
						}

						if ( ! isset( $weekday ) ) {
							$weekday = substr( $by_day, -2 );
						}
					}

					if ( is_int( $this->default_span ) ) {
						$until_default = date_create( 'now' );
						$until_default->modify( $this->default_span . ' year' );
						$until_default->setTime( 23, 59, 59 ); // End of the day.
					}

					// Compute EXDATEs.
					$exdates = $this->parse_ex_dates( $an_event );

					$count_orig = null;

					if ( isset( $rrules['UNTIL'] ) ) {
						// Get Until.
						$until = strtotime( $rrules['UNTIL'] );
						if ( $until > strtotime( '+' . $this->default_span . ' years' ) ) {
							$until = strtotime( '+' . $this->default_span . ' years' );
						}
					} elseif ( isset( $rrules['COUNT'] ) ) {
						$count_orig = ( is_numeric( $rrules['COUNT'] ) && $rrules['COUNT'] > 1 ) ? $rrules['COUNT'] : 0;

						// Increment count by the number of excluded dates.
						$count_orig += count( $exdates );

						// Remove one to exclude the occurrence that initialises the rule.
						$count = ( $count_orig - 1 );

						if ( $interval >= 2 ) {
							$count += ( $count > 0 ) ? ( $count * $interval ) : 0;
						}

						$count_nb = 1;
						$offset   = "+{$count} " . $this->frequency_conversion[ $frequency ];
						$until    = strtotime( $offset, $start_timestamp );

						if ( in_array( $frequency, array( 'MONTHLY', 'YEARLY' ), true )
							&& isset( $rrules['BYDAY'] ) && '' !== $rrules['BYDAY']
						) {
							$dtstart = date_create( $an_event['DTSTART'] );

							if ( ! $dtstart ) {
								continue;
							}

							for ( $i = 1; $i <= $count; $i++ ) {
								$dtstart_clone = clone $dtstart;
								$dtstart_clone->modify( 'next ' . $this->frequency_conversion[ $frequency ] );
								$offset = "{$this->convert_day_ordinal_to_positive($day_number, $weekday, $dtstart_clone)} {$this->weekdays[$weekday]} " . $dtstart_clone->format( 'F Y H:i:01' );
								$dtstart->modify( $offset );
							}

							// Jumping X months forwards doesn't mean.
							// the end date will fall on the same day defined in BYDAY.
							// Use the largest of these to ensure we are going far enough.
							// in the future to capture our final end day.
							$until = max( $until, $dtstart->format( self::UNIX_FORMAT ) );
						}

						unset( $offset );
					} elseif ( isset( $until_default ) ) {
						$until = $until_default->getTimestamp();
					}

					$until = intval( $until );

					// Decide how often to add events and do so.
					switch ( $frequency ) {
						case 'DAILY':
							// Simply add a new event each interval of days until UNTIL is reached.
							$offset              = "+{$interval} day";
							$recurring_timestamp = strtotime( $offset, $start_timestamp );

							while ( $recurring_timestamp <= $until ) {
								$dayrecurring_timestamp = $recurring_timestamp;

								// Adjust time zone from initial event.
								$dayrecurring_offset = 0;
								if ( $this->use_timezone_with_r_rules ) {
									$recurring_timezone = \DateTime::createFromFormat( self::UNIX_FORMAT, $dayrecurring_timestamp );
									$recurring_timezone->setTimezone( $initial_start->getTimezone() );
									$dayrecurring_offset     = $recurring_timezone->getOffset();
									$dayrecurring_timestamp += $dayrecurring_offset;
								}

								// Add event.
								$an_event['DTSTART']          = gmdate( self::DATE_TIME_FORMAT, $dayrecurring_timestamp ) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );
								$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
								$an_event['DTSTART_array'][2] = $dayrecurring_timestamp;
								$an_event['DTEND_array']      = $an_event['DTSTART_array'];
								$an_event['DTEND_array'][2]  += $event_timestamp_offset;
								$an_event['DTEND']            = gmdate(
									self::DATE_TIME_FORMAT,
									$an_event['DTEND_array'][2]
								) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );

								$an_event['DTEND_array'][1] = $an_event['DTEND'];

								// Exclusions.
								$is_excluded = array_filter(
									$exdates,
									function ( $exdate ) use ( $an_event, $dayrecurring_offset ) {
										return self::is_ex_date_match( $exdate, $an_event, $dayrecurring_offset );
									}
								);

								if ( isset( $an_event['UID'] ) ) {
									$search_date = $an_event['DTSTART'];
									if ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
										$timezone    = $this->escape_param_text( $an_event['DTSTART_array'][0]['TZID'] );
										$search_date = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $search_date;
									}

									if ( isset( $this->altered_recurrence_instances[ $an_event['UID'] ] ) ) {
										$search_date_utc = $this->ical_date_to_unix_timestamp( $search_date );
										if ( in_array( $search_date_utc, $this->altered_recurrence_instances[ $an_event['UID'] ], true ) ) {
											$is_excluded = true;
										}
									}
								}

								if ( ! $is_excluded ) {
									$an_event            = $this->process_event_ical_datetime( $an_event );
									$recurrence_events[] = $an_event;
									$this->event_count++;

									// If RRULE[COUNT] is reached then break.
									if ( isset( $rrules['COUNT'] ) ) {
										$count_nb++;

										if ( $count_nb >= $count_orig ) {
											break;
										}
									}
								}

								// Move forwards.
								$recurring_timestamp = strtotime( $offset, $recurring_timestamp );
							}

							$recurrence_events     = $this->trim_to_recurrence_count( $rrules, $recurrence_events );
							$all_recurrence_events = array_merge( $all_recurrence_events, $recurrence_events );
							$recurrence_events     = array(); // Reset.
							break;

						case 'WEEKLY':
							// Create offset.
							$offset = "+{$interval} week";

							$wkst   = ( isset( $rrules['WKST'] ) && in_array( $rrules['WKST'], array( 'SA', 'SU', 'MO' ), true ) ) ? $rrules['WKST'] : $this->default_week_start;
							$a_week = $this->weeks[ $wkst ];
							$days   = array(
								'SA' => 'Saturday',
								'SU' => 'Sunday',
								'MO' => 'Monday',
							);

							// Build list of days of week to add events.
							$weekdays = $a_week;

							if ( isset( $rrules['BYDAY'] ) && '' !== $rrules['BYDAY'] ) {
								$by_days = explode( ',', $rrules['BYDAY'] );
							} else {
								// A textual representation of a day, two letters (e.g. SU).
								$by_days = array( mb_substr( strtoupper( $initial_start->format( 'D' ) ), 0, 2 ) );
							}

							// Get timestamp of first day of start week.
							$weekrecurring_timestamp = ( strcasecmp( $initial_start->format( 'l' ), explode( ' ', $this->weekdays[ $wkst ] )[0] ) === 0 )
								? $start_timestamp
								: strtotime( "last {$days[$wkst]} " . $initial_start->format( 'H:i:s' ), $start_timestamp );

							// Step through weeks.
							while ( $weekrecurring_timestamp <= $until ) {
								$dayrecurring_timestamp = $weekrecurring_timestamp;

								// Adjust time zone from initial event.
								$dayrecurring_offset = 0;
								if ( $this->use_timezone_with_r_rules ) {
									$day_recurring_timezone = \DateTime::createFromFormat( self::UNIX_FORMAT, $dayrecurring_timestamp );
									$day_recurring_timezone->setTimezone( $initial_start->getTimezone() );
									$dayrecurring_offset     = $day_recurring_timezone->getOffset();
									$dayrecurring_timestamp += $dayrecurring_offset;
								}

								foreach ( $weekdays as $day ) {
									// Check if day should be added.
									if ( in_array( $day, $by_days, true ) && $dayrecurring_timestamp > $start_timestamp
										&& $dayrecurring_timestamp <= $until
									) {
										// Add event.
										$an_event['DTSTART']          = gmdate( self::DATE_TIME_FORMAT, $dayrecurring_timestamp ) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );
										$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
										$an_event['DTSTART_array'][2] = $dayrecurring_timestamp;
										$an_event['DTEND_array']      = $an_event['DTSTART_array'];
										$an_event['DTEND_array'][2]  += $event_timestamp_offset;
										$an_event['DTEND']            = gmdate(
											self::DATE_TIME_FORMAT,
											$an_event['DTEND_array'][2]
										) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );

										$an_event['DTEND_array'][1] = $an_event['DTEND'];

										// Exclusions.
										$is_excluded = array_filter(
											$exdates,
											function ( $exdate ) use ( $an_event, $dayrecurring_offset ) {
												return self::is_ex_date_match( $exdate, $an_event, $dayrecurring_offset );
											}
										);

										if ( isset( $an_event['UID'] ) ) {
											$search_date = $an_event['DTSTART'];
											if ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
												$timezone    = $this->escape_param_text( $an_event['DTSTART_array'][0]['TZID'] );
												$search_date = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $search_date;
											}

											if ( isset( $this->altered_recurrence_instances[ $an_event['UID'] ] ) ) {
												$search_date_utc = $this->ical_date_to_unix_timestamp( $search_date );
												if ( in_array( $search_date_utc, $this->altered_recurrence_instances[ $an_event['UID'] ], true ) ) {
													$is_excluded = true;
												}
											}
										}

										if ( ! $is_excluded ) {
											$an_event            = $this->process_event_ical_datetime( $an_event );
											$recurrence_events[] = $an_event;
											$this->event_count++;

											// If RRULE[COUNT] is reached then break.
											if ( isset( $rrules['COUNT'] ) ) {
												$count_nb++;

												if ( $count_nb >= $count_orig ) {
													break 2;
												}
											}
										}
									}

									// Move forwards a day.
									$dayrecurring_timestamp = strtotime( '+1 day', $dayrecurring_timestamp );
								}

								// Move forwards $interval weeks.
								$weekrecurring_timestamp = strtotime( $offset, $weekrecurring_timestamp );
							}

							$recurrence_events     = $this->trim_to_recurrence_count( $rrules, $recurrence_events );
							$all_recurrence_events = array_merge( $all_recurrence_events, $recurrence_events );
							$recurrence_events     = array(); // Reset.
							break;

						case 'MONTHLY':
							// Create offset.
							$recurring_timestamp = $start_timestamp;
							$offset              = "+{$interval} month";

							if ( isset( $rrules['BYMONTHDAY'] ) && '' !== $rrules['BYMONTHDAY'] ) {
								// Deal with BYMONTHDAY.
								$monthdays = explode( ',', $rrules['BYMONTHDAY'] );

								while ( $recurring_timestamp <= $until ) {
									foreach ( $monthdays as $key => $monthday ) {
										$month_recurring_timestamp = null;

										if ( 0 === $key ) {
											// Ensure original event conforms to monthday rule.
											$an_event['DTSTART'] = gmdate(
												'Ym' . sprintf( '%02d', $monthday ) . '\T' . self::TIME_FORMAT,
												strtotime( $an_event['DTSTART'] )
											) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );

											$an_event['DTEND'] = gmdate(
												'Ym' . sprintf( '%02d', $monthday ) . '\T' . self::TIME_FORMAT,
												isset( $an_event['DURATION'] )
														? $this->parse_duration( $an_event['DTSTART'], end( $an_event['DURATION_array'] ) )
														: strtotime( $an_event['DTEND'] )
											) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );

											$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
											$an_event['DTSTART_array'][2] = $this->ical_date_to_unix_timestamp( $an_event['DTSTART'] );
											$an_event['DTEND_array'][1]   = $an_event['DTEND'];
											$an_event['DTEND_array'][2]   = $this->ical_date_to_unix_timestamp( $an_event['DTEND'] );

											// Ensure recurring timestamp confirms to BYMONTHDAY rule.
											$month_recurring_date_time = new \DateTime( '@' . $recurring_timestamp );
											$month_recurring_date_time->setDate(
												$month_recurring_date_time->format( 'Y' ),
												$month_recurring_date_time->format( 'm' ),
												$monthday
											);
											$month_recurring_timestamp = $month_recurring_date_time->getTimestamp();
										}

										// Adjust time zone from initial event.
										$monthrecurring_offset = 0;
										if ( $this->use_timezone_with_r_rules ) {
											$recurring_timezone = \DateTime::createFromFormat( self::UNIX_FORMAT, $month_recurring_timestamp );
											$recurring_timezone->setTimezone( $initial_start->getTimezone() );
											$monthrecurring_offset      = $recurring_timezone->getOffset();
											$month_recurring_timestamp += $monthrecurring_offset;
										}

										if ( ( $month_recurring_timestamp > $start_timestamp ) && ( $month_recurring_timestamp <= $until ) ) {
											// Add event.
											$an_event['DTSTART']          = gmdate(
												'Ym' . sprintf( '%02d', $monthday ) . '\T' . self::TIME_FORMAT,
												$month_recurring_timestamp
											) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );
											$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
											$an_event['DTSTART_array'][2] = $month_recurring_timestamp;
											$an_event['DTEND_array']      = $an_event['DTSTART_array'];
											$an_event['DTEND_array'][2]  += $event_timestamp_offset;
											$an_event['DTEND']            = gmdate(
												self::DATE_TIME_FORMAT,
												$an_event['DTEND_array'][2]
											) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );
											$an_event['DTEND_array'][1]   = $an_event['DTEND'];

											// Exclusions.
											$is_excluded = array_filter(
												$exdates,
												function ( $exdate ) use ( $an_event, $monthrecurring_offset ) {
													return self::is_ex_date_match( $exdate, $an_event, $monthrecurring_offset );
												}
											);

											if ( isset( $an_event['UID'] ) ) {
												$search_date = $an_event['DTSTART'];
												if ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
													$timezone    = $this->escape_param_text( $an_event['DTSTART_array'][0]['TZID'] );
													$search_date = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $search_date;
												}

												if ( isset( $this->altered_recurrence_instances[ $an_event['UID'] ] ) ) {
													$search_date_utc = $this->ical_date_to_unix_timestamp( $search_date );
													if ( in_array( $search_date_utc, $this->altered_recurrence_instances[ $an_event['UID'] ], true ) ) {
														$is_excluded = true;
													}
												}
											}

											if ( ! $is_excluded ) {
												$an_event            = $this->process_event_ical_datetime( $an_event );
												$recurrence_events[] = $an_event;
												$this->event_count++;

												// If RRULE[COUNT] is reached then break.
												if ( isset( $rrules['COUNT'] ) ) {
													$count_nb++;

													if ( $count_nb >= $count_orig ) {
														break 2;
													}
												}
											}
										}
									}

									// Move forwards.
									$recurring_timestamp = strtotime( $offset, $recurring_timestamp );
								}
							} elseif ( isset( $rrules['BYDAY'] ) && '' !== $rrules['BYDAY'] ) {
								while ( $recurring_timestamp <= $until ) {
									$month_recurring_timestamp = $recurring_timestamp;

									// Adjust time zone from initial event.
									$monthrecurring_offset = 0;

									if ( $this->use_timezone_with_r_rules ) {
										$recurring_timezone = \DateTime::createFromFormat( self::UNIX_FORMAT, $month_recurring_timestamp );
										$recurring_timezone->setTimezone( $initial_start->getTimezone() );
										$monthrecurring_offset      = $recurring_timezone->getOffset();
										$month_recurring_timestamp += $monthrecurring_offset;
									}

									$event_start_desc      = "{$this->convert_day_ordinal_to_positive($day_number, $weekday, $month_recurring_timestamp)} {$this->weekdays[$weekday]} "
										. gmdate( self::DATE_TIME_FORMAT_PRETTY, $month_recurring_timestamp );
									$event_start_timestamp = strtotime( $event_start_desc );

									if ( intval( $rrules['BYDAY'] ) === 0 ) {
										$last_day_desc = "last {$this->weekdays[$weekday]} "
											. gmdate( self::DATE_TIME_FORMAT_PRETTY, $month_recurring_timestamp );
									} else {
										$last_day_desc = "{$this->convert_day_ordinal_to_positive($day_number, $weekday, $month_recurring_timestamp)} {$this->weekdays[$weekday]} "
											. gmdate( self::DATE_TIME_FORMAT_PRETTY, $month_recurring_timestamp );
									}

									$last_day_time_stamp = strtotime( $last_day_desc );

									do {
										// Prevent 5th day of a month from showing up on the next month.
										// If BYDAY and the event falls outside the current month, skip the event.

										$compare_current_month = gmdate( 'F', $month_recurring_timestamp );
										$compare_event_month   = gmdate( 'F', $event_start_timestamp );

										if ( $compare_current_month !== $compare_event_month ) {
											$month_recurring_timestamp = strtotime( $offset, $month_recurring_timestamp );
											continue;
										}

										if ( $event_start_timestamp > $start_timestamp && $event_start_timestamp <= $until ) {
											$an_event['DTSTART']          = gmdate( self::DATE_TIME_FORMAT, $event_start_timestamp ) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );
											$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
											$an_event['DTSTART_array'][2] = $event_start_timestamp;
											$an_event['DTEND_array']      = $an_event['DTSTART_array'];
											$an_event['DTEND_array'][2]  += $event_timestamp_offset;
											$an_event['DTEND']            = gmdate(
												self::DATE_TIME_FORMAT,
												$an_event['DTEND_array'][2]
											) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );
											$an_event['DTEND_array'][1]   = $an_event['DTEND'];

											// Exclusions.
											$is_excluded = array_filter(
												$exdates,
												function ( $exdate ) use ( $an_event, $monthrecurring_offset ) {
													return self::is_ex_date_match( $exdate, $an_event, $monthrecurring_offset );
												}
											);

											if ( isset( $an_event['UID'] ) ) {
												$search_date = $an_event['DTSTART'];
												if ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
													$timezone    = $this->escape_param_text( $an_event['DTSTART_array'][0]['TZID'] );
													$search_date = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $search_date;
												}

												if ( isset( $this->altered_recurrence_instances[ $an_event['UID'] ] ) ) {
													$search_date_utc = $this->ical_date_to_unix_timestamp( $search_date );
													if ( in_array( $search_date_utc, $this->altered_recurrence_instances[ $an_event['UID'] ], true ) ) {
														$is_excluded = true;
													}
												}
											}

											if ( ! $is_excluded ) {
												$an_event            = $this->process_event_ical_datetime( $an_event );
												$recurrence_events[] = $an_event;
												$this->event_count++;

												// If RRULE[COUNT] is reached then break.
												if ( isset( $rrules['COUNT'] ) ) {
													$count_nb++;

													if ( $count_nb >= $count_orig ) {
														break 2;
													}
												}
											}
										}

										if ( isset( $rrules['BYSETPOS'] ) ) {
											// BYSETPOS is defined so skip.
											// looping through each week.
											$last_day_time_stamp = $event_start_timestamp;
										}

										$event_start_timestamp += self::SECONDS_IN_A_WEEK;
									} while ( $event_start_timestamp <= $last_day_time_stamp );

								}
							}

							$recurrence_events     = $this->trim_to_recurrence_count( $rrules, $recurrence_events );
							$all_recurrence_events = array_merge( $all_recurrence_events, $recurrence_events );
							$recurrence_events     = array(); // Reset.
							break;

						case 'YEARLY':
							// Create offset.
							$recurring_timestamp = $start_timestamp;
							$offset              = "+{$interval} year";

							// Deal with BYMONTH.
							if ( isset( $rrules['BYMONTH'] ) && '' !== $rrules['BYMONTH'] ) {
								$bymonths = explode( ',', $rrules['BYMONTH'] );
							} else {
								$bymonths = array();
							}

							// Check if BYDAY rule exists.
							if ( isset( $rrules['BYDAY'] ) && '' !== $rrules['BYDAY'] ) {
								while ( $recurring_timestamp <= $until ) {
									$yearrecurring_timestamp = $recurring_timestamp;

									// Adjust time zone from initial event.
									$yearrecurring_offset = 0;

									if ( $this->use_timezone_with_r_rules ) {
										$recurring_timezone = \DateTime::createFromFormat( self::UNIX_FORMAT, $yearrecurring_timestamp );
										$recurring_timezone->setTimezone( $initial_start->getTimezone() );
										$yearrecurring_offset     = $recurring_timezone->getOffset();
										$yearrecurring_timestamp += $yearrecurring_offset;
									}

									foreach ( $bymonths as $bymonth ) {
										$event_start_desc      = "{$this->convert_day_ordinal_to_positive($day_number, $weekday, $yearrecurring_timestamp)} {$this->weekdays[$weekday]}"
											. " {$this->month_names[$bymonth]} "
											. gmdate( 'Y H:i:s', $yearrecurring_timestamp );
										$event_start_timestamp = strtotime( $event_start_desc );

										if ( intval( $rrules['BYDAY'] ) === 0 ) {
											$last_day_desc = "last {$this->weekdays[$weekday]}"
												. " {$this->month_names[$bymonth]} "
												. gmdate( 'Y H:i:s', $yearrecurring_timestamp );
										} else {
											$last_day_desc = "{$this->convert_day_ordinal_to_positive($day_number, $weekday, $yearrecurring_timestamp)} {$this->weekdays[$weekday]}"
												. " {$this->month_names[$bymonth]} "
												. gmdate( 'Y H:i:s', $yearrecurring_timestamp );
										}

										$last_day_time_stamp = strtotime( $last_day_desc );

										do {
											if ( $event_start_timestamp > $start_timestamp && $event_start_timestamp <= $until ) {
												$an_event['DTSTART']          = gmdate( self::DATE_TIME_FORMAT, $event_start_timestamp ) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );
												$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
												$an_event['DTSTART_array'][2] = $event_start_timestamp;
												$an_event['DTEND_array']      = $an_event['DTSTART_array'];
												$an_event['DTEND_array'][2]  += $event_timestamp_offset;
												$an_event['DTEND']            = gmdate(
													self::DATE_TIME_FORMAT,
													$an_event['DTEND_array'][2]
												) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );

												$an_event['DTEND_array'][1] = $an_event['DTEND'];

												// Exclusions.
												$is_excluded = array_filter(
													$exdates,
													function ( $exdate ) use ( $an_event, $yearrecurring_offset ) {
														return self::is_ex_date_match( $exdate, $an_event, $yearrecurring_offset );
													}
												);

												if ( isset( $an_event['UID'] ) ) {
													$search_date = $an_event['DTSTART'];
													if ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
														$timezone    = $this->escape_param_text( $an_event['DTSTART_array'][0]['TZID'] );
														$search_date = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $search_date;
													}

													if ( isset( $this->altered_recurrence_instances[ $an_event['UID'] ] ) ) {
														$search_date_utc = $this->ical_date_to_unix_timestamp( $search_date );
														if ( in_array( $search_date_utc, $this->altered_recurrence_instances[ $an_event['UID'] ], true ) ) {
															$is_excluded = true;
														}
													}
												}

												if ( ! $is_excluded ) {
													$an_event            = $this->process_event_ical_datetime( $an_event );
													$recurrence_events[] = $an_event;
													$this->event_count++;

													// If RRULE[COUNT] is reached then break.
													if ( isset( $rrules['COUNT'] ) ) {
														$count_nb++;

														if ( $count_nb >= $count_orig ) {
															break 3;
														}
													}
												}
											}

											$event_start_timestamp += self::SECONDS_IN_A_WEEK;
										} while ( $event_start_timestamp <= $last_day_time_stamp );
									}

									// Move forwards.
									$recurring_timestamp = strtotime( $offset, $recurring_timestamp );
								}
							} else {
								$day = $initial_start->format( 'd' );

								// Step through years.
								while ( $recurring_timestamp <= $until ) {
									$yearrecurring_timestamp = $recurring_timestamp;

									// Adjust time zone from initial event.
									$yearrecurring_offset = 0;
									if ( $this->use_timezone_with_r_rules ) {
										$recurring_timezone = \DateTime::createFromFormat( self::UNIX_FORMAT, $yearrecurring_timestamp );
										$recurring_timezone->setTimezone( $initial_start->getTimezone() );
										$yearrecurring_offset     = $recurring_timezone->getOffset();
										$yearrecurring_timestamp += $yearrecurring_offset;
									}

									$event_start_descs = array();
									if ( isset( $rrules['BYMONTH'] ) && '' !== $rrules['BYMONTH'] ) {
										foreach ( $bymonths as $bymonth ) {
											array_push( $event_start_descs, "{$day} {$this->month_names[$bymonth]} " . gmdate( 'Y H:i:s', $yearrecurring_timestamp ) );
										}
									} else {
										array_push( $event_start_descs, $day . gmdate( self::DATE_TIME_FORMAT_PRETTY, $yearrecurring_timestamp ) );
									}

									foreach ( $event_start_descs as $event_start_desc ) {
										$event_start_timestamp = strtotime( $event_start_desc );

										if ( $event_start_timestamp > $start_timestamp && $until >= $event_start_timestamp ) {
											$an_event['DTSTART']          = gmdate( self::DATE_TIME_FORMAT, $event_start_timestamp ) . ( ( 'Z' === $initial_start_timezone_name ) ? 'Z' : '' );
											$an_event['DTSTART_array'][1] = $an_event['DTSTART'];
											$an_event['DTSTART_array'][2] = $event_start_timestamp;
											$an_event['DTEND_array']      = $an_event['DTSTART_array'];
											$an_event['DTEND_array'][2]  += $event_timestamp_offset;
											$an_event['DTEND']            = gmdate(
												self::DATE_TIME_FORMAT,
												$an_event['DTEND_array'][2]
											) . ( ( 'Z' === $initial_end_timezone_name ) ? 'Z' : '' );
											$an_event['DTEND_array'][1]   = $an_event['DTEND'];

											// Exclusions.
											$is_excluded = array_filter(
												$exdates,
												function ( $exdate ) use ( $an_event, $yearrecurring_offset ) {
													return self::is_ex_date_match( $exdate, $an_event, $yearrecurring_offset );
												}
											);

											if ( isset( $an_event['UID'] ) ) {
												$search_date = $an_event['DTSTART'];
												if ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
													$timezone    = $this->escape_param_text( $an_event['DTSTART_array'][0]['TZID'] );
													$search_date = sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) . $search_date;
												}

												if ( isset( $this->altered_recurrence_instances[ $an_event['UID'] ] ) ) {
													$search_date_utc = $this->ical_date_to_unix_timestamp( $search_date );
													if ( in_array( $search_date_utc, $this->altered_recurrence_instances[ $an_event['UID'] ], true ) ) {
														$is_excluded = true;
													}
												}
											}

											if ( ! $is_excluded ) {
												$an_event            = $this->process_event_ical_datetime( $an_event );
												$recurrence_events[] = $an_event;
												$this->event_count++;

												// If RRULE[COUNT] is reached then break.
												if ( isset( $rrules['COUNT'] ) ) {
													$count_nb++;

													if ( $count_nb >= $count_orig ) {
														break 2;
													}
												}
											}
										}
									}

									// Move forwards.
									$recurring_timestamp = strtotime( $offset, $recurring_timestamp );
								}
							}

							$recurrence_events     = $this->trim_to_recurrence_count( $rrules, $recurrence_events );
							$all_recurrence_events = array_merge( $all_recurrence_events, $recurrence_events );
							$recurrence_events     = array(); // Reset.
							break;
					}
				}
			}

			$events = array_merge( $events, $all_recurrence_events );

			$this->cal['VEVENT'] = $events;
		}
	}

	/**
	 * Processes date conversions using the time zone
	 *
	 * Add keys `DTSTART_tz` and `DTEND_tz` to each Event
	 * These keys contain dates adapted to the calendar
	 * time zone depending on the event `TZID`.
	 *
	 * @return void
	 */
	protected function process_date_conversions() {
		$events = ( isset( $this->cal['VEVENT'] ) ) ? $this->cal['VEVENT'] : array();

		if ( ! empty( $events ) ) {
			foreach ( $events as $key => $an_event ) {
				if ( ! $this->is_valid_date( $an_event['DTSTART'] ) ) {
					unset( $events[ $key ] );
					$this->event_count--;

					continue;
				}

				if ( $this->use_timezone_with_r_rules && isset( $an_event['RRULE_array'][2] ) && self::RECURRENCE_EVENT === $an_event['RRULE_array'][2] ) {
					$events[ $key ]['DTSTART_tz'] = $an_event['DTSTART'];
					$events[ $key ]['DTEND_tz']   = isset( $an_event['DTEND'] ) ? $an_event['DTEND'] : $an_event['DTSTART'];
				} else {
					$events[ $key ]['DTSTART_tz'] = $this->ical_date_with_timezone( $an_event, 'DTSTART' );

					if ( $this->ical_date_with_timezone( $an_event, 'DTEND' ) ) {
						$events[ $key ]['DTEND_tz'] = $this->ical_date_with_timezone( $an_event, 'DTEND' );
					} elseif ( $this->ical_date_with_timezone( $an_event, 'DURATION' ) ) {
						$events[ $key ]['DTEND_tz'] = $this->ical_date_with_timezone( $an_event, 'DURATION' );
					} elseif ( $this->ical_date_with_timezone( $an_event, 'DTSTART' ) ) {
						$events[ $key ]['DTEND_tz'] = $this->ical_date_with_timezone( $an_event, 'DTSTART' );
					}
				}
			}

			$this->cal['VEVENT'] = $events;
		}
	}

	/**
	 * Extends the `{DTSTART|DTEND|RECURRENCE-ID}_array`
	 * array to include an iCal date time for each event
	 * (`TZID=Timezone:YYYYMMDD[T]HHMMSS`)
	 *
	 * @param  array   $event Event array.
	 * @param  integer $index Index value.
	 *
	 * @return array
	 */
	protected function process_event_ical_datetime( array $event, $index = 3 ) {
		$calendar_timezone = $this->calendar_timezone( true );

		foreach ( array( 'DTSTART', 'DTEND', 'RECURRENCE-ID' ) as $type ) {
			if ( isset( $event[ "{$type}_array" ] ) ) {
				$timezone                           = ( isset( $event[ "{$type}_array" ][0]['TZID'] ) ) ? $event[ "{$type}_array" ][0]['TZID'] : $calendar_timezone;
				$timezone                           = $this->escape_param_text( $timezone );
				$event[ "{$type}_array" ][ $index ] = ( ( is_null( $timezone ) ) ? '' : sprintf( self::ICAL_DATE_TIME_TEMPLATE, $timezone ) ) . $event[ "{$type}_array" ][1];
				$event[ "{$type}_array" ][2]        = $this->ical_date_to_unix_timestamp( $event[ "{$type}_array" ][3] );
			}
		}

		return $event;
	}

	/**
	 * Returns an array of Events.
	 * Every event is a class with the event details being properties within it.
	 *
	 * @return array
	 */
	public function events() {
		$array  = $this->cal;
		$array  = isset( $array['VEVENT'] ) ? $array['VEVENT'] : array();
		$events = array();

		if ( ! empty( $array ) ) {
			foreach ( $array as $event ) {
				$events[] = new CoBlocks_ICal_Event( $event );
			}
		}

		return $events;
	}

	/**
	 * Returns the calendar name
	 *
	 * @return string
	 */
	public function calendar_name() {
		return isset( $this->cal['VCALENDAR']['X-WR-CALNAME'] ) ? $this->cal['VCALENDAR']['X-WR-CALNAME'] : '';
	}

	/**
	 * Returns the calendar description
	 *
	 * @return string
	 */
	public function calendar_description() {
		return isset( $this->cal['VCALENDAR']['X-WR-CALDESC'] ) ? $this->cal['VCALENDAR']['X-WR-CALDESC'] : '';
	}

	/**
	 * Returns the calendar time zone
	 *
	 * @param  boolean $ignore_utc Whether or not to ignore UTC.
	 *
	 * @return string
	 */
	public function calendar_timezone( $ignore_utc = false ) {
		if ( isset( $this->cal['VCALENDAR']['X-WR-TIMEZONE'] ) ) {
			$timezone = $this->cal['VCALENDAR']['X-WR-TIMEZONE'];
		} elseif ( isset( $this->cal['VTIMEZONE']['TZID'] ) ) {
			$timezone = $this->cal['VTIMEZONE']['TZID'];
		} else {
			$timezone = $this->default_time_zone;
		}

		// Validate the time zone, falling back to the time zone set in the PHP environment.
		$timezone = $this->timezone_string_to_date_timezone( $timezone )->getName();

		if ( $ignore_utc && strtoupper( $timezone ) === self::TIME_ZONE_UTC ) {
			return null;
		}

		return $timezone;
	}

	/**
	 * Returns an array of arrays with all free/busy events.
	 * Every event is an associative array and each property
	 * is an element it.
	 *
	 * @return array
	 */
	public function free_busy_events() {
		$array = $this->cal;

		return isset( $array['VFREEBUSY'] ) ? $array['VFREEBUSY'] : array();
	}

	/**
	 * Returns a boolean value whether the current calendar has events or not
	 *
	 * @return boolean
	 */
	public function has_events() {
		return ( count( $this->events() ) > 0 ) ? true : false;
	}

	/**
	 * Returns a sorted array of the events in a given range,
	 * or an empty array if no events exist in the range.
	 *
	 * Events will be returned if the start or end date is contained within the
	 * range (inclusive), or if the event starts before and end after the range.
	 *
	 * If a start date is not specified or of a valid format, then the start
	 * of the range will default to the current time and date of the server.
	 *
	 * If an end date is not specified or of a valid format, then the end of
	 * the range will default to the current time and date of the server,
	 * plus 20 years.
	 *
	 * Note that this function makes use of Unix timestamps. This might be a
	 * problem for events on, during, or after 29 Jan 2038.
	 * See https://en.wikipedia.org/wiki/Unix_time#Representing_the_number
	 *
	 * @param  string|null $range_start Date range start.
	 * @param  string|null $range_end   Date range end.
	 *
	 * @return array
	 *
	 * @throws \Exception Exception thrown on error.
	 */
	public function events_from_range( $range_start = null, $range_end = null ) {
		// Sort events before processing range.
		$events = $this->sort_events_with_order( $this->events(), SORT_ASC );

		if ( empty( $events ) ) {
			return array();
		}

		$extended_events = array();

		if ( ! is_null( $range_start ) ) {
			try {
				$range_start = new \DateTime( $range_start, new \DateTimeZone( $this->default_time_zone ) );
			} catch ( \Exception $e ) {
				$range_start = false;
			}
		} else {
			$range_start = new \DateTime( 'now', new \DateTimeZone( $this->default_time_zone ) );
		}

		if ( ! is_null( $range_end ) ) {
			try {
				$range_end = new \DateTime( $range_end, new \DateTimeZone( $this->default_time_zone ) );
			} catch ( \Exception $e ) {
				$range_end = false;
			}
		} else {
			$range_end = new \DateTime( 'now', new \DateTimeZone( $this->default_time_zone ) );
			$range_end->modify( '+20 years' );
		}

		// If start and end are identical and are dates with no times...
		if ( $range_end->format( 'His' ) === 0 && $range_start->getTimestamp() === $range_end->getTimestamp() ) {
			$range_end->modify( '+1 day' );
		}

		$range_start = $range_start->getTimestamp();
		$range_end   = $range_end->getTimestamp();

		foreach ( $events as $an_event ) {
			$event_start = $an_event->dtstart_array[2];
			$event_end   = ( isset( $an_event->dtend_array[2] ) ) ? $an_event->dtend_array[2] : null;

			if ( ( $event_start >= $range_start && $event_start < $range_end ) // Event start date contained in the range.
				|| ( null !== $event_end
					&& (
						( $event_end > $range_start && $event_end <= $range_end ) // Event end date contained in the range.
						|| ( $event_start < $range_start && $event_end > $range_end ) // Event starts before and finishes after range.
					)
				)
			) {
				$extended_events[] = $an_event;
			}
		}

		if ( empty( $extended_events ) ) {
			return array();
		}

		return $extended_events;
	}

	/**
	 * Returns a sorted array of the events following a given string,
	 * or `false` if no events exist in the range.
	 *
	 * @param  string $interval A date with relative parts.
	 *
	 * @return array
	 */
	public function events_from_interval( $interval ) {
		$range_start = new \DateTime( 'now', new \DateTimeZone( $this->default_time_zone ) );
		$range_end   = new \DateTime( 'now', new \DateTimeZone( $this->default_time_zone ) );

		$date_interval = \DateInterval::createFromDateString( $interval );
		$range_end->add( $date_interval );

		return $this->events_from_range( $range_start->format( 'Y-m-d' ), $range_end->format( 'Y-m-d' ) );
	}

	/**
	 * Sorts events based on a given sort order
	 *
	 * @param  array   $events     Events array.
	 * @param  integer $sort_order Either SORT_ASC, SORT_DESC, SORT_REGULAR, SORT_NUMERIC, SORT_STRING.
	 *
	 * @return array
	 */
	public function sort_events_with_order( array $events, $sort_order = SORT_ASC ) {
		$extended_events = array();
		$timestamp       = array();

		foreach ( $events as $key => $an_event ) {
			$extended_events[] = $an_event;
			$timestamp[ $key ] = $an_event->dtstart_array[2];
		}

		array_multisort( $timestamp, $sort_order, $extended_events );

		return $extended_events;
	}

	/**
	 * Checks if a time zone is valid (IANA, CLDR, or Windows)
	 *
	 * @param  string $timezone Timezone value.
	 *
	 * @return boolean
	 */
	protected function is_valid_timezone_id( $timezone ) {
		return ( $this->is_valid_iana_timezone_id( $timezone ) !== false
			|| $this->is_valid_cldr_timezone_id( $timezone ) !== false
			|| $this->is_valid_windows_timezone_id( $timezone ) !== false );
	}

	/**
	 * Checks if a time zone is a valid IANA time zone
	 *
	 * @param  string $timezone Timezone value.
	 *
	 * @return boolean
	 */
	protected function is_valid_iana_timezone_id( $timezone ) {
		if ( in_array( $timezone, $this->valid_iana_timezones, true ) ) {
			return true;
		}

		$valid = array();
		$tza   = timezone_abbreviations_list();

		foreach ( $tza as $zone ) {
			foreach ( $zone as $item ) {
				$valid[ $item['timezone_id'] ] = true;
			}
		}

		unset( $valid[''] );

		if ( isset( $valid[ $timezone ] ) || in_array( $timezone, timezone_identifiers_list( \DateTimeZone::ALL_WITH_BC ), true ) ) {
			$this->valid_iana_timezones[] = $timezone;

			return true;
		}

		return false;
	}

	/**
	 * Checks if a time zone is a valid CLDR time zone
	 *
	 * @param  string $timezone Timezone value.
	 * @return boolean
	 */
	public function is_valid_cldr_timezone_id( $timezone ) {
		return array_key_exists( html_entity_decode( $timezone ), self::$cldr_timezones_map );
	}

	/**
	 * Checks if a time zone is a recognised Windows (non-CLDR) time zone
	 *
	 * @param  string $timezone Timezone value.
	 * @return boolean
	 */
	public function is_valid_windows_timezone_id( $timezone ) {
		return array_key_exists( html_entity_decode( $timezone ), self::$windows_timezones_map );
	}

	/**
	 * Parses a duration and applies it to a date
	 *
	 * @param  string $date     Date string.
	 * @param  object $duration Duration value.
	 * @param  string $format   Format.
	 *
	 * @return integer|\DateTime
	 */
	protected function parse_duration( $date, $duration, $format = self::UNIX_FORMAT ) {
		$date_time = date_create( $date );
		$date_time->modify( $duration->y . ' year' );
		$date_time->modify( $duration->m . ' month' );
		$date_time->modify( $duration->d . ' day' );
		$date_time->modify( $duration->h . ' hour' );
		$date_time->modify( $duration->i . ' minute' );
		$date_time->modify( $duration->s . ' second' );

		if ( is_null( $format ) ) {
			$output = $date_time;
		} else {
			if ( self::UNIX_FORMAT === $format ) {
				$output = $date_time->getTimestamp();
			} else {
				$output = $date_time->format( $format );
			}
		}

		return $output;
	}

	/**
	 * Gets the number of days between a start and end date
	 *
	 * @param  integer $days  Number of days.
	 * @param  integer $start Start value.
	 * @param  integer $end   End value.
	 *
	 * @return integer
	 */
	protected function number_of_days( $days, $start, $end ) {
		$w    = array( gmdate( 'w', $start ), gmdate( 'w', $end ) );
		$base = floor( ( $end - $start ) / self::SECONDS_IN_A_WEEK );
		$sum  = 0;

		for ( $day = 0; $day < 7; ++$day ) {
			if ( $days & pow( 2, $day ) ) {
				$sum += $base + ( ( $w[0] > $w[1] ) ? $w[0] <= $day || $day <= $w[1] : $w[0] <= $day && $day <= $w[1] );
			}
		}

		return $sum;
	}

	/**
	 * Converts a negative day ordinal to
	 * its equivalent positive form
	 *
	 * @param  integer           $day_number Day number.
	 * @param  integer           $weekday    Weekday value.
	 * @param  integer|\DateTime $timestamp  Timestamp.
	 *
	 * @return string
	 */
	protected function convert_day_ordinal_to_positive( $day_number, $weekday, $timestamp ) {
		// 0 when no number is defined for BYDAY.
		$day_number = empty( $day_number ) ? 1 : intval( $day_number );

		$day_ordinals = $this->day_ordinals;

		if ( -1 <= $day_number ) {
			$day_ordinal = ( -1 === $day_number ) ? 'last' : $day_ordinals[ $day_number ];

			if ( 'weekday' === $weekday ) {
				$day_ordinal = "-1 day {$day_ordinal}";
			}

			return $day_ordinal;
		}

		$timestamp = ( is_object( $timestamp ) ) ? $timestamp : \DateTime::createFromFormat( self::UNIX_FORMAT, $timestamp );
		$start     = strtotime( 'first day of ' . $timestamp->format( self::DATE_TIME_FORMAT_PRETTY ) );
		$end       = strtotime( 'last day of ' . $timestamp->format( self::DATE_TIME_FORMAT_PRETTY ) );

		// Used with pow(2, X) so pow(2, 4) is THURSDAY.
		$weekdays = array_flip( array_keys( $this->weekdays ) );

		$number_of_days = $this->number_of_days( pow( 2, $weekdays[ $weekday ] ), $start, $end );

		// Create subset.
		$day_ordinals = array_slice( $day_ordinals, 0, $number_of_days, true );

		// Reverse only the values.
		$day_ordinals = array_combine( array_keys( $day_ordinals ), array_reverse( array_values( $day_ordinals ) ) );

		return $day_ordinals[ $day_number * -1 ];
	}

	/**
	 * Removes unprintable ASCII and UTF-8 characters
	 *
	 * @param  string $data Data to remove characters from.
	 *
	 * @return string
	 */
	protected function remove_unprintable_chars( $data ) {
		return preg_replace( '/[\x00-\x1F\x7F\xA0]/u', '', $data );
	}

	/**
	 * Provides a polyfill for PHP 7.2's `mb_chr()`, which is a multibyte safe version of `chr()`.
	 * Multibyte safe.
	 *
	 * @param  integer $code Value used to determine encoding.
	 *
	 * @return string
	 */
	protected function mb_chr( $code ) {
		$code %= 0x200000;
		if ( function_exists( 'mb_chr' ) ) {
			return mb_chr( $code ); // phpcs:ignore
		} else {
			if ( 0x80 > $code ) {
				$s = chr( $code );
			} elseif ( 0x800 > $code ) {
				$s = chr( 0xc0 | $code >> 6 ) . chr( 0x80 | $code & 0x3f );
			} elseif ( 0x10000 > $code ) {
				$s = chr( 0xe0 | $code >> 12 ) . chr( 0x80 | $code >> 6 & 0x3f ) . chr( 0x80 | $code & 0x3f );
			} else {
				$s = chr( 0xf0 | $code >> 18 ) . chr( 0x80 | $code >> 12 & 0x3f ) . chr( 0x80 | $code >> 6 & 0x3f ) . chr( 0x80 | $code & 0x3f );
			}

			return $s;
		}
	}

	/**
	 * Replace all occurrences of the search string with the replacement string.
	 * Multibyte safe.
	 *
	 * @param  string|array $search   Needle to search for.
	 * @param  string|array $replace  Replace value.
	 * @param  string|array $subject  Subject text.
	 * @param  string       $encoding Encoding value.
	 * @param  integer      $count    Index value in the iteration.
	 *
	 * @return array|string
	 */
	protected static function mb_str_replace( $search, $replace, $subject, $encoding = null, &$count = 0 ) {
		if ( is_array( $subject ) ) {
			// Call `mb_str_replace()` for each subject in the array, recursively.
			foreach ( $subject as $key => $value ) {
				$subject[ $key ] = self::mb_str_replace( $search, $replace, $value, $encoding, $count );
			}
		} else {
			// Normalize $search and $replace so they are both arrays of the same length.
			$searches     = is_array( $search ) ? array_values( $search ) : array( $search );
			$replacements = is_array( $replace ) ? array_values( $replace ) : array( $replace );
			$replacements = array_pad( $replacements, count( $searches ), '' );

			foreach ( $searches as $key => $search ) {
				if ( is_null( $encoding ) ) {
					$encoding = mb_detect_encoding( $search, 'UTF-8', true );
				}

				$replace    = $replacements[ $key ];
				$search_len = mb_strlen( $search, $encoding );
				$offset     = mb_strpos( $subject, $search, 0, $encoding );

				$sb = array();
				while ( false !== $offset ) {
					$sb[]    = mb_substr( $subject, 0, $offset, $encoding );
					$subject = mb_substr( $subject, $offset + $search_len, null, $encoding );
					++$count;
				}

				$sb[]    = $subject;
				$subject = implode( $replace, $sb );
			}
		}

		return $subject;
	}

	/**
	 * Places double-quotes around texts that have characters not permitted
	 * in parameter-texts, but are permitted in quoted-texts.
	 *
	 * @param  string $candidate_text Candidate text string.
	 * @return string
	 */
	protected function escape_param_text( $candidate_text ) {
		if ( strpbrk( $candidate_text, ':;,' ) !== false ) {
			return '"' . $candidate_text . '"';
		}

		return $candidate_text;
	}

	/**
	 * Replaces curly quotes and other special characters
	 * with their standard equivalents
	 *
	 * @param  string $data Data string.
	 *
	 * @return string
	 */
	protected function clean_data( $data ) {
		$replacement_chars = array(
			"\xe2\x80\x98" => "'",   // ‘
			"\xe2\x80\x99" => "'",   // ’
			"\xe2\x80\x9a" => "'",   // ‚
			"\xe2\x80\x9b" => "'",   // ‛
			"\xe2\x80\x9c" => '"',   // “
			"\xe2\x80\x9d" => '"',   // ”
			"\xe2\x80\x9e" => '"',   // „
			"\xe2\x80\x9f" => '"',   // ‟
			"\xe2\x80\x93" => '-',   // –
			"\xe2\x80\x94" => '--',  // —
			"\xe2\x80\xa6" => '...', // …
			"\xc2\xa0"     => ' ',
		);
		// Replace UTF-8 characters.
		$cleaned_data = strtr( $data, $replacement_chars );

		// Replace Windows-1252 equivalents.
		$chars_to_replace = array_map(
			function ( $code ) {
				return $this->mb_chr( $code );
			},
			array( 133, 145, 146, 147, 148, 150, 151, 194 )
		);

		$cleaned_data = $this->mb_str_replace( $chars_to_replace, $replacement_chars, $cleaned_data );

		return $cleaned_data;
	}

	/**
	 * Parses a list of excluded dates to be applied to an Event
	 *
	 * @param  array $event Event array.
	 *
	 * @return array
	 */
	public function parse_ex_dates( array $event ) {
		if ( empty( $event['EXDATE_array'] ) ) {
			return array();
		} else {
			$exdates = $event['EXDATE_array'];
		}

		$output            = array();
		$current_time_zone = $this->default_time_zone;

		foreach ( $exdates as $sub_array ) {
			end( $sub_array );
			$final_key = key( $sub_array );

			foreach ( $sub_array as $key => $value ) {
				if ( 'TZID' === $key ) {
					$current_time_zone = $this->timezone_string_to_date_timezone( $sub_array[ $key ] );
				} elseif ( is_numeric( $key ) ) {
					$ical_date = $sub_array[ $key ];

					if ( substr( $ical_date, -1 ) === 'Z' ) {
						$current_time_zone = self::TIME_ZONE_UTC;
					}

					$output[] = new \DateTime( $ical_date, new \DateTimeZone( $current_time_zone ) );

					if ( $key === $final_key ) {
						// Reset to default.
						$current_time_zone = $this->default_time_zone;
					}
				}
			}
		}

		return $output;
	}

	/**
	 * Checks if a date string is a valid date
	 *
	 * @param  string $value Date value.
	 *
	 * @return boolean
	 *
	 * @throws \Exception Exception thrown on error.
	 */
	public function is_valid_date( $value ) {
		if ( ! $value ) {
			return false;
		}

		try {
			new \DateTime( $value );

			return true;
		} catch ( \Exception $e ) {
			return false;
		}
	}

	/**
	 * Checks if a filename exists as a file or URL
	 *
	 * @param  string $filename Filename or URL.
	 *
	 * @return boolean
	 */
	protected function is_file_or_url( $filename ) {

		$file_or_url = ( file_exists( $filename ) || filter_var( $filename, FILTER_VALIDATE_URL ) );

		return $file_or_url ? $file_or_url : false;

	}

	/**
	 * Reads an entire file or URL into an array
	 *
	 * @param  string $filename The file name.
	 *
	 * @return array
	 *
	 * @throws \Exception Exception thrown on error.
	 */
	protected function file_or_url( $filename ) {
		$options = array();
		if ( ! empty( $this->http_basic_auth ) || ! empty( $this->http_user_agent ) ) {
			$options['http']           = array();
			$options['http']['header'] = array();

			if ( ! empty( $this->http_basic_auth ) ) {
				$username = $this->http_basic_auth['username'];
				$password = $this->http_basic_auth['password'];
				// base64_encode() used to encode auth credentials.
				$basic_auth = base64_encode( "{$username}:{$password}" ); // phpcs:ignore

				array_push( $options['http']['header'], "Authorization: Basic {$basic_auth}" );
			}

			if ( ! empty( $this->http_user_agent ) ) {
				array_push( $options['http']['header'], "User-Agent: {$this->http_user_agent}" );
			}
		}

		$context = stream_context_create( $options );
		$lines   = file( $filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES, $context );

		if ( false === $lines ) {

			throw new \Exception( "The file path or URL '{$filename}' does not exist." );

		}

		return $lines;
	}

	/**
	 * Returns a `date_timezone` object based on a string containing a time zone name.
	 *
	 * Falls back to the default time zone if string passed not a recognised time zone.
	 *
	 * @param  string $timezone_string Timezone string.
	 *
	 * @return \date_timezone
	 */
	public function timezone_string_to_date_timezone( $timezone_string ) {
		// Some time zones contain characters that are not permitted in param-texts,
		// but are within quoted texts. We need to remove the quotes as they're not
		// actually part of the time zone.
		$timezone_string = trim( $timezone_string, '"' );
		$timezone_string = html_entity_decode( $timezone_string );

		if ( $this->is_valid_iana_timezone_id( $timezone_string ) ) {
			return new \DateTimeZone( $timezone_string );
		}

		if ( $this->is_valid_cldr_timezone_id( $timezone_string ) ) {
			return new \DateTimeZone( self::$cldr_timezones_map[ $timezone_string ] );
		}

		if ( $this->is_valid_windows_timezone_id( $timezone_string ) ) {
			return new \DateTimeZone( self::$windows_timezones_map[ $timezone_string ] );
		}

		return new \DateTimeZone( $this->default_time_zone );
	}

	/**
	 * Ensures the recurrence count is enforced against generated recurrence events.
	 *
	 * @param  array $rrules            Recurring rules.
	 * @param  array $recurrence_events Recurring events array.
	 *
	 * @return array
	 */
	protected function trim_to_recurrence_count( array $rrules, array $recurrence_events ) {
		if ( isset( $rrules['COUNT'] ) ) {
			$recurrence_count = ( intval( $rrules['COUNT'] ) - 1 );
			$surplus_count    = ( count( $recurrence_events ) - $recurrence_count );

			if ( $surplus_count > 0 ) {
				$recurrence_events  = array_slice( $recurrence_events, 0, $recurrence_count );
				$this->event_count -= $surplus_count;
			}
		}

		return $recurrence_events;
	}

	/**
	 * Checks if an excluded date matches a given date by reconciling time zones.
	 *
	 * @param  DateTime $exdate           Excluded date class.
	 * @param  array    $an_event         Event array.
	 * @param  integer  $recurring_offset A date with relative parts.
	 *
	 * @return boolean
	 */
	protected function is_ex_date_match( $exdate, array $an_event, $recurring_offset ) {
		$search_date = $an_event['DTSTART'];

		if ( substr( $search_date, -1 ) === 'Z' ) {
			$timezone = new \DateTimeZone( self::TIME_ZONE_UTC );
		} elseif ( isset( $an_event['DTSTART_array'][0]['TZID'] ) ) {
			$timezone = $this->timezone_string_to_date_timezone( $an_event['DTSTART_array'][0]['TZID'] );
		} else {
			$timezone = new \DateTimeZone( $this->default_time_zone );
		}

		$a = new \DateTime( $search_date, $timezone );
		$b = $exdate->add( \DateInterval::createFromDateString( $recurring_offset . ' seconds' ) );

		return $a === $b;
	}
}
