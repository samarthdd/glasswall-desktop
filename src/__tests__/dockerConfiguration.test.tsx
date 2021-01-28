import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import  DockerConfiguration from '../ui/views/DockerConfiguration'
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should test Header component', () => {
  const wrapper = shallow(<DockerConfiguration />);
  expect(wrapper).toMatchSnapshot();
});