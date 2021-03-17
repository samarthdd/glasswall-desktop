import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as GWDockerService from '../../../ui/services/GWDockerService'
import "@testing-library/jest-dom/extend-expect";



  describe('Docker service test suite', () => {
    it('check license', () => {
         let res = GWDockerService.check_license();
         expect(res).toBe(0);
    });;
  
    it('docker health check', () => {
         let res = GWDockerService.health_chk();
       expect(res).toBeGreaterThanOrEqual(0);
       expect(res).toBeLessThanOrEqual(7);
    });
  
  });