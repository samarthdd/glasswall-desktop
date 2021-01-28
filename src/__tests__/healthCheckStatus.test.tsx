import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import HealthCheckStatus from '../ui/components/HealthCheckStatus';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<HealthCheckStatus rebuildVersion={"version5"} 
        status={2} handleOpen={()=>void(true)}/>);
    expect(wrapper).toMatchSnapshot();
});