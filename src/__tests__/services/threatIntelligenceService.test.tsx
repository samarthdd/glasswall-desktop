import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as ThreatIntelligenceService from '../../ui/services/ThreatIntelligenceService'
import "@testing-library/jest-dom/extend-expect";
const os                                = require('os'); 
const UUID                              = require('pure-uuid');
const fs                                = require('fs-extra')
const path                              = require('path');
const dir                               = path.resolve(__dirname, `..`)


describe('Threat Intelligence Service', () => {
    it('should render', () => {
        let res = ThreatIntelligenceService.calculate_threat_level([{"level":"medium"}]);
    });
  
    it('test create_metadata_file', () => {               
        let xmlReport = fs.readFileSync(dir+'/reports/report/10megcomplex.xml')
        let xmlFilePath = dir+'reports/report'
        let xmlFileName = '10megcomplex.xml'
        let rebuiltFilePath = dir+'reports/clean'
        let rebuiltFileName = dir+'reports/original/10megcomplex.xlsx'
        let basePath = dir+'reports/'
        let res = ThreatIntelligenceService.create_metadata_file(xmlReport, xmlFilePath, xmlFileName,
            rebuiltFilePath, rebuiltFileName,basePath);
    });

    it('test apply rules', () => {               
        let xmlReport = fs.readFileSync(dir+'/reports/report/10megcomplex.xml')
        let xmlFilePath = dir+'reports/report'
        let xmlFileName = '10megcomplex.xml'
        let rebuiltFilePath = dir+'/reports/clean'
        let rebuiltFileName = dir+'/reports/original/10megcomplex.xlsx'
        let basePath = dir+'/reports/'
        let analyzed = dir+'/analysed'
        let res = ThreatIntelligenceService.apply_rules(analyzed,xmlFileName);
    });

  });