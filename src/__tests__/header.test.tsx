import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Header from '../ui/components/Header';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<Header showBack={false}/>);
    expect(wrapper).toMatchSnapshot();
});