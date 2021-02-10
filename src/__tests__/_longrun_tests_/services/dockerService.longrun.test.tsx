import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as GWDockerService from '../../../ui/services/GWDockerService'
import "@testing-library/jest-dom/extend-expect";



  describe('check license', () => {
    it('should render', () => {
        let res = GWDockerService.check_license();
        expect(res).toBe(0);
    });;
  
  })