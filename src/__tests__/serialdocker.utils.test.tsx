import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as Utils from '../ui/components/SerialDocker'
import "@testing-library/jest-dom/extend-expect";

jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true },
);


describe('get rebuild cli version', () => {
    it('should render', () => {
        let res = Utils.gwCliVersionSerial();
      expect(res).toBe("1.139")
    });
  
  });


describe('check uuid format', () => {
  it('should render', () => {
      let res = Utils.gwCliVersionSerial();
    expect(res).toBe("1.139")
  });

});
