import React from 'react';
import { shallow } from 'enzyme'
import Header from '../ui/components/Header';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
// describe(name, fn) creates a block that groups together several related tests in one "test suite".
describe('`Header Snapshots', () => {
    it('should render our Snapshots correctly', () => {
      const wrapper = shallow(<Header showBack={false} />)
      expect(wrapper).toMatchSnapshot()
    })
  })