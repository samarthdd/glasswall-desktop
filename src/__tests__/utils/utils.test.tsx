import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as Utils from '../../ui/utils/utils'
import "@testing-library/jest-dom/extend-expect";

const SANITIZE_FILE_NAME = "test.png"

describe('to get guid', () => {
  it('to get guid', () => {
    let id = expect(Utils.guid()).not.toBe('null') ;
  });

  it('to get word wrap', () => {
    let wrap = expect(Utils.wordwrap("test is running", 4, "is", true)).
      toBe("tesist isis runisning") ;
  });
  
  it('to get file hash', () => {
    let hash = expect(Utils.getFileHash("test is running")).not.toBe("null") ;
  });

  it('to get path seperation', () => {

    if(process.platform == "darwin")
        expect(Utils.getPathSep()).toBe("/") ;
    else if( process.platform  === "win32")
        expect(Utils.getPathSep()).toBe("\\") ;
    else
      expect(Utils.getPathSep()).toBe("/") ;
  });


  it('to get app data path based on operating system', () => {
    let path = expect(Utils.getAppDataPath()).not.toBe("Unsupported platform!") ;
  });

  it('to test stip File Ext', () => {
   let path = expect(Utils.stipFileExt("testfilext.test")).toBe("testfilext") ;
  });

  it('to test xml parsing', () => {
    let xml = "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
    let path = expect(Utils.xml_parser(xml)).not.
      toBe('null') ;
  });

  it('to test sanitize file name', () => {
    var fileName = SANITIZE_FILE_NAME;
    expect(Utils.sanitize_file_name(fileName)).not.
    toBe('null') ;
  });

  it('to test file size less than 1 kb in string', () => {
      expect(Utils.file_size_as_string(10)).
      toBe('1 KB') ;
  });


  it('to test file size less than 2 kb in string', () => {
    expect(Utils.file_size_as_string(1024 * 2)).
    toBe('2 KB') ;
  });

  it('to test file size less than 1 mb in string', () => {
      expect(Utils.file_size_as_string(1024 * 1024)).
      toBe('1 MB') ;
  });


  it('to test file size less than 1 gb in string', () => {
      expect(Utils.file_size_as_string(1024 * 1024 * 1024)).
      toBe('1 GB') ;
  });

  it('to test file size less than 1 gb in string', () => {
    expect(Utils.removeHttps("https://test.com")).
    toBe('test.com') ;
  });



  // it('open_file_exp', () => {
  //   expect(Utils.open_file_exp(Utils.getAppDataPath())).not.
  //   toBe('null') ;
  // });


  it('test sleep method', () => {
    expect(Utils.sleep(1))
  });

  
});

