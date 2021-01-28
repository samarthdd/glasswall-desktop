import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Info from '../ui/components/Info';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<Info />);
    expect(wrapper).toMatchSnapshot();
});