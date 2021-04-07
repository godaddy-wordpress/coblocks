/**
 * External dependencies
 */
 import { shallow } from 'enzyme';

/**
 * Internal dependencies.
 */
 import PaddingWrapper from '../padding-wrapper';

 describe( 'padding-wrapper', () => {
     it( 'returns style attributes for block', () => {
         const baseProps = {
            className: 'test test test mock test',
         };         

         const wrapper = shallow(
            <PaddingWrapper {...baseProps} >
                <div  />
            </PaddingWrapper>
         );

         expect(wrapper.hasClass(baseProps.className)).toEqual(true);
     } );
 } );