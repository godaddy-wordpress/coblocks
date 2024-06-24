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
class CoBlocks_ICal_Event
{
    // phpcs:disable Generic.Arrays.DisallowLongArraySyntax

    const HTML_TEMPLATE = '<p>%s: %s</p>';

    /**
     * https://www.kanzaki.com/docs/ical/summary.html
     *
     * @var string
     */
    public $summary;

    /**
     * https://www.kanzaki.com/docs/ical/dtstart.html
     *
     * @var string
     */
    public $dtstart;

    /**
     * https://www.kanzaki.com/docs/ical/dtend.html
     *
     * @var string
     */
    public $dtend;

    /**
     * https://www.kanzaki.com/docs/ical/duration.html
     *
     * @var string|null
     */
    public $duration;

    /**
     * https://www.kanzaki.com/docs/ical/dtstamp.html
     *
     * @var string
     */
    public $dtstamp;

    /**
     * When the event starts, represented as a timezone-adjusted string
     *
     * @var string
     */
    public $dtstart_tz;

    /**
     * When the event ends, represented as a timezone-adjusted string
     *
     * @var string
     */
    public $dtend_tz;

    /**
     * https://www.kanzaki.com/docs/ical/uid.html
     *
     * @var string
     */
    public $uid;

    /**
     * https://www.kanzaki.com/docs/ical/created.html
     *
     * @var string
     */
    public $created;

    /**
     * https://www.kanzaki.com/docs/ical/lastModified.html
     *
     * @var string
     */
    public $last_modified;

    /**
     * https://www.kanzaki.com/docs/ical/description.html
     *
     * @var string|null
     */
    public $description;

    /**
     * https://www.kanzaki.com/docs/ical/location.html
     *
     * @var string|null
     */
    public $location;

    /**
     * https://www.kanzaki.com/docs/ical/sequence.html
     *
     * @var string
     */
    public $sequence;

    /**
     * https://www.kanzaki.com/docs/ical/status.html
     *
     * @var string
     */
    public $status;

    /**
     * https://www.kanzaki.com/docs/ical/transp.html
     *
     * @var string
     */
    public $transp;

    /**
     * https://www.kanzaki.com/docs/ical/organizer.html
     *
     * @var string
     */
    public $organizer;

    /**
     * https://www.kanzaki.com/docs/ical/attendee.html
     *
     * @var string
     */
    public $attendee;

    /**
     * Manage additional properties
     *
     * @var array<string, mixed>
     */
    public $additionalProperties = array();

    /**
     * Creates the Event object
     *
     * @param  array $data
     * @return void
     */
    public function __construct(array $data = array())
    {
        foreach ($data as $key => $value) {
            $variable = self::snakeCase($key);
            if (property_exists($this, $variable)) {
                $this->{$variable} = $this->prepareData($value);
            } else {
                $this->additionalProperties[$variable] = $this->prepareData($value);
            }
        }
    }

    /**
     * Magic getter method
     *
     * @param  string $additionalPropertyName
     * @return mixed
     */
    public function __get($additionalPropertyName)
    {
        if (array_key_exists($additionalPropertyName, $this->additionalProperties)) {
            return $this->additionalProperties[$additionalPropertyName];
        }

        return null;
    }

    /**
     * Magic isset method
     *
     * @param  string $name
     * @return boolean
     */
    public function __isset($name)
    {
        return is_null($this->$name) === false;
    }

    /**
     * Prepares the data for output
     *
     * @param  mixed $value
     * @return mixed
     */
    protected function prepareData($value)
    {
        if (is_string($value)) {
            return stripslashes(trim(str_replace('\n', "\n", $value)));
        }

        if (is_array($value)) {
            return array_map(function ($value) {
                return $this->prepareData($value);
            }, $value);
        }

        return $value;
    }

    /**
     * Returns Event data excluding anything blank
     * within an HTML template
     *
     * @param  string $html HTML template to use
     * @return string
     */
    public function printData($html = self::HTML_TEMPLATE)
    {
        $data = array(
            'SUMMARY'       => $this->summary,
            'DTSTART'       => $this->dtstart,
            'DTEND'         => $this->dtend,
            'DTSTART_TZ'    => $this->dtstart_tz,
            'DTEND_TZ'      => $this->dtend_tz,
            'DURATION'      => $this->duration,
            'DTSTAMP'       => $this->dtstamp,
            'UID'           => $this->uid,
            'CREATED'       => $this->created,
            'LAST-MODIFIED' => $this->last_modified,
            'DESCRIPTION'   => $this->description,
            'LOCATION'      => $this->location,
            'SEQUENCE'      => $this->sequence,
            'STATUS'        => $this->status,
            'TRANSP'        => $this->transp,
            'ORGANISER'     => $this->organizer,
            'ATTENDEE(S)'   => $this->attendee,
        );

        // Remove any blank values
        $data = array_filter($data);

        $output = '';

        foreach ($data as $key => $value) {
            $output .= sprintf($html, $key, $value);
        }

        return $output;
    }

    /**
     * Converts the given input to snake_case
     *
     * @param  string $input
     * @param  string $glue
     * @param  string $separator
     * @return string
     */
    protected static function snakeCase($input, $glue = '_', $separator = '-')
    {
        $inputSplit = preg_split('/(?<=[a-z])(?=[A-Z])/x', $input);

        if ($inputSplit === false) {
            return $input;
        }

        $inputSplit = implode($glue, $inputSplit);
        $inputSplit = str_replace($separator, $glue, $inputSplit);

        return strtolower($inputSplit);
    }
}