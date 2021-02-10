import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as GWDockerService from '../../ui/services/GWDockerService'
import "@testing-library/jest-dom/extend-expect";



describe('docker health check', () => {
    it('should render', () => {
        let res = GWDockerService.health_chk();
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(7);
    });
  
  });
