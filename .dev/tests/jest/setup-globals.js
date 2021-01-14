import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure( { adapter: new Adapter() } );

// TODO: Utilize the REST API without the global.
// Backbone REST API client
global.wp = {};

// Prevent console messages when running tests.
console = {
	...console,
	info: () => { },
	warn: () => { },
};

global.coblocksLayoutSelector = { layouts: [], categories: [] };
