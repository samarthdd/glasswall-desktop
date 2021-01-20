import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as Utils from '../src/ui/utils/utils'

jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true },
);



describe('59934084', () => {
  it('should render', () => {
    let url = expect(Utils.getRebuildEngineUrl()).
      toBe("https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64");
  });

});

describe('to get report path', () => {
  it('should render', () => {
    let path = expect(Utils.getReportPath()).not.
      toBe('null') ;
  });

});

