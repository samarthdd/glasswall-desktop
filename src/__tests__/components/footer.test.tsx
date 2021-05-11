import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Footer from '../../ui/components/Footer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Footer component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
});