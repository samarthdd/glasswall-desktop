import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import RawXml from '../ui/components/RawXml';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<RawXml isOpen={true} content={"This is a raw xml test"}
        handleOpen={()=>void(true)}/>);
    expect(wrapper).toMatchSnapshot();
});