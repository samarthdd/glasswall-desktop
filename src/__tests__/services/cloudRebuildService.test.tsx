import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as GWCloudRebuildService from '../../ui/services/GWCloudRebuildService'
import "@testing-library/jest-dom/extend-expect";


describe('Rebuild Cloud Service', () => {
    it('should render', () => {
        let res = GWCloudRebuildService.getFile(null);
    });
  
  });