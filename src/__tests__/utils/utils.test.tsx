import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as Utils from '../../ui/utils/utils'
import "@testing-library/jest-dom/extend-expect";



describe('to get guid', () => {
  it('should render', () => {
    let id = expect(Utils.guid()).not.toBe('null') ;
  });

});

describe('to get word wrap', () => {
  it('should render', () => {
    let wrap = expect(Utils.wordwrap("test is running", 4, "is", true)).
      toBe("tesist isis runisning") ;
  });

});

describe('to get file hash', () => {
  it('should render', () => {
    let hash = expect(Utils.getFileHash("test is running")).not.toBe("null") ;
  });

});

describe('to get path seperation', () => {
  it('should render', () => {

    if(process.platform == "darwin")
        expect(Utils.getPathSep()).toBe("/") ;
    else if( process.platform  === "win32")
        expect(Utils.getPathSep()).toBe("\\") ;
    else
      expect(Utils.getPathSep()).toBe("/") ;
  });

});


describe('to get app data path based on operating system', () => {
  it('should render', () => {
    let path = expect(Utils.getAppDataPath()).not.toBe("Unsupported platform!") ;
  });
});

describe('to test stip File Ext', () => {
  it('should render', () => {
    let path = expect(Utils.stipFileExt("testfilext.test")).toBe("testfilext") ;
    
  });
});
