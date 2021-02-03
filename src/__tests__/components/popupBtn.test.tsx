import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import PopupBtn from '../../ui/components/PopupBtn';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test PopupBtn component', () => {
    const wrapper = shallow(<PopupBtn />);
    expect(wrapper).toMatchSnapshot();
});