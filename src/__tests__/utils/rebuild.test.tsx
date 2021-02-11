import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as RebuildUtils from '../../ui/utils/RebuildUtils'
import "@testing-library/jest-dom/extend-expect";


describe('to get rebuild analysis url', () => {
    it('should render', () => {
      let url = expect(RebuildUtils.getRebuildAnalysisUrl()).
        toBe("https://o7ymnow6vf.execute-api.us-west-2.amazonaws.com/Prod/api/Analyse/base64");
    });
  
  });

describe('to get rebuild engine url', () => {
  it('should render', () => {
    let url = expect(RebuildUtils.getRebuildEngineUrl()).
      toBe("https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64");
  });

});


describe('to get rebuild api key', () => {
  it('should render', () => {
    let key = expect(RebuildUtils.getRebuildApiKey()).not.
      toBe('null');
  });

});

describe('to get rebuild image', () => {
  it('rebuild image', () => {
    let key = expect(RebuildUtils.getRebuildImage()).
      toBe("glasswallsolutions/evaluationsdk");
  });

});

describe('to get rebuild image tag', () => {
  it('should render', () => {
    let key = expect(RebuildUtils.getRebuildImageTag()).
      toBe("rebuild");
  });

});


describe('to get report path', () => {
  it('should render', () => {
    let path = expect(RebuildUtils.getReportPath()).not.
      toBe('null') ;
  });

});

describe('to get clean path', () => {
  it('should render', () => {
    let path = expect(RebuildUtils.getCleanPath()).not.
      toBe('null') ;
  });

});

describe('to get original path', () => {
  it('should render', () => {
    let path = expect(RebuildUtils.getOriginalPath()).not.
      toBe('null') ;
  });

});

describe('to get processed path', () => {
  it('should render', () => {
    let path = expect(RebuildUtils.getProcessedPath()).not.
      toBe('null') ;
  });

});

describe('to get default paths', () => {
  it('Default Ouput Clean Path', () => {
    let path = expect(RebuildUtils.getDefaultOuputCleanPath()).not.
      toBe('null') ;
  });

  it('Default Docker Output Folder', () => {
    let path = expect(RebuildUtils.getDockerDefaultOutputFOlder()).not.
      toBe('null') ;
  });

  it('Default Cloud Output Folder', () => {
    let path = expect(RebuildUtils.getCloudDefaultOutputFOlder()).not.
      toBe('null') ;
  });
  

});


describe('to test create config', () => {
  it('create config', () => {
    (RebuildUtils.create_config());
    
  });
});
