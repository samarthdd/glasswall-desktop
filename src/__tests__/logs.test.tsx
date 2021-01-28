import React from 'react';
import { shallow } from 'enzyme'
import Logs from '../ui/components/Logs';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('`Header Snapshots', () => {
    it('should render our Snapshots correctly', () => {
      const wrapper = shallow(<Logs isOpen={false} content={"This is a test for logs"} 
        handleOpen={()=>void(true)}/>)
      expect(wrapper).toMatchSnapshot()
    })
  })