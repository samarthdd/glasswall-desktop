import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Loader from '../ui/components/Loader';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
});