import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Sessions from '../../ui/views/Sessions'
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Session view snapshot', () => {
  const wrapper = shallow(<Sessions />);
  expect(wrapper).toMatchSnapshot();
});