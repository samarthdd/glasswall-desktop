import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import WebIFrameView from '../ui/components/WebIFrameView';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<WebIFrameView url={"https://www.glasswalldesktop.com"}/>);
    expect(wrapper).toMatchSnapshot();
});