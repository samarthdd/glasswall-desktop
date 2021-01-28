import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Navbar from '../ui/components/Navbar';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
});