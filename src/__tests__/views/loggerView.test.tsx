import React from 'react';
import { shallow } from 'enzyme'
import  LoggerView from '../../ui/views/LoggerView'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('`LoggerView Snapshots', () => {
    it('LoggerView Snapshots correctly', () => {
      const wrapper = shallow(<LoggerView />)      
    })
  })