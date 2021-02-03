import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as ThreatIntelligenceService from '../../ui/services/ThreatIntelligenceService'
import "@testing-library/jest-dom/extend-expect";


describe('Threat Intelligence Service', () => {
    it('should render', () => {
        let res = ThreatIntelligenceService.calculate_threat_level([{"level":"medium"}]);
    });
  
  });