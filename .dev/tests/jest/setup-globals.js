import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure( { adapter: new Adapter() } );

// TODO: Utilize the REST API without the global.
// Backbone REST API client
global.wp = {};

// Prevent console messages when running tests.
console = {
	...console,

	/**
	 * Jest tests for deprecated and transforms result in native info console responses.
	 * Deleting the info method of `console` we are able to prevent test failures.
	 *
	 * Alternatively; we could assert with `@wordpress/jest-console` using
	 * `expect( console ).toHaveWarned();` however there are inconsistent results between
	 * various assertions making it difficult to conditionally assert with `jest-console`
	 */
	info: () => { },
	warn: () => { },
};

global.coblocksLayoutSelector = { layouts: [], categories: [] };
