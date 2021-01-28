import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import  DockerRebuildFiles from '../ui/views/DockerRebuildFiles'
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
  const wrapper = shallow(<DockerRebuildFiles />);
  expect(wrapper).toMatchSnapshot();
});