import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import RebuildPolicy from '../../ui/views/RebuildPolicy'
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test RebuildPolicy view snapshot', () => {
  const wrapper = shallow(<RebuildPolicy />);
  expect(wrapper).toMatchSnapshot();
});