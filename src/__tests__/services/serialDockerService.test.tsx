import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as GWSerialDockerService from '../../ui/services/GWSerialDockerService'
import "@testing-library/jest-dom/extend-expect";

describe('Serial Docker Service', () => {
  it('should render', () => {
      let res = GWSerialDockerService.gwCliVersionSerial();
  });

});

