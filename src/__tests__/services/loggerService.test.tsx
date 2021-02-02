

import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as LoggerService from '../../ui/services/LoggerService'
import "@testing-library/jest-dom/extend-expect";


describe('logs data should not be empty', () => {
    it('should render', () => {
      let data = expect(LoggerService.getRawLogs()).not.toBe('0');
    });
  });

  describe('to get logs', () => {
    it('should render', () => {
      let logs = expect(LoggerService.getLogs()).not.toBe('null') ;
    });
  
  });


  describe('to get log time', () => {
    it('should render', () => {
      let logTime = expect(LoggerService.getLogTime()).not.toBe('null') ;
    });
  
  });
  
  describe('to get log path', () => {
    it('should render', () => {
      let logPath = expect(LoggerService.getLogsPath()).not.
        toBe('null') ;
    });
  
  });
  