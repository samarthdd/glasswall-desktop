import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ThreatAnalysisDialog from '../ui/components/ThreatAnalysisDialog';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
    const wrapper = shallow(<ThreatAnalysisDialog threat={"low platform security threat"} 
        isOpen={false} handleOpen={()=>void(true)}/>);
    expect(wrapper).toMatchSnapshot();
});