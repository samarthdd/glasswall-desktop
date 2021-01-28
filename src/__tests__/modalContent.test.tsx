import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ModalContent from '../ui/components/ModalContent';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<ModalContent />);
    expect(wrapper).toMatchSnapshot();
});