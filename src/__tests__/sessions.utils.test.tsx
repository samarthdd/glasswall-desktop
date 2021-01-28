import { shallow } from 'enzyme';
import React from 'react';
const { ipcRenderer } = require('electron');
import * as SessionUtils from '../ui/components/SessionsUtils'
import * as Utils from '../ui/utils/utils';
import "@testing-library/jest-dom/extend-expect";
import Sessions from '../ui/views/Sessions';

jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true },
);


describe('get session list', () => {
    it('should render', async()  => {
        let res: string[];
        res = await SessionUtils.getSessionList(Utils.getProcessedPath());
      expect(res.length).toBeGreaterThanOrEqual(0);
    });
  
  });

  describe('get session list', () => {
    
    it('should render', done => {
        const readSessionResult =(result: any)=>{ 
            expect(result.id).not.toBeNull();
            done();
        }
        SessionUtils.getSessionList(Utils.getProcessedPath()).then(function(results:string[]){
          console.log('results.length = '+results.length)
            if(results.length>0){    
              results.map(id=>{
                    console.log("id = "+id)
                  });            
                SessionUtils.readSessions(results, readSessionResult);
            }
            else{
              done();
            }
        });
    });
  
  });
