import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as Utils from '../ui/components/DockerUtils'
import "@testing-library/jest-dom/extend-expect";

jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true },
);


describe('docker health check', () => {
    it('should render', () => {
        let res = Utils.health_chk();
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(7)
    });
  
  });

  describe('check license', () => {
    it('should render', () => {
        let res = Utils.check_license();
        expect(res).toBe(0);
    });
  
  });