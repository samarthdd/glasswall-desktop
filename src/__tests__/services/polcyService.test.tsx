

import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as PolicyService from '../../ui/services/PolicyService'
import "@testing-library/jest-dom/extend-expect";


describe('to get 0 output for allow, 1 for sanitise and 2 for disallow', () => {
    it('should render', () => {
      let flag0 = expect(PolicyService.getPolicyFlag("allow")).toBe(0) ;
      let flag1 = expect(PolicyService.getPolicyFlag("sanitise")).toBe(1) ;
      let flag2 = expect(PolicyService.getPolicyFlag("disallow")).toBe(2) ;
    });
  
    it('test getPolicyInApiFormat', () => {
      PolicyService.getPolicyInApiFormat()
    });
    it('test savePolicy', () => {
      PolicyService.savePolicy({})
    });
  });
  